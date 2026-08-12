import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const API = 'https://api.clickup.com/api/v2';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const conn = await base44.asServiceRole.connectors.getConnection('clickup');
    const accessToken = conn && conn.accessToken;
    if (!accessToken) return Response.json({ error: 'no clickup token' }, { status: 500 });
    const h = { Authorization: accessToken, 'Content-Type': 'application/json' };

    const teamsRes = await fetch(`${API}/team`, { headers: h });
    const teamsText = await teamsRes.text();
    let teams = [];
    try { teams = (JSON.parse(teamsText).teams || []).map((t) => ({ id: t.id, name: t.name })); }
    catch (e) { return Response.json({ error: 'team parse failed', status: teamsRes.status, body: teamsText.slice(0, 500) }, { status: 500 }); }

    const out = [];
    for (const team of teams) {
      const spacesRes = await fetch(`${API}/team/${team.id}/space?archived=false`, { headers: h });
      const spacesJson = await spacesRes.json();
      const spaces = [];
      for (const sp of (spacesJson.spaces || [])) {
        const entry = { id: sp.id, name: sp.name, folders: [], lists: [] };
        const foldersRes = await fetch(`${API}/space/${sp.id}/folder?archived=false`, { headers: h });
        const foldersJson = await foldersRes.json();
        for (const f of (foldersJson.folders || [])) {
          const flistsRes = await fetch(`${API}/folder/${f.id}/list?archived=false`, { headers: h });
          const flistsJson = await flistsRes.json();
          entry.folders.push({ id: f.id, name: f.name, lists: (flistsJson.lists || []).map((l) => ({ id: l.id, name: l.name })) });
        }
        const listsRes = await fetch(`${API}/space/${sp.id}/list?archived=false`, { headers: h });
        const listsJson = await listsRes.json();
        entry.lists = (listsJson.lists || []).map((l) => ({ id: l.id, name: l.name }));
        spaces.push(entry);
      }
      out.push({ team_id: team.id, team_name: team.name, spaces });
    }

    // Search whole workspace for AWM-related lists, with statuses
    const matches = [];
    const want = (s) => /awm|austin wealth/i.test(s || '');
    for (const team of teams) {
      const spacesRes = await fetch(`${API}/team/${team.id}/space?archived=false`, { headers: h });
      const spacesJson = await spacesRes.json();
      for (const sp of (spacesJson.spaces || [])) {
        const foldersRes = await fetch(`${API}/space/${sp.id}/folder?archived=false`, { headers: h });
        const foldersJson = await foldersRes.json();
        for (const f of (foldersJson.folders || [])) {
          if (!want(f.name)) continue;
          const flistsRes = await fetch(`${API}/folder/${f.id}/list?archived=false`, { headers: h });
          const flistsJson = await flistsRes.json();
          for (const l of (flistsJson.lists || [])) {
            matches.push({
              space: sp.name, folder: f.name, list_id: l.id, list_name: l.name,
              statuses: (l.statuses || []).map((s) => ({ id: s.status, name: s.status, orderindex: s.orderindex, type: s.type }))
            });
          }
        }
        const listsRes = await fetch(`${API}/space/${sp.id}/list?archived=false`, { headers: h });
        const listsJson = await listsRes.json();
        for (const l of (listsJson.lists || [])) {
          if (!want(l.name) && !want(sp.name)) continue;
          matches.push({
            space: sp.name, folder: null, list_id: l.id, list_name: l.name,
            statuses: (l.statuses || []).map((s) => ({ id: s.status, name: s.status, orderindex: s.orderindex, type: s.type }))
          });
        }
      }
    }

    return Response.json({ matches });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}