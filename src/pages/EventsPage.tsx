import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  AnimatedCard,
  Counter,
  GlowPulse,
  AnimateWrap,
  motion,
} from '../components/AnimatedSection';
import { ArrowRight, Music2, Zap, Mic2, Sparkles, Wine, GuitarIcon } from 'lucide-react';

const entertainmentServices = [
  {
    icon: GuitarIcon,
    title: 'Belly Dancer',
    subtitle: 'Traditional & Fusion Performances',
    desc: 'Mesmerize your guests with world-class belly dancers trained in traditional and contemporary fusion styles. Perfect for Arabian nights, private parties, and luxury galas.',
    img: 'https://images.pexels.com/photos/3543527/pexels-photo-3543527.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    tag: 'Live Performance',
  },
  {
    icon: Music2,
    title: 'Live DJ',
    subtitle: 'Professional DJ Sets & Sound',
    desc: 'Our resident DJs craft the perfect sonic atmosphere — from lounge and deep house to hip-hop and R&B. Full professional sound systems included with every booking.',
    img: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    tag: 'Music & Sound',
  },
  {
    icon: Mic2,
    title: 'Live Performers',
    subtitle: 'Singers, Bands & Acts',
    desc: 'Elevate your event with live vocalists, bands, and specialty performers curated to match your vision. Every performance is rehearsed, professional, and unforgettable.',
    img: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    tag: 'Live Act',
  },
  {
    icon: Zap,
    title: 'LED Dancers',
    subtitle: 'Electrifying Light Shows',
    desc: 'Our LED performance artists transform your venue into a dazzling spectacle. Programmed light sequences synchronized to your music create a breathtaking visual experience.',
    img: 'https://images.pexels.com/photos/1540338/pexels-photo-1540338.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    tag: 'Visual Entertainment',
  },
  {
    icon: Sparkles,
    title: 'Live Saxophone',
    subtitle: 'Smooth & Soulful Jazz Sessions',
    desc: 'A live saxophonist adds unmistakable sophistication. Whether performing alongside a DJ or as a standalone act, the saxophone creates an intimate, luxurious ambiance.',
    img: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    tag: 'Jazz & Lounge',
  },
  {
    icon: Wine,
    title: 'Luxury Bartending',
    subtitle: 'Craft Cocktails & Mixology',
    desc: 'Our expert mixologists craft bespoke cocktail menus tailored to your event. Premium spirits, artisanal garnishes, and flawless service — the finishing touch to any luxury gathering.',
    img: 'https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    tag: 'Mixology',
  },
];

const stats = [
  { value: '6+', label: 'Entertainment Options' },
  { value: '500+', label: 'Events Hosted' },
  { value: '100%', label: 'Satisfaction Rate' },
  { value: '15min', label: 'Response Time' },
];

export default function EventsPage() {
  return (
    <AnimateWrap>
      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section className="bg-surface relative overflow-hidden" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
        {/* Gradient shift background */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ backgroundPosition: '0% 50%' }}
          animate={{ backgroundPosition: '100% 50%' }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          style={{
            background: 'linear-gradient(135deg, rgba(198,161,69,0.04) 0%, rgba(198,161,69,0.02) 25%, transparent 50%, rgba(198,161,69,0.03) 75%, rgba(198,161,69,0.05) 100%)',
            backgroundSize: '300% 300%',
          }}
        />

        <div className="site-container text-center relative z-10">
          <FadeIn delay={0}>
            <span className="text-primary text-small-text font-semibold tracking-[0.2em] uppercase mb-space-4 block">
              Premium Entertainment
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-0 font-display text-hero-heading font-light text-text-primary leading-[1.2] tracking-tight">
              Elevate Every Moment
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-space-6 text-text-secondary text-body font-light max-w-2xl mx-auto leading-[1.5]">
              Curated world-class entertainment designed to transform your event into an unforgettable luxury experience.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-space-8 flex flex-wrap gap-space-4 justify-center">
              <Link to="/contact" className="btn-base btn-primary">
                Book Your Event <ArrowRight className="w-4 h-4 ml-space-2" />
              </Link>
              <Link to="/packages" className="btn-base btn-secondary">
                View Packages
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════
          SERVICES GRID
      ══════════════════════════════════ */}
      <section className="bg-alt border-t border-white/[0.06]" style={{ paddingTop: 'var(--sp-8)', paddingBottom: 'var(--sp-8)' }}>
        <div className="site-container">
          <SectionHeading
            eyebrow="Our Entertainment"
            title="Premium Event Services"
            description="Every act is hand-selected, professionally managed, and seamlessly integrated into your hookah experience."
          />

          <StaggerContainer
            staggerDelay={0.12}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-7"
          >
            {entertainmentServices.map((svc) => (
              <StaggerItem key={svc.title}>
                <AnimatedCard
                  className="flex flex-col"
                  style={{ padding: 0, overflow: 'hidden', borderRadius: 'var(--radius-md)' }}
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden flex-shrink-0">
                    <motion.img
                      src={svc.img}
                      alt={svc.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-space-3 p-space-7 flex-1">
                    <div className="flex items-center gap-space-3">
                      <span className="inline-flex items-center gap-space-2 bg-primary-muted text-primary text-xs font-semibold px-space-3 py-1.5 rounded-full">
                        <svc.icon className="w-3 h-3" />
                        {svc.tag}
                      </span>
                    </div>
                    <h3 className="font-display text-card-title font-semibold text-text-primary leading-[1.2]">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-primary font-medium">{svc.subtitle}</p>
                    <p className="text-small-text text-text-secondary leading-[1.6] font-light">
                      {svc.desc}
                    </p>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════════════════════════════
          STATS
      ══════════════════════════════════ */}
      <section className="bg-bg border-t border-white/[0.06]" style={{ paddingTop: 'var(--sp-6)', paddingBottom: 'var(--sp-6)' }}>
        <div className="site-container">
          <FadeIn direction="up">
            <div className="bg-surface border border-white/[0.06] rounded-[var(--radius-md)] py-space-8 px-space-4 lg:px-space-8 grid grid-cols-2 lg:grid-cols-4 gap-y-6 lg:gap-y-0">
              {stats.map((item, idx) => (
                <div
                  key={item.label}
                  className={`text-center py-2 lg:py-0 ${idx < stats.length - 1 ? 'lg:border-r lg:border-white/[0.06]' : ''}`}
                >
                  <p className="font-display text-3xl lg:text-4xl font-light text-primary leading-[1.2]">
                    <Counter value={item.value} />
                  </p>
                  <p className="mt-space-2 text-xs text-text-secondary tracking-widest uppercase font-light">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════
          CTA
      ══════════════════════════════════ */}
      <section
        className="relative overflow-hidden border-t border-white/[0.06]"
        style={{
          paddingTop: 'var(--sp-8)',
          paddingBottom: 'var(--sp-8)',
          background: 'linear-gradient(to top right, #0a0a0a, #111111, #221b0d)',
        }}
      >
        <GlowPulse color="rgba(198,161,69,0.07)" size="500px" />

        <div className="relative z-10 site-container text-center">
          <FadeIn delay={0}>
            <span className="text-primary text-small-text font-semibold tracking-[0.2em] uppercase mb-space-4 block">
              Ready to elevate your event?
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl font-light text-text-primary leading-[1.2] tracking-tight mb-space-4 max-w-2xl mx-auto">
              Book Your Premium Entertainment Experience
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-space-6 text-text-secondary text-body font-light max-w-xl mx-auto leading-[1.6] mb-space-8">
              Contact our concierge team and we'll craft a bespoke entertainment package tailored to your vision. We respond within 15 minutes.
            </p>
          </FadeIn>
          <FadeIn delay={0.35}>
            <div className="mt-space-8 flex flex-col sm:flex-row items-center justify-center gap-space-5">
              <Link
                to="/contact"
                className="w-full sm:w-auto btn-base btn-primary shadow-lg hover:shadow-primary/10 inline-flex items-center justify-center gap-space-2"
              >
                Book Your Event <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+13055550199"
                className="w-full sm:w-auto btn-base btn-secondary hover:bg-white/[0.02] transition-colors"
              >
                Call Us Now
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </AnimateWrap>
  );
}
