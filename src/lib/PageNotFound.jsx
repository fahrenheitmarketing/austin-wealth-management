import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function PageNotFound() {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
            <div className="text-center max-w-lg">
                <p className="text-amber-400 text-xs font-medium tracking-widest uppercase mb-6">404 Error</p>
                <h1 className="text-6xl md:text-8xl font-light text-white tracking-tight mb-6">
                    Page Not Found
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed mb-10">
                    The page you're looking for has moved or no longer exists. 
                    Let's get you back on track.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-medium transition-colors"
                    >
                        Back to Home
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                        to="/Contact"
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
}