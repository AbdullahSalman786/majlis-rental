import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useScrollReveal';
import { ChevronDown, ArrowRight } from 'lucide-react';

const faqs = [
  { q: 'How many people can one hookah serve?', a: 'Each hookah comfortably serves 5–10 guests. For larger events, we recommend multiple hookahs. Our Signature package with 2 hookahs is ideal for groups up to 25.' },
  { q: 'Do you provide professional attendants?', a: 'Yes. Our Signature and Prestige packages include dedicated attendants who manage setup, coal management, flavor changes, and breakdown. All are professionally trained.' },
  { q: 'Can you serve outdoor venues?', a: 'Absolutely. We specialize in beach parties, poolside gatherings, rooftop events, and garden celebrations. Our equipment works indoors and outdoors.' },
  { q: 'Do you travel outside Miami?', a: 'We serve Miami-Dade, Broward, and Palm Beach counties. With our Orlando expansion, we also cover Central Florida.' },
  { q: 'How long does setup take?', a: 'Full setup takes 15–30 minutes. We arrive at least 30 minutes before your event start time.' },
  { q: 'What flavors are available?', a: 'We offer Starbuzz and Al Fakher collections including Blue Mist, Code 69, Double Apple, and more. All unlimited with every package.' },
  { q: 'How far in advance should I book?', a: 'We recommend 1–2 weeks for standard events and 3–4 weeks for peak season. Last-minute bookings available when possible.' },
  { q: 'What about cleanup?', a: 'We handle everything — delivery, setup, service during the event, and complete breakdown. You don\'t need to lift a finger.' },
  { q: 'Can you customize packages?', a: 'Yes. We regularly create bespoke packages for large-scale events and multi-day celebrations. Contact us for a tailored proposal.' },
  { q: 'Are hookahs sanitized?', a: 'Every hookah undergoes thorough cleaning and sanitization before each event using medical-grade protocols.' },
];

export default function FAQsPage() {
  const { ref, visible } = useReveal();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <section className="py-space-11 bg-surface">
        <div className="site-container text-center">
          <span className="text-primary text-small-text font-semibold tracking-[0.2em] uppercase mb-space-4 block">FAQs</span>
          <h1 className="mt-0 font-display text-hero-heading font-light text-text-primary leading-[1.2] tracking-tight">Frequently Asked Questions</h1>
          <p className="mt-space-6 text-text-secondary text-body font-light max-w-xl mx-auto leading-[1.5]">Everything you need to know about our services.</p>
        </div>
      </section>

      <section className="py-space-12 bg-alt border-t border-white/[0.06]">
        <div className="site-container max-w-2xl mx-auto">
          <div ref={ref} className={`space-y-space-4 transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {faqs.map((faq, i) => (
              <div key={i} className="bg-surface-raised border border-border/80 rounded-[var(--radius-lg)] overflow-hidden transition-all duration-300">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-space-7 py-space-5 text-left group hover:bg-white/[0.01] transition-colors"
                  aria-expanded={open === i}
                >
                  <span className="text-small-text font-medium text-text-primary group-hover:text-primary transition-colors duration-150 pr-space-6">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-text-tertiary flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-200 ease-out ${open === i ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-space-7 pb-space-5 pt-0 border-t border-border/50">
                    <p className="pt-space-5 text-small-text text-text-secondary leading-[1.5] font-light">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-space-10 text-center">
            <p className="text-small-text text-text-tertiary mb-space-4">Still have questions?</p>
            <Link to="/contact" className="btn-base btn-primary">
              Contact Us <ArrowRight className="w-4 h-4 ml-space-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
