import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Phone, Mail, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Planning', href: 'Planning' },
  { name: 'Investing', href: 'Investing' },
  { name: 'Team', href: 'Team' },
  { name: 'Education', href: 'Education' },
  { name: 'Contact', href: 'Contact' }
];

export default function Layout({ children, currentPageName }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = currentPageName === 'Home';

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

  return (
    <div className="min-h-screen bg-white">
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
                <Link
                  key={item.name}
                  to={createPageUrl(item.href)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentPageName === item.href
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
                      <Link
                        key={item.name}
                        to={createPageUrl(item.href)}
                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                          currentPageName === item.href
                            ? 'bg-amber-50 text-amber-600'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {item.name}
                      </Link>
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
                      <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-amber-600">
                        <Phone className="h-4 w-4" />
                        Call Us
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
      <footer className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
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

          <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Austin Wealth Management. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}