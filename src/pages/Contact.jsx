import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const contactInfo = [
  {
    icon: MapPin,
    title: "Office Location",
    details: ["Austin, Texas", "Central Texas Area"]
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["Contact us for phone details"]
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@austinwealthmgmt.com"]
  },
  {
    icon: Clock,
    title: "Hours",
    details: ["Monday - Friday", "9:00 AM - 5:00 PM"]
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    subscribe: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the form data
    setSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-slate-950 overflow-hidden">
        <img 
          src="https://media.base44.com/images/public/6960325a10892c1a1fc0a802/539283da0_generated_image.png" 
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-8 text-xs font-medium tracking-widest text-amber-400 uppercase border border-amber-400/30 rounded-full">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
              Contact
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                Austin Wealth Management
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
              Ready to take the first step toward your financial goals? 
              We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <AnimatedSection direction="left">
              <span className="text-xs font-medium tracking-widest text-amber-600 uppercase">
                Reach Out
              </span>
              <h2 className="mt-4 text-3xl font-light text-slate-900 tracking-tight">
                We're Here to Help
              </h2>
              <p className="mt-4 text-slate-500 leading-relaxed">
                Schedule a time to chat with one of our Certified Financial Planners (CFP®). 
                We're happy to answer any questions and help you understand if we're the right fit.
              </p>

              <div className="mt-10 grid sm:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{item.title}</h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-slate-500 text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-10 h-64 rounded-2xl bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">Serving Central Texas</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection direction="right">
              <div className="p-8 lg:p-10 rounded-3xl bg-slate-50 border border-slate-100">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-medium text-slate-900 mb-2">Thank You!</h3>
                    <p className="text-slate-500">
                      We've received your message and will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-medium text-slate-900 mb-2">Send Us a Message</h3>
                    <p className="text-slate-500 mb-8">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="h-12 bg-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="h-12 bg-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="h-12 bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="h-12 bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">How Can We Help? *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="bg-white resize-none"
                        />
                      </div>

                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="subscribe"
                          name="subscribe"
                          checked={formData.subscribe}
                          onCheckedChange={(checked) => 
                            setFormData(prev => ({ ...prev, subscribe: checked }))
                          }
                        />
                        <Label htmlFor="subscribe" className="text-sm text-slate-600 cursor-pointer">
                          I would like to subscribe to the email newsletter
                        </Label>
                      </div>

                      <Button 
                        type="submit"
                        size="lg"
                        className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-medium h-14 rounded-xl"
                      >
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-teal-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-light text-white">
              Prefer to talk? <span className="text-amber-400">We're happy to chat.</span>
            </h2>
            <p className="mt-4 text-slate-400">
              Schedule a free introductory consultation with one of our financial advisors.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}