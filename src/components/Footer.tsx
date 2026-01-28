"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/tavishi-panwar/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:tavishilnu2026@u.northwestern.edu",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Top Section - CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s Build Something <span className="gradient-text">Amazing</span>
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Looking for a product manager who can turn ideas into impactful products?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full gradient-bg text-white font-semibold"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(99, 102, 241, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Divider with gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />

        {/* Middle Section - Links & Info */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="text-center md:text-left">
            <motion.a
              href="#home"
              className="inline-flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/tavishi_avatar.png"
                alt="Tavishi"
                width={48}
                height={48}
                className="rounded-full border-2 border-primary/50 shadow-lg shadow-primary/20"
              />
              <span className="text-2xl font-bold gradient-text">Tavishi</span>
            </motion.a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Product Manager passionate about building user-centric solutions and driving business impact through data-driven decisions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary">Quick Links</h4>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  whileHover={{ x: 4 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Social & Contact */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary">Connect</h4>
            <div className="flex justify-center md:justify-end gap-3 mb-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-secondary hover:gradient-bg hover:text-white flex items-center justify-center transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Evanston, IL, USA
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Tavishi Panwar. Crafted with passion.
          </p>

          {/* Back to top */}
          <motion.a
            href="#home"
            className="group flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
            whileHover={{ y: -2 }}
          >
            Back to top
            <motion.span
              className="w-8 h-8 rounded-full bg-secondary group-hover:gradient-bg flex items-center justify-center transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <svg className="w-4 h-4 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.span>
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
