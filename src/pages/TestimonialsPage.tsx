import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useScrollReveal';
import { Star, ArrowRight } from 'lucide-react';

const reviews = [
  { name: 'Isabella Martinez', role: 'Wedding · Miami', text: 'Every detail was handled with the care you\'d expect from a five-star hotel. Our guests couldn\'t stop talking about it.', initials: 'IM' },
  { name: 'Marcus Johnson', role: 'Corporate Event Planner', text: 'They transformed our corporate gala into something truly memorable. Professional, elegant, and perfectly executed.', initials: 'MJ' },
  { name: 'Sofia Rodriguez', role: 'Birthday · Miami Beach', text: 'From setup to service, everything was flawless. The VIP package was worth every penny.', initials: 'SR' },
  { name: 'David Chen', role: 'Yacht Charter', text: 'Having premium hookah service on our charter was the perfect touch. They truly understand maritime luxury.', initials: 'DC' },
  { name: 'Natasha Williams', role: 'Hotel Coordinator', text: 'We partner with Hookah Rental for resort events. The consistency they bring matches our five-star property.', initials: 'NW' },
  { name: 'Roberto Fernandez', role: 'Private Party Host', text: 'Premium equipment, unlimited flavors, most professional staff. They turned our party into a VIP lounge.', initials: 'RF' },
  { name: 'Alexandra Kim', role: 'Wedding Planner', text: 'As a luxury planner, I need vendors I can trust completely. Hookah Rental never disappoints.', initials: 'AK' },
  { name: 'James Patterson', role: 'Corporate · Brickell', text: 'The setup was stunning and service seamless. Multiple attendees asked for their contact.', initials: 'JP' },
  { name: 'Camila Vasquez', role: 'Anniversary Celebration', text: 'Our anniversary was elevated beyond what we imagined. Exceptional from start to finish.', initials: 'CV' },
];

export default function TestimonialsPage() {
  const { ref, visible } = useReveal();

  return (
    <>
      <section className="py-space-11 bg-surface">
        <div className="site-container text-center">
          <span className="text-primary text-small-text font-semibold tracking-[0.2em] uppercase mb-space-4 block">Testimonials</span>
          <h1 className="mt-0 font-display text-hero-heading font-light text-text-primary leading-[1.2] tracking-tight">What Our Clients Say</h1>
          <p className="mt-space-6 text-text-secondary text-body font-light max-w-xl mx-auto leading-[1.5]">Hear from hosts, planners, and clients who trust us with their most important events.</p>
        </div>
      </section>

      <section className="py-space-12 bg-alt border-t border-white/[0.06]">
        <div className="site-container">
          <div ref={ref} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-6 lg:gap-space-7 transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
             {reviews.map(t => (
              <div key={t.name} className="site-card hover:border-primary/20 transition-all duration-300">
                <div>
                  <div className="flex gap-0.5 mb-space-5" aria-label="5 stars">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-[18px] h-[18px] text-primary fill-primary" />)}
                  </div>
                  <p className="text-body leading-[1.5] text-text-secondary font-light italic">"{t.text}"</p>
                </div>
                <div className="mt-auto pt-space-6 border-t border-border/50 flex items-center gap-space-4">
                  <div className="w-10 h-10 bg-primary-muted rounded-full flex items-center justify-center flex-shrink-0 border border-primary/30 ring-2 ring-primary/5 shadow-sm">
                    <span className="text-primary text-xs font-semibold tracking-wider">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-small-text font-medium text-text-primary">{t.name}</p>
                    <p className="text-xs text-text-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-space-8 bg-bg border-t border-white/[0.06]">
        <div className="site-container">
          <div className="bg-surface border border-white/[0.06] rounded-[var(--radius-md)] py-space-8 px-space-4 lg:px-space-8 grid grid-cols-2 lg:grid-cols-4 gap-y-6 lg:gap-y-0">
            {[{ v: '500+', l: 'Events' }, { v: '5.0', l: 'Rating' }, { v: '100%', l: 'Satisfaction' }, { v: '85%', l: 'Repeat Clients' }].map((s, idx) => (
              <div key={s.l} className={`text-center py-2 lg:py-0 ${idx % 2 === 0 ? 'border-r border-white/[0.04] lg:border-r-0' : ''} lg:border-r lg:border-white/[0.08] lg:last:border-r-0`}>
                <p className="font-display text-3xl lg:text-4xl font-light text-primary leading-[1.2]">{s.v}</p>
                <p className="mt-space-2 text-xs text-text-secondary tracking-widest uppercase font-light">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 lg:py-24 overflow-hidden border-t border-white/[0.06] bg-gradient-to-tr from-[#0a0a0a] via-[#111111] to-[#221b0d]">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10 site-container text-center max-w-2xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-light text-text-primary tracking-tight mb-space-4">Join Our Clientele</h2>
          <p className="mt-space-6 text-text-secondary text-body font-light leading-[1.6] mb-space-8">Experience the standard that has earned us a perfect rating.</p>
          <Link to="/contact" className="btn-base btn-primary shadow-lg hover:shadow-primary/10 inline-flex items-center gap-space-2">
            Reserve Your Experience <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
