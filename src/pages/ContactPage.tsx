import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  AnimatedCard,
  AnimateWrap,
  AnimatePresence,
  motion,
} from '../components/AnimatedSection';
import { Phone, Mail, MapPin, Clock, MessageCircle, User, Calendar, Package, MessageSquare, CheckCircle2, ArrowRight, ArrowLeft, Shield, ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'How many people can one hookah serve?', a: 'Each hookah comfortably serves 5–10 guests. For larger events, we recommend multiple hookahs. Our Signature package with 2 hookahs is ideal for groups up to 25.' },
  { q: 'Do you provide professional attendants?', a: 'Yes. Our Signature and Prestige packages include dedicated attendants who manage setup, coal management, flavor changes, and breakdown. All are professionally trained.' },
  { q: 'Can you serve outdoor venues?', a: 'Absolutely. We specialize in beach parties, poolside gatherings, rooftop events, and garden celebrations. Our equipment works indoors and outdoors.' },
  { q: 'Do you travel outside Miami?', a: 'We serve Miami-Dade, Broward, and Palm Beach counties. With our Orlando expansion, we also cover Central Florida.' },
  { q: 'How long does setup take?', a: 'Full setup takes 15–30 minutes. We arrive at least 30 minutes before your event start time.' },
  { q: 'What flavors are available?', a: 'We carry Al Fakher, Adalya, Eternal Smoke, Starbuzz, and Afzal — with unlimited flavors included in every package. View the full menu on our Menu page.' },
  { q: 'How far in advance should I book?', a: 'We recommend 1–2 weeks for standard events and 3–4 weeks for peak season. Last-minute bookings available when possible.' },
  { q: 'What about cleanup?', a: 'We handle everything — delivery, setup, service during the event, and complete breakdown. You don\'t need to lift a finger.' },
  { q: 'Can you customize packages?', a: 'Yes. We regularly create bespoke packages for large-scale events and multi-day celebrations. Contact us for a tailored proposal.' },
  { q: 'Are hookahs sanitized?', a: 'Every hookah undergoes thorough cleaning and sanitization before each event using medical-grade protocols.' },
];

const steps = [
  { label: 'Personal', icon: User },
  { label: 'Event', icon: Calendar },
  { label: 'Package', icon: Package },
  { label: 'Details', icon: MessageSquare },
  { label: 'Confirm', icon: CheckCircle2 },
];

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    filter: 'blur(4px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    filter: 'blur(4px)',
  }),
};

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    eventDate: '', eventTime: '', eventType: '', guestCount: '', location: '',
    selectedPackage: '', addons: [] as string[], specialRequests: '',
  });

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  const toggle = (a: string) => setForm(p => ({ ...p, addons: p.addons.includes(a) ? p.addons.filter(x => x !== a) : [...p.addons, a] }));
  const goNext = () => { setDirection(1); setStep(s => Math.min(5, s + 1)); };
  const goPrev = () => { setDirection(-1); setStep(s => Math.max(1, s - 1)); };
  const submit = (e: React.FormEvent) => { e.preventDefault(); setDirection(1); setStep(5); };

  const inp = 'w-full bg-surface border border-border rounded-[var(--radius-sm)] px-space-5 py-space-4 text-small-text text-text-primary placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors duration-150';

  return (
    <AnimateWrap>
      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section className="bg-surface" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
        <div className="site-container text-center">
          <FadeIn delay={0}>
            <span className="text-primary text-small-text font-semibold tracking-[0.2em] uppercase mb-space-4 block">Contact</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-0 font-display text-hero-heading font-light text-text-primary leading-[1.2] tracking-tight">
              Begin Your Experience
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-space-6 text-text-secondary text-body font-light max-w-xl mx-auto leading-[1.5]">
              Complete the form or reach out directly. We respond within 15 minutes.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════
          RESERVATION FORM
      ══════════════════════════════════ */}
      <section className="bg-alt border-t border-white/[0.06]" style={{ paddingTop: 'var(--sp-8)', paddingBottom: 'var(--sp-8)' }}>
        <div className="site-container max-w-3xl mx-auto">
          <SectionHeading eyebrow="Reservation" title="Reserve Your Experience" />

          <FadeIn delay={0.15}>
            <div className="mt-space-9 bg-surface-raised border border-border/80 rounded-[var(--radius-lg)] overflow-hidden">
              {/* Steps progress */}
              <div className="p-space-7 border-b border-border/50 bg-surface/50">
                <div className="flex items-center justify-between max-w-md mx-auto">
                  {steps.map((s, i) => {
                    const isActive = step >= i + 1;
                    const isComplete = step > i + 1;
                    return (
                      <div key={s.label} className="flex items-center">
                        <div className="flex flex-col items-center gap-space-2">
                          <motion.div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                              isActive ? 'bg-primary text-primary-text' : 'bg-surface border border-border text-text-muted'
                            }`}
                            animate={{
                              scale: step === i + 1 ? 1.1 : 1,
                              backgroundColor: isActive ? 'var(--gold)' : 'var(--surface)',
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          >
                            {isComplete ? <CheckCircle2 className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                          </motion.div>
                          <span className={`text-[11px] font-medium hidden sm:block transition-colors duration-300 ${
                            isActive ? 'text-primary' : 'text-text-muted'
                          }`}>
                            {s.label}
                          </span>
                        </div>
                        {i < 4 && (
                          <div className="w-8 sm:w-12 h-px mx-space-2 overflow-hidden">
                            <motion.div
                              className="h-full"
                              animate={{
                                backgroundColor: step > i + 1 ? 'var(--gold)' : 'var(--border)',
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Form content with AnimatePresence */}
              <div className="p-space-7 md:p-space-9" style={{ minHeight: '340px' }}>
                <form onSubmit={submit}>
                  <AnimatePresence mode="wait" custom={direction}>
                    {/* Step 1: Personal */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                        className="space-y-space-5"
                      >
                        <h3 className="font-display text-card-title font-light text-text-primary">Personal Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-5">
                          <div>
                            <label className="block text-xs font-medium text-text-tertiary mb-space-2">First Name *</label>
                            <input type="text" className={inp} placeholder="John" value={form.firstName} onChange={e => set('firstName', e.target.value)} required />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-text-tertiary mb-space-2">Last Name *</label>
                            <input type="text" className={inp} placeholder="Doe" value={form.lastName} onChange={e => set('lastName', e.target.value)} required />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-text-tertiary mb-space-2">Email *</label>
                          <input type="email" className={inp} placeholder="john@example.com" value={form.email} onChange={e => set('email', e.target.value)} required />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-text-tertiary mb-space-2">Phone *</label>
                          <input type="tel" className={inp} placeholder="407-960-1018" value={form.phone} onChange={e => set('phone', e.target.value)} required />
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Event */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                        className="space-y-space-5"
                      >
                        <h3 className="font-display text-card-title font-light text-text-primary">Event Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-5">
                          <div>
                            <label className="block text-xs font-medium text-text-tertiary mb-space-2">Date *</label>
                            <input type="date" className={inp} value={form.eventDate} onChange={e => set('eventDate', e.target.value)} required />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-text-tertiary mb-space-2">Time *</label>
                            <input type="time" className={inp} value={form.eventTime} onChange={e => set('eventTime', e.target.value)} required />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-text-tertiary mb-space-2">Event Type *</label>
                          <select className={inp} value={form.eventType} onChange={e => set('eventType', e.target.value)} required>
                            <option value="">Select type</option>
                            <option value="wedding">Wedding</option>
                            <option value="corporate">Corporate</option>
                            <option value="birthday">Birthday</option>
                            <option value="yacht">Yacht</option>
                            <option value="private">Private Party</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-5">
                          <div>
                            <label className="block text-xs font-medium text-text-tertiary mb-space-2">Guests *</label>
                            <input type="number" className={inp} placeholder="50" value={form.guestCount} onChange={e => set('guestCount', e.target.value)} required />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-text-tertiary mb-space-2">Location *</label>
                            <input type="text" className={inp} placeholder="Miami Beach, FL" value={form.location} onChange={e => set('location', e.target.value)} required />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Package */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                        className="space-y-space-5"
                      >
                        <h3 className="font-display text-card-title font-light text-text-primary">Select Package</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-5">
                          {[
                            { id: 'essential', name: 'Essential', price: '$250', sub: '1 Hookah' },
                            { id: 'signature', name: 'Signature', price: '$450', sub: '2 Hookahs', pop: true },
                            { id: 'prestige', name: 'Prestige', price: '$750', sub: '4 Hookahs' },
                          ].map(p => (
                            <motion.button
                              key={p.id}
                              type="button"
                              onClick={() => set('selectedPackage', p.id)}
                              className={`p-space-6 rounded-[var(--radius-md)] text-left transition-all duration-150 flex flex-col justify-between ${
                                form.selectedPackage === p.id
                                  ? 'border-2 border-primary bg-primary-muted'
                                  : 'border border-border hover:border-text-tertiary bg-surface'
                              }`}
                              whileHover={{ scale: 1.03, y: -4 }}
                              whileTap={{ scale: 0.97 }}
                              animate={{
                                borderColor: form.selectedPackage === p.id ? 'var(--gold)' : 'var(--border)',
                                backgroundColor: form.selectedPackage === p.id ? 'var(--gold-muted)' : 'var(--surface)',
                              }}
                              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                              <p className="text-small-text font-semibold text-text-primary">{p.name}</p>
                              <p className="font-display text-card-title font-light text-text-primary mt-space-3">{p.price}</p>
                              <p className="text-xs text-text-muted mt-space-2">{p.sub}</p>
                            </motion.button>
                          ))}
                        </div>
                        <div className="pt-space-4">
                          <p className="text-small-text font-medium text-text-secondary mb-space-4">Add-ons</p>
                          <div className="flex flex-wrap gap-space-3">
                            {['Belly Dancer', 'Live DJ', 'Extra Hookah', 'Extended Hours', 'LED Lighting', 'Smoke Effects'].map(a => (
                              <motion.button
                                key={a}
                                type="button"
                                onClick={() => toggle(a)}
                                className={`px-space-4 py-space-2 rounded-[var(--radius-sm)] text-xs font-medium transition-colors duration-150 ${
                                  form.addons.includes(a) ? 'bg-primary text-primary-text' : 'border border-border text-text-tertiary hover:border-text-tertiary'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                layout
                              >
                                {form.addons.includes(a) && '✓ '}{a}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Details */}
                    {step === 4 && (
                      <motion.div
                        key="step4"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                        className="space-y-space-5"
                      >
                        <h3 className="font-display text-card-title font-light text-text-primary">Special Requests</h3>
                        <textarea className={`${inp} min-h-[140px] resize-none`} placeholder="Preferred flavors, setup preferences, or anything else..." value={form.specialRequests} onChange={e => set('specialRequests', e.target.value)} />
                      </motion.div>
                    )}

                    {/* Step 5: Confirmation */}
                    {step === 5 && (
                      <motion.div
                        key="step5"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        className="text-center py-space-10"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ duration: 0.6, ease: 'easeInOut' }}
                        >
                          <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-space-6" />
                        </motion.div>
                        <h3 className="font-display text-card-title font-light text-text-primary mb-space-3">Reservation Submitted</h3>
                        <p className="text-small-text text-text-secondary mb-space-7 max-w-sm mx-auto leading-[1.5]">
                          Thank you. Our concierge will contact you within 15 minutes.
                        </p>
                        <motion.a
                          href="tel:+13055550199"
                          className="btn-base btn-primary inline-flex items-center gap-space-2"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          Call Now
                        </motion.a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation buttons */}
                  {step < 5 && (
                    <div className="flex items-center justify-between mt-space-10 pt-space-7 border-t border-border/50">
                      {step > 1 ? (
                        <motion.button
                          type="button"
                          onClick={goPrev}
                          className="flex items-center gap-space-2 text-small-text text-text-tertiary hover:text-text-primary transition-colors"
                          whileHover={{ x: -4 }}
                        >
                          <ArrowLeft className="w-4 h-4" /> Back
                        </motion.button>
                      ) : <div />}
                      {step < 4 ? (
                        <motion.button
                          type="button"
                          onClick={goNext}
                          className="btn-base btn-primary flex items-center gap-space-2"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Continue <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      ) : (
                        <motion.button
                          type="submit"
                          className="btn-base btn-primary flex items-center gap-space-2"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Submit <CheckCircle2 className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                  )}
                </form>
                {step < 5 && (
                  <p className="flex items-center justify-center gap-space-2 mt-space-6 text-xs text-text-muted">
                    <Shield className="w-3.5 h-3.5" /> Secure. We respond within 15 minutes.
                  </p>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════
          FAQ SECTION
      ══════════════════════════════════ */}
      <section className="bg-bg border-t border-white/[0.06]" style={{ paddingTop: 'var(--sp-8)', paddingBottom: 'var(--sp-8)' }}>
        <div className="site-container max-w-2xl mx-auto">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Everything you need to know before your booking."
          />

          <div className="space-y-space-4">
            {faqs.map((faq, i) => {
              const isOpen = faqOpen === i;
              return (
                <motion.div
                  key={i}
                  className="bg-surface-raised border border-border/80 rounded-[var(--radius-lg)] overflow-hidden"
                  animate={{
                    borderColor: isOpen ? 'rgba(198,161,69,0.25)' : 'rgba(255,255,255,0.06)',
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <button
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="w-full flex items-center justify-between px-space-7 py-space-5 text-left group hover:bg-white/[0.01] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-small-text font-medium text-text-primary group-hover:text-primary transition-colors duration-150 pr-space-6">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    >
                      <ChevronDown className="w-4 h-4 text-text-tertiary flex-shrink-0" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-space-7 pb-space-5 pt-0 border-t border-border/50">
                          <motion.p
                            initial={{ y: -8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -8, opacity: 0 }}
                            transition={{ delay: 0.05 }}
                            className="pt-space-5 text-small-text text-text-secondary leading-[1.5] font-light"
                          >
                            {faq.a}
                          </motion.p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CONTACT INFO
      ══════════════════════════════════ */}
      <section className="bg-alt border-t border-white/[0.06]" style={{ paddingTop: 'var(--sp-8)', paddingBottom: 'var(--sp-8)' }}>
        <div className="site-container">
          <SectionHeading eyebrow="Direct Contact" title="Get In Touch" />

          <StaggerContainer staggerDelay={0.1} className="mt-space-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-6 lg:gap-space-7">
            <StaggerItem>
              <a href="tel:+13055550199" className="site-card hover:border-primary/20 transition-all duration-300 block">
                <div><Phone className="w-5 h-5 text-primary" aria-hidden="true" /></div>
                <div className="flex flex-col gap-space-2">
                  <h4 className="text-small-text font-semibold text-text-primary">Call Us</h4>
                  <p className="text-small-text text-primary font-medium">(305) 555-0199</p>
                  <p className="text-xs text-text-muted">10AM – 2AM daily</p>
                </div>
              </a>
            </StaggerItem>
            <StaggerItem>
              <a href="mailto:concierge@hookahrental.com" className="site-card hover:border-primary/20 transition-all duration-300 block">
                <div><Mail className="w-5 h-5 text-primary" aria-hidden="true" /></div>
                <div className="flex flex-col gap-space-2">
                  <h4 className="text-small-text font-semibold text-text-primary">Email</h4>
                  <p className="text-small-text text-primary font-medium break-all">concierge@hookahrental.com</p>
                </div>
              </a>
            </StaggerItem>
            <StaggerItem>
              <a href="https://wa.me/1407-960-1018" target="_blank" rel="noopener noreferrer" className="site-card hover:border-success/20 transition-all duration-300 block">
                <div><MessageCircle className="w-5 h-5 text-success" aria-hidden="true" /></div>
                <div className="flex flex-col gap-space-2">
                  <h4 className="text-small-text font-semibold text-text-primary">WhatsApp</h4>
                  <p className="text-small-text text-success font-medium">Message Us</p>
                </div>
              </a>
            </StaggerItem>
            <StaggerItem>
              <div className="site-card hover:border-primary/20 transition-all duration-300">
                <div><Clock className="w-5 h-5 text-primary" aria-hidden="true" /></div>
                <div className="flex flex-col gap-space-2">
                  <h4 className="text-small-text font-semibold text-text-primary">Hours</h4>
                  <p className="text-small-text text-text-secondary">Mon – Sun</p>
                  <p className="text-small-text text-primary font-medium">10AM – 2AM</p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Service Areas */}
          <FadeIn delay={0.3}>
            <div className="mt-space-9 bg-surface-raised border border-border/80 rounded-[var(--radius-lg)] p-space-7 md:p-space-9">
              <div className="flex items-center gap-space-3 mb-space-6">
                <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider">Service Areas</h4>
              </div>
              <StaggerContainer staggerDelay={0.05} className="flex flex-wrap gap-space-3">
                {['Miami Beach', 'Brickell', 'Wynwood', 'Coral Gables', 'Fort Lauderdale', 'Key Biscayne', 'Doral', 'Orlando', 'Kissimmee', 'Lake Nona'].map(a => (
                  <StaggerItem key={a} distance={6}>
                    <motion.span
                      className="bg-surface border border-border rounded-[var(--radius-sm)] px-space-5 py-space-3 text-small-text font-light text-text-secondary inline-block"
                      whileHover={{ borderColor: 'rgba(198,161,69,0.3)', color: 'var(--text-1)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    >
                      {a}
                    </motion.span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </FadeIn>
        </div>
      </section>
    </AnimateWrap>
  );
}
