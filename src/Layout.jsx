import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Phone, Mail, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Planning', href: 'Planning' },
  { name: 'Investing', href: 'Investing' },
  { name: 'Team', href: 'Team' },
  { 
    name: 'Education', 
    href: 'Education',
    submenu: [
      { name: 'Education', href: 'Education' },
      { name: 'Questions & Answers', href: 'QuestionsAnswers' }
    ]
  },
  { name: 'Blog', href: 'Blog' },
  { name: 'Contact', href: 'Contact' },
  { name: 'Client Access', href: 'ClientAccess' }
];

export default function Layout({ children, currentPageName }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [educationOpen, setEducationOpen] = useState(false);
  const educationRef = useRef(null);
  const location = useLocation();
  const isHome = currentPageName === 'Home';
  const activePage = (currentPageName || '').toLowerCase();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (educationRef.current && !educationRef.current.contains(e.target)) {
        setEducationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["FinancialService", "LocalBusiness"],
    "name": "Austin Wealth Management",
    "url": "https://www.austinwealthmgmt.com",
    "logo": "https://austinwealthmgmt.com/wp-content/uploads/2020/08/awm-logo.png",
    "email": "info@austinwealthmgmt.com",
    "areaServed": {
      "@type": "State",
      "name": "Texas"
    },
    "telephone": "(512) 467-2000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1301 S Capital of Texas Hwy, Suite C-200",
      "addressLocality": "Austin",
      "addressRegion": "TX",
      "postalCode": "78746",
      "addressCountry": "US"
    },
    "description": "Fee-only financial planning and investment management for families in Central Texas.",
    "priceRange": "$$",
    "openingHours": "Mo-Fr 09:00-17:00"
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center">
              <img 
                src="https://media.base44.com/images/public/6960325a10892c1a1fc0a802/6a2778d1e_image.png" 
                alt="Austin Wealth Management" 
                className={`w-auto transition-all duration-300 ${scrolled || !isHome ? 'mix-blend-multiply' : 'brightness-0 invert'}`}
                style={{ height: '72px' }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                item.submenu ? (
                  <div key={item.name} className="relative" ref={educationRef}>
                    <button
                      onClick={() => setEducationOpen(!educationOpen)}
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activePage === item.href.toLowerCase() || activePage === 'questionsanswers'
                          ? scrolled || !isHome
                            ? 'text-amber-600 bg-amber-50'
                            : 'text-amber-400 bg-white/10'
                          : scrolled || !isHome
                            ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${educationOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {educationOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50"
                        >
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              to={createPageUrl(sub.href)}
                              onClick={() => setEducationOpen(false)}
                              className={`block px-4 py-3 text-sm font-medium transition-colors ${
                                activePage === sub.href.toLowerCase()
                                  ? 'text-amber-600 bg-amber-50'
                                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                              }`}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={createPageUrl(item.href)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activePage === item.href.toLowerCase()
                        ? scrolled || !isHome 
                          ? 'text-amber-600 bg-amber-50' 
                          : 'text-amber-400 bg-white/10'
                        : scrolled || !isHome
                          ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                          : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to={createPageUrl('Contact')}>
                <Button 
                  className={`rounded-full font-medium ${
                    scrolled || !isHome
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                      : 'bg-white hover:bg-slate-100 text-slate-900'
                  }`}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={scrolled || !isHome ? 'text-slate-900' : 'text-white'}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-96 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-slate-100">
                    <img 
                      src="https://media.base44.com/images/public/6960325a10892c1a1fc0a802/6a2778d1e_image.png" 
                      alt="Austin Wealth Management" 
                      className="w-auto mix-blend-multiply"
                      style={{ height: '54px' }}
                    />
                  </div>
                  
                  <nav className="flex-1 p-6 space-y-2">
                    {navigation.map((item) => (
                      item.submenu ? (
                        <div key={item.name}>
                          <div className="px-4 py-2 text-xs font-semibold tracking-widest text-amber-600 uppercase mt-2">
                            {item.name}
                          </div>
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              to={createPageUrl(sub.href)}
                              className={`block px-6 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                activePage === sub.href.toLowerCase()
                                  ? 'bg-amber-50 text-amber-600'
                                  : 'text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <Link
                          key={item.name}
                          to={createPageUrl(item.href)}
                          className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                            activePage === item.href.toLowerCase()
                              ? 'bg-amber-50 text-amber-600'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {item.name}
                        </Link>
                      )
                    ))}
                  </nav>

                  <div className="p-6 border-t border-slate-100 space-y-4">
                    <Link to={createPageUrl('Contact')} className="block">
                      <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-full h-12">
                        Make an Appointment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                      <a href="tel:+15124672000" className="flex items-center gap-2 hover:text-amber-600">
                              <Phone className="h-4 w-4" />
                              (512) 467-2000
                            </a>
                      <a href="mailto:info@austinwealthmgmt.com" className="flex items-center gap-2 hover:text-amber-600">
                        <Mail className="h-4 w-4" />
                        Email
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={currentPageName === 'Home' ? '' : 'pt-20'}>
        {children}
      </main>

      {/* Footer */}
      <footer className="relative bg-slate-950 text-white overflow-hidden">
        {/* Geometric pattern background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://media.base44.com/images/public/6960325a10892c1a1fc0a802/0c9997446_intricate-geometric-pattern-stockcake.jpg)',
            backgroundRepeat: 'repeat',
            backgroundSize: '20%',
            backgroundBlendMode: 'screen',
            opacity: 0.08
          }}
        />
        <div className="absolute inset-0 bg-blue-950/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="mb-6">
                <img 
                  src="https://media.base44.com/images/public/6960325a10892c1a1fc0a802/6a2778d1e_image.png" 
                  alt="Austin Wealth Management" 
                  className="h-10 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-slate-400 leading-relaxed max-w-md">
                We serve as professional educators and advocates for the financial well-being 
                of families in Central Texas. No sales pitch, just education.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-white mb-4">Services</h4>
              <ul className="space-y-3">
                {['Planning', 'Investing', 'Education'].map(item => (
                  <li key={item}>
                    <Link 
                      to={createPageUrl(item)} 
                      className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-white mb-4">Company</h4>
              <ul className="space-y-3">
                {['Team', 'Contact'].map(item => (
                  <li key={item}>
                    <Link 
                      to={createPageUrl(item)} 
                      className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative z-10 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Austin Wealth Management. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link to="/privacy-policy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
          <div className="relative z-10 mt-8 pt-6 border-t border-slate-800 flex items-center justify-center">
            <a href="https://www.fahrenheitmarketing.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-amber-400 transition-colors text-sm">
              Designed and developed by Fahrenheit Marketing
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}