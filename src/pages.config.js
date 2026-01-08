import Home from './pages/Home';
import Planning from './pages/Planning';
import Investing from './pages/Investing';
import Team from './pages/Team';
import Education from './pages/Education';
import Contact from './pages/Contact';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Planning": Planning,
    "Investing": Investing,
    "Team": Team,
    "Education": Education,
    "Contact": Contact,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};