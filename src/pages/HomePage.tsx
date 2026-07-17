import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useScrollReveal';
import SectionHeading from '../components/SectionHeading';
import BrandLogo from '../components/BrandLogo';
import { Star, ArrowRight, Shield, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const IMG = {
  hero: 'https://images.pexels.com/photos/17315476/pexels-photo-17315476.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920',
  hookah: 'https://images.pexels.com/photos/20122617/pexels-photo-20122617.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  wedding: 'https://images.pexels.com/photos/17315409/pexels-photo-17315409.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  corporate: 'https://images.pexels.com/photos/16935900/pexels-photo-16935900.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  yacht: 'https://images.pexels.com/photos/29318858/pexels-photo-29318858.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  party: 'https://images.pexels.com/photos/16935974/pexels-photo-16935974.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  cta: 'https://images.pexels.com/photos/16935993/pexels-photo-16935993.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1400',
};

const stats = [
  { value: '500+', label: 'Events' },
  { value: '5.0', label: 'Rating' },
  { value: '2', label: 'Locations' },
  { value: '15 min', label: 'Response' },
];

const services = [
  { title: 'Luxury Weddings', desc: 'Curated hookah experiences that complement your celebration.', img: IMG.wedding },
  { title: 'Corporate Events', desc: 'Sophisticated hospitality that impresses clients.', img: IMG.corporate },
  { title: 'Yacht Experiences', desc: 'Premium on-water service for private charters.', img: IMG.yacht },
  { title: 'Private Celebrations', desc: 'Bespoke experiences for intimate gatherings.', img: IMG.party },
];

const reviews = [
  { name: 'Isabella Martinez', role: 'Wedding · Miami', text: "Every detail was handled with the care you'd expect from a five-star hotel. Our guests couldn't stop talking about it.", initials: 'IM' },
  { name: 'Marcus Johnson', role: 'Corporate Event Planner', text: 'They transformed our corporate gala into something truly memorable. Professional, elegant, and perfectly executed.', initials: 'MJ' },
  { name: 'Sofia Rodriguez', role: 'Birthday · Miami Beach', text: 'From setup to service, everything was flawless. The VIP package was worth every penny.', initials: 'SR' },
  { name: 'David Chen', role: 'Yacht Charter', text: 'Having premium hookah service on our charter was the perfect touch. They truly understand maritime luxury.', initials: 'DC' },
  { name: 'Natasha Williams', role: 'Hotel Coordinator', text: 'We partner with Hookah Rental for resort events. The consistency they bring matches our five-star property.', initials: 'NW' },
  { name: 'Roberto Fernandez', role: 'Private Party Host', text: 'Premium equipment, unlimited flavors, most professional staff. They turned our party into a VIP lounge.', initials: 'RF' },
  { name: 'Alexandra Kim', role: 'Wedding Planner', text: 'As a luxury planner, I need vendors I can trust completely. Hookah Rental never disappoints.', initials: 'AK' },
  { name: 'James Patterson', role: 'Corporate · Brickell', text: 'The setup was stunning and service seamless. Multiple attendees asked for their contact.', initials: 'JP' },
  { name: 'Camila Vasquez', role: 'Anniversary Celebration', text: 'Our anniversary was elevated beyond what we imagined. Exceptional from start to finish.', initials: 'CV' },
];

const testimonialStats = [
  { v: '500+', l: 'Events' },
  { v: '5.0', l: 'Rating' },
  { v: '100%', l: 'Satisfaction' },
  { v: '85%', l: 'Repeat Clients' },
];

const brandDestinations = [
  {
    variant: 'master' as const,
    title: 'Master Brand',
    desc: 'The benchmark of luxury hookah catering, delivering five-star hospitality standards state-wide.',
    img: IMG.hookah,
    link: '/about',
    linkText: 'Our Story',
  },
  {
    variant: 'miami' as const,
    title: 'Miami Elite',
    desc: 'Serving high-profile yacht charters, exclusive beach clubs, and private estate events in South Florida.',
    img: IMG.wedding,
    link: '/contact',
    linkText: 'Inquire Miami',
  },
  {
    variant: 'orlando' as const,
    title: 'Orlando Signature',
    desc: 'Bespoke corporate catering, luxury hospitality partnerships, and premium conventions in Central Florida.',
    img: IMG.corporate,
    link: '/contact',
    linkText: 'Inquire Orlando',
  },
];

/* ─────────────────────────────────────────
   Testimonial Card
───────────────────────────────────────── */
function TestimonialCard({ t }: { t: typeof reviews[0] }) {
  return (
    <div
      className="site-card h-full flex flex-col"
      style={{ padding: '40px', borderRadius: '24px' }}
    >
      {/* Quotation mark */}
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '80px',
          lineHeight: '0.6',
          color: 'var(--gold)',
          opacity: 0.25,
          marginBottom: '24px',
          fontWeight: 700,
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-5" aria-label="5 out of 5 stars">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4" style={{ color: 'var(--gold)', fill: 'var(--gold)' }} />
        ))}
      </div>

      {/* Text */}
      <p
        className="flex-1 font-light italic"
        style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--text-2)' }}
      >
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Author */}
      <div
        className="flex items-center gap-4"
        style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: '44px', height: '44px',
            borderRadius: '50%',
            background: 'var(--gold-muted)',
            border: '1px solid rgba(198,161,69,0.3)',
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.05em' }}>
            {t.initials}
          </span>
        </div>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-1)', marginBottom: '2px' }}>
            {t.name}
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-3)', letterSpacing: '0.03em' }}>{t.role}</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Testimonial Carousel
───────────────────────────────────────── */
function TestimonialCarousel() {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const totalPages = Math.ceil(reviews.length / cardsPerView);

  useEffect(() => { setCurrentPage(0); }, [cardsPerView]);

  const goToPage = useCallback((page: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentPage(((page % totalPages) + totalPages) % totalPages);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [totalPages, isTransitioning]);

  const next = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const prev = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; setIsPaused(true); };
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    setTimeout(() => setIsPaused(false), 3000);
  };

  const startIdx = currentPage * cardsPerView;
  const visibleReviews = [...reviews.slice(startIdx, startIdx + cardsPerView)];
  while (visibleReviews.length < cardsPerView) visibleReviews.push(reviews[visibleReviews.length % reviews.length]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="overflow-hidden">
        <div
          className="grid transition-all duration-500 ease-out"
          style={{ gridTemplateColumns: `repeat(${cardsPerView}, minmax(0, 1fr))`, gap: '24px' }}
        >
          {visibleReviews.map((t, i) => (
            <div
              key={`${currentPage}-${i}`}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6" style={{ marginTop: '48px' }}>
        <button
          onClick={() => { prev(); setIsPaused(true); setTimeout(() => setIsPaused(false), 3000); }}
          className="flex items-center justify-center transition-all duration-300"
          style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'var(--text-3)',
            cursor: 'pointer',
          }}
          aria-label="Previous testimonials"
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(198,161,69,0.3)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => { goToPage(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 3000); }}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === currentPage ? '28px' : '7px',
                height: '7px',
                background: i === currentPage ? 'var(--gold)' : 'rgba(255,255,255,0.15)',
                cursor: 'pointer',
                border: 'none',
              }}
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === currentPage ? 'true' : undefined}
            />
          ))}
        </div>

        <button
          onClick={() => { next(); setIsPaused(true); setTimeout(() => setIsPaused(false), 3000); }}
          className="flex items-center justify-center transition-all duration-300"
          style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'var(--text-3)',
            cursor: 'pointer',
          }}
          aria-label="Next testimonials"
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(198,161,69,0.3)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Progress bar */}
      <div
        style={{
          marginTop: '20px',
          maxWidth: '120px',
          margin: '20px auto 0',
          height: '1px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '1px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'var(--gold)',
            opacity: 0.5,
            borderRadius: '1px',
            width: `${((currentPage + 1) / totalPages) * 100}%`,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   HomePage
───────────────────────────────────────── */
export default function HomePage() {
  const { ref: r1, visible: v1 } = useReveal(0.06);
  const { ref: r3, visible: v3 } = useReveal(0.08);
  const { ref: r4, visible: v4 } = useReveal(0.06);
  const { ref: r5, visible: v5 } = useReveal(0.06);
  const { ref: r6, visible: v6 } = useReveal(0.06);
  const { ref: r7, visible: v7 } = useReveal(0.06);

  return (
    <>
      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: '90vh' }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img src={IMG.hero} alt="Luxury event venue" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.35) 0%, rgba(8,8,8,0.6) 55%, rgba(8,8,8,0.95) 100%)' }} />
        </div>

        {/* Content */}
        <div
          ref={r1}
          className="relative z-10 site-container w-full"
          style={{
            paddingTop: '100px',
            paddingBottom: '80px',
            opacity: v1 ? 1 : 0,
            transform: v1 ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.9s ease, transform 0.9s ease',
          }}
        >
          <div style={{ maxWidth: '700px' }}>


            {/* Label */}
            <span className="lux-label" style={{ marginBottom: '24px' }}>
              Luxury Event Services
            </span>

            {/* Heading */}
            <h1 className="lux-h1" style={{ marginTop: '0', marginBottom: '32px', maxWidth: '680px' }}>
              Premium Hookah Experiences for{' '}
              <span className="text-gold-gradient">Extraordinary Events</span>
            </h1>

            {/* Description */}
            <p className="lux-body" style={{ marginBottom: '40px', maxWidth: '580px' }}>
              A luxury catering company delivering refined hookah experiences for weddings,
              corporate events, yacht parties, and private celebrations.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4" style={{ marginBottom: '20px' }}>
              <Link to="/contact" className="btn-base btn-primary">
                Reserve Your Experience <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/packages" className="btn-base btn-secondary">
                View Packages
              </Link>
            </div>

            {/* Statistics */}
            <div
              className="flex flex-wrap gap-8 sm:gap-12"
              style={{
                paddingTop: '32px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {stats.map(s => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="stat-number">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          ABOUT PREVIEW
      ══════════════════════════════════ */}
      <section
        className="bg-alt"
        style={{ paddingTop: '50px', paddingBottom: '50px' }}
      >
        <div className="site-container">
          <div
            ref={r3}
            className="grid grid-cols-1 lg:grid-cols-2 items-center"
            style={{
              gap: '72px',
              opacity: v3 ? 1 : 0,
              transform: v3 ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.75s ease, transform 0.75s ease',
            }}
          >
            {/* Image */}
            <div
              className="overflow-hidden"
              style={{ borderRadius: '24px', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}
            >
              <img
                src={IMG.hookah}
                alt="Premium gold hookah"
                className="w-full object-cover"
                style={{ display: 'block', aspectRatio: '4/3', transition: 'transform 600ms ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                loading="lazy"
              />
            </div>

            {/* Text */}
            <div>
              <span className="lux-label" style={{ marginBottom: '16px' }}>Our Philosophy</span>
              <h2 className="lux-h2" style={{ marginBottom: '24px' }}>
                Where Luxury Hospitality Meets Refined Experience
              </h2>
              <p className="lux-body" style={{ marginBottom: '40px', maxWidth: '500px' }}>
                We are a luxury catering company that has elevated the hookah experience into a refined,
                premium hospitality offering. Every element reflects the attention to detail found in the
                world's finest hotels.
              </p>

              {/* Feature Pills */}
              <div
                className="grid grid-cols-2 gap-3"
                style={{ paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.07)' }}
              >
                {[
                  { icon: Shield, label: 'White-Glove Service' },
                  { icon: Star, label: 'Premium Equipment' },
                  { icon: Users, label: 'Professional Staff' },
                  { icon: Clock, label: 'Always On Time' },
                ].map(f => (
                  <div
                    key={f.label}
                    className="flex items-center gap-3 group cursor-default"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '14px',
                      padding: '16px 18px',
                      transition: 'background 250ms ease, border-color 250ms ease, transform 250ms ease',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'rgba(198,161,69,0.06)';
                      el.style.borderColor = 'rgba(198,161,69,0.2)';
                      el.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'rgba(255,255,255,0.03)';
                      el.style.borderColor = 'rgba(255,255,255,0.07)';
                      el.style.transform = 'translateY(0)';
                    }}
                  >
                    <f.icon
                      className="flex-shrink-0"
                      style={{ width: '18px', height: '18px', color: 'var(--gold)' }}
                      aria-hidden="true"
                    />
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-2)', letterSpacing: '0.02em' }}>
                      {f.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Link */}
              <Link
                to="/about"
                className="inline-flex items-center gap-2 group"
                style={{
                  marginTop: '36px',
                  color: 'var(--gold)',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  transition: 'gap 250ms ease',
                }}
              >
                Learn more about us{' '}
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SERVICES
      ══════════════════════════════════ */}
      <section style={{ paddingTop: '50px', paddingBottom: '80px', background: 'var(--bg)' }}>
        <div className="site-container">
          <SectionHeading
            eyebrow="Services"
            title="Premium Experiences for Every Occasion"
            description="From intimate gatherings to grand celebrations, we deliver hookah experiences tailored to your event."
          />
          <div
            ref={r4}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            style={{
              opacity: v4 ? 1 : 0,
              transform: v4 ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.75s ease, transform 0.75s ease',
            }}
          >
            {services.map((s, i) => (
              <Link
                key={s.title}
                to="/services"
                className="group"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="site-card"
                  style={{
                    padding: '0',
                    overflow: 'hidden',
                    borderRadius: '24px',
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  {/* Image */}
                  <div style={{ overflow: 'hidden', borderRadius: '24px 24px 0 0' }}>
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-full object-cover"
                      style={{
                        aspectRatio: '4/3',
                        display: 'block',
                        transition: 'transform 500ms cubic-bezier(0.25,0.46,0.45,0.94)',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h3 className="lux-h3">{s.title}</h3>
                    <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--text-3)', fontWeight: 300 }}>
                      {s.desc}
                    </p>
                    <div style={{ marginTop: '8px' }}>
                      <span
                        className="inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                        style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gold)' }}
                      >
                        Learn more <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          BRAND FAMILY
      ══════════════════════════════════ */}
      <section className="bg-alt" style={{ paddingTop: '80px', paddingBottom: '50px' }}>
        <div className="site-container">
          <SectionHeading
            eyebrow="Our Brand"
            title="One Vision, Two Destinations"
            description="A unified luxury brand delivering consistent premium experiences across Florida."
          />
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            style={{ maxWidth: '1080px', margin: '0 auto' }}
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
          TESTIMONIALS
      ══════════════════════════════════ */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', background: 'var(--bg)' }}>
        <div className="site-container">
          <SectionHeading
            eyebrow="Testimonials"
            title="Trusted by Discerning Clients"
            description="Hear from hosts, planners, and clients who trust us with their most important events."
          />
          <div
            ref={r5}
            style={{
              opacity: v5 ? 1 : 0,
              transform: v5 ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.75s ease, transform 0.75s ease',
            }}
          >
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          TESTIMONIAL STATS
      ══════════════════════════════════ */}
      <section style={{ paddingTop: '10px', paddingBottom: '80px', background: 'var(--bg)' }}>
        <div className="site-container">
          <div
            ref={r6}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '24px',
              padding: '48px 32px',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '40px 0',
              opacity: v6 ? 1 : 0,
              transform: v6 ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.75s ease, transform 0.75s ease',
            }}
            className="lg:grid-cols-4"
          >
            {testimonialStats.map((s, idx) => (
              <div
                key={s.l}
                className="text-center"
                style={{
                  borderRight: idx < testimonialStats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
              >
                <p className="stat-number">{s.v}</p>
                <p className="stat-label" style={{ marginTop: '10px' }}>{s.l}</p>
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
        style={{ paddingTop: '80px', paddingBottom: '2px' }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img src={IMG.cta} alt="" className="w-full h-full object-cover opacity-30" loading="lazy" />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.85) 50%, rgba(18,14,5,0.7) 100%)' }}
          />
        </div>

        {/* Radial glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(198,161,69,0.07) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        <div
          ref={r7}
          className="relative z-10 site-container text-center"
          style={{
            opacity: v7 ? 1 : 0,
            transform: v7 ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.75s ease, transform 0.75s ease',
          }}
        >
          <span className="lux-label" style={{ marginBottom: '24px' }}>
            Reserve Your Date
          </span>

          <h2
            className="lux-h2"
            style={{ maxWidth: '680px', margin: '0 auto', marginBottom: '32px' }}
          >
            Elevate Your Next Event
          </h2>

          <p
            className="lux-body"
            style={{ maxWidth: '520px', margin: '0 auto', marginBottom: '56px' }}
          >
            Premium dates are limited. Contact our concierge team to reserve your experience.
          </p>

          {/* Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ marginBottom: '120px' }}
          >
            <Link to="/contact" className="btn-base btn-primary w-full sm:w-auto" style={{ minWidth: '200px' }}>
              Reserve Now
            </Link>
            <a href="tel:+13055550199" className="btn-base btn-secondary w-full sm:w-auto" style={{ minWidth: '200px' }}>
              Call Concierge
            </a>
          </div>
        </div>
      </section>

      {/* Animation keyframe */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.55s cubic-bezier(0.22,0.61,0.36,1) both; }

        /* Force 4-col stats on large */
        @media (min-width: 992px) {
          [class*="lg\\:grid-cols-4"] { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </>
  );
}