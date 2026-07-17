import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  AnimatedCard,
  ParallaxImage,
  Counter,
  GlowPulse,
  AnimateWrap,
  motion,
} from '../components/AnimatedSection';
import { ArrowRight, Heart, Building2, PartyPopper, Sailboat, Hotel, Crown } from 'lucide-react';

const events = [
  { icon: Heart, title: 'Luxury Weddings', desc: 'Bespoke hookah experiences that complement your wedding celebration. Coordinated with your planner for seamless integration.', img: 'https://images.pexels.com/photos/17315409/pexels-photo-17315409.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800' },
  { icon: Building2, title: 'Corporate Events', desc: 'Sophisticated hospitality for galas, product launches, and executive gatherings that impresses clients.', img: 'https://images.pexels.com/photos/16935900/pexels-photo-16935900.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800' },
  { icon: PartyPopper, title: 'Private Celebrations', desc: 'Birthdays, anniversaries, and private parties elevated with premium hookah service tailored to your vision.', img: 'https://images.pexels.com/photos/16935974/pexels-photo-16935974.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800' },
  { icon: Sailboat, title: 'Yacht Experiences', desc: 'Premium on-water service for private yacht charters and waterfront events with flawless maritime setup.', img: 'https://images.pexels.com/photos/29318858/pexels-photo-29318858.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800' },
  { icon: Hotel, title: 'Hotels & Resorts', desc: 'Partnering with luxury properties to provide premium hookah amenities for guests and VIP events.', img: 'https://images.pexels.com/photos/14036272/pexels-photo-14036272.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800' },
  { icon: Crown, title: 'VIP & Exclusive', desc: 'Ultra-premium experiences for high-profile clients requiring discretion and exceptional service.', img: 'https://images.pexels.com/photos/16120162/pexels-photo-16120162.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800' },
];

const stats = [
  { value: '6+', label: 'Service Options' },
  { value: '500+', label: 'Events Hosted' },
  { value: '100%', label: 'Satisfaction' },
  { value: '15min', label: 'Response Time' },
];

export default function ServicesPage() {
  return (
    <AnimateWrap>
      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-8)' }}>
        {/* Parallax Background */}
        <ParallaxImage
          src="https://images.pexels.com/photos/19986452/pexels-photo-19986452.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1400"
          alt=""
          className="absolute inset-0"
          speed={0.08}
          overlay={<div className="absolute inset-0 bg-bg/85" />}
        />

        <div className="relative z-10 site-container text-center">
          <FadeIn delay={0}>
            <span className="text-primary text-small-text font-semibold tracking-[0.2em] uppercase mb-space-4 block">
              Services
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-0 font-display text-hero-heading font-light text-text-primary leading-[1.2] tracking-tight">
              Premium Event Services
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-space-6 text-text-secondary text-body font-light max-w-xl mx-auto leading-[1.5]">
              Luxury hookah catering for Florida's most distinguished events.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════
          SERVICES GRID
      ══════════════════════════════════ */}
      <section className="bg-alt border-t border-white/[0.06]" style={{ paddingTop: 'var(--sp-8)', paddingBottom: 'var(--sp-8)' }}>
        <div className="site-container">
          <SectionHeading
            eyebrow="Event Services"
            title="Tailored to Your Occasion"
            description="Every occasion deserves a tailored touch. We design hookah experiences that perfectly complement your event."
          />

          <StaggerContainer
            staggerDelay={0.12}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-6 lg:gap-space-7"
          >
            {events.map((e) => (
              <StaggerItem key={e.title}>
                <AnimatedCard className="flex flex-col" style={{ padding: 0, overflow: 'hidden' }}>
                  {/* Image */}
                  <div className="aspect-[4/3] rounded-[var(--border-radius)] overflow-hidden flex-shrink-0">
                    <motion.img
                      src={e.img}
                      alt={e.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-space-3" style={{ padding: 'var(--card-padding)' }}>
                    <div className="flex items-center gap-space-2">
                      <e.icon className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                      <h3 className="font-display text-card-title font-medium text-text-primary">{e.title}</h3>
                    </div>
                    <p className="text-small-text text-text-secondary leading-[1.5] font-light">{e.desc}</p>
                  </div>

                  {/* Link */}
                  <div className="mt-auto pt-space-2" style={{ padding: '0 var(--card-padding) var(--card-padding)' }}>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-space-2 text-primary text-small-text font-semibold hover:underline underline-offset-4"
                    >
                      Inquire <ArrowRight className="w-4 h-4" />
                    </Link>
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
          <FadeIn>
            <div
              className="bg-surface border border-white/[0.06] rounded-[var(--radius-md)] py-space-8 px-space-4 lg:px-space-8 grid grid-cols-2 lg:grid-cols-4 gap-y-6 lg:gap-y-0"
            >
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
        {/* Glow */}
        <GlowPulse color="rgba(198,161,69,0.07)" size="500px" />

        <div className="relative z-10 site-container text-center max-w-2xl mx-auto">
          <FadeIn delay={0}>
            <h2 className="font-display text-4xl md:text-5xl font-light text-text-primary leading-[1.2] tracking-tight mb-space-4">
              Let's Design Your Experience
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-space-6 text-text-secondary text-body font-light leading-[1.6] mb-space-8">
              Every event is unique. Contact us for a tailored proposal.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link
              to="/contact"
              className="btn-base btn-primary shadow-lg hover:shadow-primary/10 inline-flex items-center gap-space-2"
            >
              Contact Concierge <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </AnimateWrap>
  );
}
