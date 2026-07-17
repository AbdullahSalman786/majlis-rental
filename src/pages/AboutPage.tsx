import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useScrollReveal';
import SectionHeading from '../components/SectionHeading';
import BrandLogo from '../components/BrandLogo';
import { ArrowRight, Award, Shield, Users, Clock, Sparkles, Heart } from 'lucide-react';

const brandDestinations = [
  {
    variant: 'master' as const,
    title: 'Master Brand',
    desc: 'The benchmark of luxury hookah catering, delivering five-star hospitality standards state-wide.',
    img: 'https://images.pexels.com/photos/20122617/pexels-photo-20122617.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
    link: '/about',
    linkText: 'Our Story',
  },
  {
    variant: 'miami' as const,
    title: 'Miami Elite',
    desc: 'Serving high-profile yacht charters, exclusive beach clubs, and private estate events in South Florida.',
    img: 'https://images.pexels.com/photos/17315409/pexels-photo-17315409.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
    link: '/contact',
    linkText: 'Inquire Miami',
  },
  {
    variant: 'orlando' as const,
    title: 'Orlando Signature',
    desc: 'Bespoke corporate catering, luxury hospitality partnerships, and premium conventions in Central Florida.',
    img: 'https://images.pexels.com/photos/16935900/pexels-photo-16935900.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
    link: '/contact',
    linkText: 'Inquire Orlando',
  },
];

const values = [
  { icon: Award,    title: 'Excellence',      desc: 'Every detail curated to exceed the highest standards.' },
  { icon: Shield,   title: 'Trust',           desc: "Trusted by Miami's most discerning event planners." },
  { icon: Users,    title: 'Professionalism', desc: 'Five-star trained service staff at every event.' },
  { icon: Clock,    title: 'Reliability',     desc: 'Punctual, prepared, and perfectly executed.' },
  { icon: Sparkles, title: 'Innovation',      desc: 'Modern equipment and premium offerings.' },
  { icon: Heart,    title: 'Dedication',      desc: 'Passionate about unforgettable moments.' },
];

const HERO_IMG = 'https://images.pexels.com/photos/14443340/pexels-photo-14443340.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

export default function AboutPage() {
  const { ref: r1, visible: v1 } = useReveal(0.06);
  const { ref: r2, visible: v2 } = useReveal(0.06);
  const { ref: r3, visible: v3 } = useReveal(0.06);
  const { ref: r4, visible: v4 } = useReveal(0.06);

  return (
    <>
      {/* ══════════════════════════════════
          HERO — Page Header
      ══════════════════════════════════ */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: '52vh' }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/16935993/pexels-photo-16935993.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1400"
            alt="Luxury event setup"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.75) 60%, rgba(8,8,8,1) 100%)' }}
          />
        </div>

        {/* Radial glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px', height: '300px',
            background: 'radial-gradient(ellipse, rgba(198,161,69,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div
          ref={r1}
          className="relative z-10 site-container w-full text-center"
          style={{
            paddingTop: '100px',
            paddingBottom: '80px',
            opacity: v1 ? 1 : 0,
            transform: v1 ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.9s ease, transform 0.9s ease',
          }}
        >
          <span className="lux-label" style={{ marginBottom: '24px' }}>About Us</span>
          <h1 className="lux-h1" style={{ marginTop: '0', marginBottom: '24px', maxWidth: '760px', marginLeft: 'auto', marginRight: 'auto' }}>
            A Luxury Hospitality Company
          </h1>
          <p className="lux-body" style={{ maxWidth: '560px', margin: '0 auto' }}>
            We bring the standard of the world's finest hotels and event companies to every experience we deliver.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════
          OUR STORY
      ══════════════════════════════════ */}
      <section className="bg-alt" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="site-container">
          <div
            ref={r2}
            className="grid grid-cols-1 lg:grid-cols-2 items-center"
            style={{
              gap: '72px',
              opacity: v2 ? 1 : 0,
              transform: v2 ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.75s ease, transform 0.75s ease',
            }}
          >
            {/* Image */}
            <div
              className="overflow-hidden"
              style={{ borderRadius: '24px', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}
            >
              <img
                src={HERO_IMG}
                alt="Premium hookah close-up"
                className="w-full object-cover"
                style={{ display: 'block', aspectRatio: '4/3' }}
                loading="lazy"
              />
            </div>

            {/* Text */}
            <div>
              <span className="lux-label" style={{ marginBottom: '16px' }}>Our Story</span>
              <h2 className="lux-h2" style={{ marginBottom: '24px' }}>
                Redefining Premium Event Services
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                <p className="lux-body" style={{ maxWidth: '500px' }}>
                  Hookah Rental was founded on a simple belief: hookah service for events should meet
                  the same standard as every other luxury hospitality offering.
                </p>
                <p className="lux-body" style={{ maxWidth: '500px' }}>
                  We operate like a premium catering service — professional staff, pristine equipment,
                  and an unwavering commitment to client satisfaction.
                </p>
              </div>

              {/* Stats */}
              <div
                className="grid grid-cols-3 gap-4"
                style={{ paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.07)' }}
              >
                {[{ v: '500+', l: 'Events' }, { v: '5.0', l: 'Rating' }, { v: '2', l: 'Markets' }].map((s, idx) => (
                  <div
                    key={s.l}
                    className="text-center"
                    style={{
                      paddingRight: '8px',
                      borderRight: idx < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    }}
                  >
                    <p className="stat-number">{s.v}</p>
                    <p className="stat-label" style={{ marginTop: '8px' }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          VALUES
      ══════════════════════════════════ */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', background: 'var(--bg)' }}>
        <div className="site-container">
          <SectionHeading
            eyebrow="Our Values"
            title="The Pillars of Our Service"
            description="Every experience is grounded in these core principles."
          />
          <div
            ref={r3}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{
              opacity: v3 ? 1 : 0,
              transform: v3 ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.75s ease, transform 0.75s ease',
            }}
          >
            {values.map((v, i) => (
              <div
                key={v.title}
                className="site-card"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div
                  style={{
                    width: '44px', height: '44px',
                    borderRadius: '14px',
                    background: 'var(--gold-muted)',
                    border: '1px solid rgba(198,161,69,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <v.icon style={{ width: '20px', height: '20px', color: 'var(--gold)' }} aria-hidden="true" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h3 className="lux-h3">{v.title}</h3>
                  <p className="lux-body-sm">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          BRAND FAMILY
      ══════════════════════════════════ */}
      <section className="bg-alt" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="site-container">
          <SectionHeading
            eyebrow="Brand Identity"
            title="A Unified Luxury Brand System"
            description="One master brand with premium location-based extensions."
          />
          <div
            ref={r4}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            style={{
              maxWidth: '1080px',
              margin: '0 auto',
              opacity: v4 ? 1 : 0,
              transform: v4 ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.75s ease, transform 0.75s ease',
            }}
          >
            {brandDestinations.map((b, i) => (
              <div
                key={b.variant}
                className="site-card group"
                style={{
                  padding: '0',
                  overflow: 'hidden',
                  borderRadius: '24px',
                  animationDelay: `${i * 80}ms`,
                }}
              >
                {/* Image */}
                <div style={{ overflow: 'hidden', borderRadius: '24px 24px 0 0', aspectRatio: '4/3' }}>
                  <img
                    src={b.img}
                    alt={b.title}
                    className="w-full h-full object-cover"
                    style={{ transition: 'transform 500ms ease', display: 'block' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                  <div>
                    <BrandLogo variant={b.variant} size="md" />
                  </div>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-3)', fontWeight: 300, minHeight: '72px' }}>
                    {b.desc}
                  </p>
                  <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <Link
                      to={b.link}
                      className="inline-flex items-center gap-2 group"
                      style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gold)', textDecoration: 'none' }}
                    >
                      {b.linkText}{' '}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CTA
      ══════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: '80px', paddingBottom: '80px' }}
      >
        {/* Radial glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(198,161,69,0.07) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #1a160a 100%)' }}
        />

        <div className="relative z-10 site-container text-center">
          <span className="lux-label" style={{ marginBottom: '24px' }}>Ready to Begin?</span>
          <h2
            className="lux-h2"
            style={{ maxWidth: '680px', margin: '0 auto', marginBottom: '32px' }}
          >
            Ready to Experience the Difference?
          </h2>
          <p
            className="lux-body"
            style={{ maxWidth: '520px', margin: '0 auto', marginBottom: '48px' }}
          >
            Contact our concierge team to begin planning your perfect event.
          </p>
          <Link to="/contact" className="btn-base btn-primary" style={{ minWidth: '200px' }}>
            Get In Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
