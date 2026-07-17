import { useState } from 'react';
import {
  FadeIn,
  AnimateWrap,
  AnimatePresence,
  motion,
} from '../components/AnimatedSection';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  { src: 'https://images.pexels.com/photos/17315409/pexels-photo-17315409.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', cat: 'Wedding', alt: 'Luxury wedding reception' },
  { src: 'https://images.pexels.com/photos/20122617/pexels-photo-20122617.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', cat: 'Hookah', alt: 'Premium gold hookah' },
  { src: 'https://images.pexels.com/photos/16935900/pexels-photo-16935900.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', cat: 'Corporate', alt: 'Luxury lounge' },
  { src: 'https://images.pexels.com/photos/29318858/pexels-photo-29318858.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', cat: 'Yacht', alt: 'Yacht sunset' },
  { src: 'https://images.pexels.com/photos/17315439/pexels-photo-17315439.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', cat: 'Wedding', alt: 'Elegant decor' },
  { src: 'https://images.pexels.com/photos/14443340/pexels-photo-14443340.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', cat: 'Hookah', alt: 'Hookah closeup' },
  { src: 'https://images.pexels.com/photos/16935974/pexels-photo-16935974.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', cat: 'VIP', alt: 'VIP lounge' },
  { src: 'https://images.pexels.com/photos/19986452/pexels-photo-19986452.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', cat: 'Event', alt: 'Restaurant event' },
  { src: 'https://images.pexels.com/photos/17315476/pexels-photo-17315476.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', cat: 'Wedding', alt: 'Decorated venue' },
  { src: 'https://images.pexels.com/photos/16935993/pexels-photo-16935993.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', cat: 'VIP', alt: 'Premium lounge' },
  { src: 'https://images.pexels.com/photos/29318864/pexels-photo-29318864.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', cat: 'Yacht', alt: 'Yachts sunset' },
  { src: 'https://images.pexels.com/photos/14036272/pexels-photo-14036272.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', cat: 'Hotel', alt: 'Hotel lobby' },
];

const cats = ['All', 'Wedding', 'Corporate', 'VIP', 'Yacht', 'Hookah', 'Event', 'Hotel'];

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [lb, setLb] = useState<number | null>(null);
  const filtered = filter === 'All' ? images : images.filter(i => i.cat === filter);

  return (
    <AnimateWrap>
      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section className="bg-surface" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
        <div className="site-container text-center">
          <FadeIn delay={0}>
            <span className="text-primary text-small-text font-semibold tracking-[0.15em] uppercase mb-space-4 block">Gallery</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-0 font-display text-hero-heading font-light text-text-primary leading-[1.2] tracking-tight">
              Moments of Luxury
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-space-6 text-text-secondary text-body font-light max-w-xl mx-auto leading-[1.5]">
              A curated showcase of our premium event setups and experiences.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════
          GALLERY
      ══════════════════════════════════ */}
      <section className="bg-alt border-t border-white/[0.06]" style={{ paddingTop: 'var(--sp-8)', paddingBottom: 'var(--sp-8)' }}>
        <div className="site-container">
          {/* Filter tabs */}
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-space-2 mb-space-9" role="tablist">
              {cats.map(c => (
                <motion.button
                  key={c}
                  onClick={() => setFilter(c)}
                  role="tab"
                  aria-selected={filter === c}
                  className={`relative px-space-4 py-space-2 text-small-text font-medium rounded-[var(--radius-sm)] transition-colors duration-150 ${
                    filter === c
                      ? 'bg-primary text-primary-text'
                      : 'bg-surface-raised border border-border text-text-tertiary hover:text-text-primary hover:border-text-tertiary'
                  }`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  layout
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  {c}
                </motion.button>
              ))}
            </div>
          </FadeIn>

          {/* Image grid with layout animation */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-6 lg:gap-space-7"
            layout
            transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.8 }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((img) => (
                <motion.button
                  key={`${img.src}-${filter}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                  className="group overflow-hidden rounded-[var(--radius-md)] relative block w-full aspect-square text-left cursor-pointer"
                  onClick={() => setLb(images.indexOf(img))}
                  aria-label={`View ${img.alt}`}
                  whileHover={{ y: -4 }}
                >
                  <motion.img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
                  />
                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-end p-space-5 rounded-[var(--radius-md)]"
                    initial={{ backgroundColor: 'rgba(8,8,8,0.0)' }}
                    whileHover={{ backgroundColor: 'rgba(8,8,8,0.55)' }}
                    transition={{ duration: 0.25 }}
                  >
                    <motion.div
                      initial={{ y: 16, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-primary text-small-text font-semibold uppercase tracking-wide block">
                        {img.cat}
                      </span>
                      <span className="text-text-primary text-small-text mt-space-1 block">
                        {img.alt}
                      </span>
                    </motion.div>
                  </motion.div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          LIGHTBOX
      ══════════════════════════════════ */}
      <AnimatePresence>
        {lb !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-space-4"
            style={{ background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLb(null)}
            role="dialog"
            aria-label="Image viewer"
          >
            {/* Close */}
            <motion.button
              onClick={() => setLb(null)}
              className="absolute top-space-4 right-space-4 p-space-3 rounded-[var(--radius-sm)] hover:bg-surface-raised transition-colors"
              aria-label="Close"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <X className="w-5 h-5 text-text-secondary" />
            </motion.button>

            {/* Prev */}
            <motion.button
              onClick={e => { e.stopPropagation(); setLb((lb - 1 + images.length) % images.length); }}
              className="absolute left-space-4 p-space-3 rounded-[var(--radius-sm)] hover:bg-surface-raised transition-colors"
              aria-label="Previous"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ChevronLeft className="w-5 h-5 text-text-secondary" />
            </motion.button>

            {/* Next */}
            <motion.button
              onClick={e => { e.stopPropagation(); setLb((lb + 1) % images.length); }}
              className="absolute right-space-4 p-space-3 rounded-[var(--radius-sm)] hover:bg-surface-raised transition-colors"
              aria-label="Next"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ChevronRight className="w-5 h-5 text-text-secondary" />
            </motion.button>

            {/* Image */}
            <motion.img
              key={lb}
              src={images[lb].src}
              alt={images[lb].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-[var(--radius-md)]"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            />

            {/* Caption */}
            <motion.div
              className="absolute bottom-space-6 left-1/2 -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <p className="text-text-primary text-small-text font-medium">{images[lb].alt}</p>
              <p className="text-text-muted text-xs mt-space-1">{images[lb].cat}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimateWrap>
  );
}
