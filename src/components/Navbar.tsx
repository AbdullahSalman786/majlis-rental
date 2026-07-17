import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import BrandLogo from './BrandLogo';

const links = [
  { label: 'Home',     to: '/' },
  { label: 'About',    to: '/about' },
  { label: 'Packages', to: '/packages' },
  { label: 'Services', to: '/services' },
  { label: 'Events',   to: '/events' },
  { label: 'Menu',     to: '/menu' },
  { label: 'Gallery',  to: '/gallery' },
  { label: 'Contact',  to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [loc.pathname]);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        height: 'var(--nav-h)',
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'rgba(8,8,8,0.6)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className="site-container flex items-center justify-between"
        style={{ height: 'var(--nav-h)' }}
      >
        {/* Logo */}
        <Link to="/" aria-label="Hookah Rental home" className="flex items-center">
          <BrandLogo size="md" />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map(l => {
            const active = loc.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  padding: '8px 14px',
                  fontSize: '14px',
                  fontWeight: 500,
                  borderRadius: '10px',
                  letterSpacing: '0.01em',
                  textDecoration: 'none',
                  transition: 'color 200ms ease, background 200ms ease',
                  color: active ? 'var(--gold)' : 'var(--text-3)',
                  background: active ? 'var(--gold-muted)' : 'transparent',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-1)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-3)';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-5">
          <a
            href="tel:+13055550199"
            className="flex items-center gap-2"
            style={{ fontSize: '13px', color: 'var(--text-3)', textDecoration: 'none', transition: 'color 200ms ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'; }}
          >
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            407-960-1018
          </a>
          <Link to="/contact" className="btn-base btn-primary" style={{ height: '44px', padding: '0 24px', fontSize: '14px', borderRadius: '12px' }}>
            Reserve Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden flex items-center justify-center"
          style={{
            width: '40px', height: '40px', borderRadius: '10px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'var(--text-2)',
            cursor: 'pointer',
          }}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: 'rgba(8,8,8,0.97)',
            backdropFilter: 'blur(24px)',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            padding: '16px 24px 28px',
          }}
          className="lg:hidden"
        >
          {links.map(l => {
            const active = loc.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  fontSize: '15px',
                  fontWeight: 500,
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: active ? 'var(--gold)' : 'var(--text-2)',
                  background: active ? 'var(--gold-muted)' : 'transparent',
                  marginBottom: '2px',
                  transition: 'color 200ms ease, background 200ms ease',
                }}
              >
                {l.label}
              </Link>
            );
          })}
          <div
            style={{
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <a
              href="tel:+13055550199"
              className="flex items-center gap-2"
              style={{ padding: '10px 16px', fontSize: '14px', color: 'var(--gold)', textDecoration: 'none' }}
            >
              <Phone className="w-4 h-4" /> 407-960-1018
            </a>
            <Link
              to="/contact"
              className="btn-base btn-primary w-full"
              style={{ fontSize: '14px', height: '48px' }}
            >
              Reserve Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
