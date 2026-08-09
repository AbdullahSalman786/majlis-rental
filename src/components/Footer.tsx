import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

const columns = [
  { title: 'Company', links: [
    { label: 'About',    to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Packages', to: '/packages' },
    { label: 'Gallery',  to: '/gallery' },
  ]},
  { title: 'Events', links: [
    { label: 'Weddings',      to: '/services' },
    { label: 'Corporate',     to: '/services' },
    { label: 'Yacht Parties', to: '/services' },
    { label: 'Private Events',to: '/services' },
  ]},
  { title: 'Support', links: [
    { label: 'FAQs',           to: '/faqs' },
    { label: 'Contact',        to: '/contact' },
    { label: 'Testimonials',   to: '/testimonials' },
    { label: 'Privacy Policy', to: '/' },
  ]},
];

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        className="site-container"
        style={{ paddingTop: '80px', paddingBottom: '56px' }}
      >
        {/* Main grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-5"
          style={{ gap: '48px' }}
        >
          {/* Brand column */}
          <div className="col-span-2">
            <BrandLogo size="md" />
            <p
              style={{
                marginTop: '20px',
                fontSize: '14px',
                lineHeight: 1.8,
                color: 'var(--text-3)',
                fontWeight: 300,
                maxWidth: '280px',
              }}
            >
              Luxury hookah catering and event services for Florida's most exclusive celebrations.
            </p>
          </div>

          {/* Link columns */}
          {columns.map(col => (
            <div key={col.title} className="col-span-1">
              <h4
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '24px',
                }}
              >
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      style={{
                        display: 'block',
                        fontSize: '14px',
                        color: 'var(--text-3)',
                        fontWeight: 300,
                        textDecoration: 'none',
                        transition: 'color 200ms ease',
                        padding: '2px 0',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-1)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'; }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            marginTop: '56px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <p style={{ fontSize: '13px', color: 'var(--text-4)', fontWeight: 300 }}>
            © {new Date().getFullYear()} Hookah Rental. All rights reserved. Made by <a href="https://www.pakarabtechzone.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Pak Arab Tech Zone</a>.
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-4)', letterSpacing: '0.1em', fontWeight: 300 }}>
            Miami · Orlando
          </p>
        </div>
      </div>
    </footer>
  );
}
