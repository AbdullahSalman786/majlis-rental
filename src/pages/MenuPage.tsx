import { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  ScaleIn,
  Counter,
  GlowPulse,
  AnimateWrap,
  AnimatePresence,
  motion,
} from "../components/AnimatedSection";
import { ArrowRight, Flame } from "lucide-react";

// images
import alFakherCoverPage from "@/assets/images/menu/al-fakher-cover-page-1.webp";
import aromatic from "@/assets/images/menu/aromatic.webp";
import creamy from "@/assets/images/menu/creamy.webp";
import fruity from "@/assets/images/menu/fruity.webp";
import minty from "@/assets/images/menu/minty-1.webp";
import tropical from "@/assets/images/menu/tropical.webp";
import adalyaCoverpage from "@/assets/images/menu/adalya-cover-page.webp";
import adalya from "@/assets/images/menu/adalya.webp";
import afzalCoverPage from "@/assets/images/menu/afzal-cover-page.webp";
import afzalPaanMix from "@/assets/images/menu/afzal-paan-mix.webp";
import afzalSignatureFlavors from "@/assets/images/menu/afzal-signature-flavors.webp";
import eternalSmokeCoverPage from "@/assets/images/menu/eternal-smoke-cover-page.webp";
import eternalSmoke from "@/assets/images/menu/eternal-smoke.webp";
import starbuzzCoverPage from "@/assets/images/menu/starbuzz-cover-page.webp";
import starbuzz from "@/assets/images/menu/starbuzz.webp";

// ─── Brand data ────────────────────────────────────────────────────────────────
const brands = [
  {
    id: "al-fakher",
    name: "Al Fakher",
    hookahPrice: null,
    refillPrice: null,
    note: "Available $50",
    img: alFakherCoverPage,
    categories: [
      {
        name: "Minty",
        img: minty,
        flavors: [
          "Citrus Mint",
          "Grape Mint",
          "Gum Mint",
          "Lemon Mint",
          "Orange Mint",
          "Peach Mint",
          "Two Apples Mint",
          "Watermelon Mint",
        ],
      },
      {
        name: "Creamy",
        img: creamy,
        flavors: ["Mint Cream", "Orange Cream", "Strawberry Cream"],
      },
      {
        name: "Aromatic",
        img: aromatic,
        flavors: ["Bubble Gum", "Rose", "Vanilla"],
      },
      {
        name: "Fruity",
        img: fruity,
        flavors: [
          "Berry",
          "Blueberry",
          "Grapefruit",
          "Grenadine",
          "Lemon",
          "Orange",
          "Peach",
          "Strawberry",
        ],
      },
      {
        name: "Tropical",
        img: tropical,
        flavors: [
          "Coconut",
          "Guava",
          "Kiwi",
          "Mango",
          "Pineapple",
          "Watermelon",
        ],
      },
    ],
  },
  {
    id: "adalya",
    name: "Adalya",
    hookahPrice: "$21",
    refillPrice: "$10",
    note: null,
    img: adalyaCoverpage,
    categories: [
      {
        name: "Signature Blends",
        img: adalya,
        flavors: [
          "Angel Lips",
          "Baku Nights",
          "Berlin Nights",
          "Havana",
          "Hawaii",
          "Lady Killer",
          "Love 66",
          "Strawberry Splash",
        ],
      },
    ],
  },
  {
    id: "eternal-smoke",
    name: "Eternal Smoke",
    hookahPrice: "$20",
    refillPrice: "$10",
    note: null,
    img: eternalSmokeCoverPage,
    categories: [
      {
        name: "Lit Series",
        img: eternalSmoke,
        flavors: [
          "Blueberry Lit",
          "Lemon Lit",
          "Lime Lit",
          "Peach Lit",
          "Watermelon Lit",
        ],
      },
    ],
  },
  {
    id: "starbuzz",
    name: "Starbuzz",
    hookahPrice: "$21",
    refillPrice: "$10",
    note: null,
    img: starbuzzCoverPage,
    categories: [
      {
        name: "Premium Collection",
        img: starbuzz,
        flavors: ["Bluemist", "Code 69", "Green Savior", "Sex on the Beach"],
      },
    ],
  },
  {
    id: "afzal",
    name: "Afzal",
    hookahPrice: "$20",
    refillPrice: "$10",
    note: null,
    img: afzalCoverPage,
    categories: [
      {
        name: "Signature Flavors",
        img: afzalSignatureFlavors,
        flavors: ["Chief Commissioner", "Lychee", "Paan Raas"],
      },
      {
        name: "Paan Mix",
        img: afzalPaanMix,
        flavors: [
          "Paan Orange Mint",
          "Paan Blueberry",
          "Paan Double Apple",
          "Paan Vanilla Mint",
          "Paan Kiwi",
          "Lychee Paan",
        ],
      },
    ],
  },
];

// ─── Bowl options ───────────────────────────────────────────────────────────────
const bowlOptions = [
  { label: "Regular Base", note: "Based on Hookah Flavors", price: null },
  { label: "Orange Bowl", note: "Citrus-cured clay bowl", price: "+$8" },
  { label: "HMD Device", note: "Hookah Heat Management Device", price: null },
  { label: "Pineapple Bowl", note: "Natural pineapple base", price: "+$10" },
  { label: "Ice Base", note: "Chilled water chamber", price: null },
  { label: "Ice Hose", note: "Frozen hose tip", price: null },
];

// ─── Component ──────────────────────────────────────────────────────────────────
export default function MenuPage() {
  const [activeBrand, setActiveBrand] = useState(brands[0].id);
  const selected = brands.find((b) => b.id === activeBrand) ?? brands[0];

  return (
    <AnimateWrap>
      {/* ── Hero ── */}
      <section
        className="bg-surface relative overflow-hidden"
        style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="site-container text-center relative z-10">
          <FadeIn delay={0}>
            <span className="text-primary text-small-text font-semibold tracking-[0.2em] uppercase mb-space-4 block">
              Hookah Menu
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-0 font-display text-hero-heading font-light text-text-primary leading-[1.2] tracking-tight">
              Explore Our Flavors
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-space-6 text-text-secondary text-body font-light max-w-2xl mx-auto leading-[1.5]">
              Premium hookah brands with unlimited flavors. Customize your bowl,
              base, and hose for a truly personal experience.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Bowl Options ── */}
      <section
        className="bg-alt border-t border-white/[0.06]"
        style={{ paddingTop: "var(--sp-8)", paddingBottom: "var(--sp-8)" }}
      >
        <div className="site-container">
          <SectionHeading
            eyebrow="Choose Your Setup"
            title="Customize Your Bowl"
            description="Every hookah experience starts with your bowl and base selection. Mix and match for the perfect session."
          />
          <StaggerContainer
            staggerDelay={0.08}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-6"
          >
            {bowlOptions.map((opt) => (
              <StaggerItem key={opt.label}>
                <motion.div
                  className="site-card flex items-start gap-space-4"
                  whileHover={{
                    scale: 1.01,
                    borderColor: "rgba(198,161,69,0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-full bg-primary-muted flex items-center justify-center flex-shrink-0 mt-0.5"
                    whileHover={{ rotate: 15 }}
                  >
                    <Flame className="w-4 h-4 text-primary" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-space-3">
                      <p className="text-small-text font-semibold text-text-primary">
                        {opt.label}
                      </p>
                      {opt.price && (
                        <span className="text-primary font-bold text-small-text flex-shrink-0">
                          {opt.price}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-muted mt-space-1 font-light">
                      {opt.note}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Ice Bundle Special */}
          <ScaleIn delay={0.4}>
            <div
              className="mt-space-6 bg-primary-muted border-2 border-primary/20 rounded-[var(--radius-lg)] p-space-6 text-center"
              style={{ animation: "borderGlow 3s ease-in-out infinite" }}
            >
              <p className="text-primary font-semibold text-small-text">
                🧊 Both at Discount Price
              </p>
              <p className="font-display text-section-heading font-light text-primary mt-space-2">
                <Counter value="5" prefix="$" />
              </p>
              <p className="text-xs text-text-muted mt-space-2">
                Ice Base & Hose — Majlis Special
              </p>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* ── Brand Tabs + Flavors ── */}
      <section
        className="bg-bg border-t border-white/[0.06]"
        style={{ paddingTop: "var(--sp-8)", paddingBottom: "var(--sp-8)" }}
      >
        <div className="site-container">
          <SectionHeading
            eyebrow="Flavors"
            title="Our Hookah Brands"
            description="We carry only the world's finest hookah tobacco brands. Explore each brand's exclusive flavor collection."
          />

          {/* Brand selector tabs */}
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-space-3 mb-space-10">
              {brands.map((b, i) => (
                <motion.button
                  key={b.id}
                  onClick={() => setActiveBrand(b.id)}
                  className={`px-space-5 py-space-3 rounded-full text-small-text font-semibold transition-colors duration-200 ${
                    activeBrand === b.id
                      ? "bg-primary text-primary-text shadow-md"
                      : "bg-surface-raised border border-border text-text-secondary hover:border-primary/40 hover:text-text-primary"
                  }`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {b.name}
                </motion.button>
              ))}
            </div>
          </FadeIn>

          {/* Active brand card with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {/* Brand header */}
              <div className="bg-surface-raised border border-border/80 rounded-[var(--radius-lg)] overflow-hidden mb-space-8">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="aspect-[16/9] lg:aspect-auto lg:h-64 overflow-hidden">
                    <motion.img
                      src={selected.img}
                      alt={selected.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      initial={{ scale: 1.08 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.22, 0.61, 0.36, 1],
                      }}
                    />
                  </div>
                  <div className="p-space-8 flex flex-col justify-center">
                    <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-space-3 block">
                      Premium Brand
                    </span>
                    <h2 className="font-display text-section-heading font-light text-text-primary leading-[1.2] mb-space-4">
                      {selected.name}
                    </h2>
                    {(selected.hookahPrice || selected.note) && (
                      <div className="flex flex-wrap gap-space-3 mt-space-2">
                        {selected.hookahPrice && (
                          <motion.div
                            className="bg-primary-muted border border-primary/20 rounded-[var(--radius-md)] px-space-5 py-space-3 text-center"
                            whileHover={{ scale: 1.05 }}
                          >
                            <p className="text-xs text-text-muted font-light">
                              Hookah
                            </p>
                            <p className="font-display text-card-title font-semibold text-primary">
                              {selected.hookahPrice}
                            </p>
                          </motion.div>
                        )}
                        {selected.refillPrice && (
                          <div className="bg-surface border border-border rounded-[var(--radius-md)] px-space-5 py-space-3 text-center">
                            <p className="text-xs text-text-muted font-light">
                              Refill
                            </p>
                            <p className="font-display text-card-title font-semibold text-text-primary">
                              {selected.refillPrice}
                            </p>
                          </div>
                        )}
                        {selected.note && (
                          <div className="bg-primary-muted border border-primary/20 rounded-[var(--radius-md)] px-space-5 py-space-3 text-center">
                            <p className="font-semibold text-primary text-small-text">
                              {selected.note}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Flavor categories */}
              <div className="space-y-space-8">
                {selected.categories.map((cat, ci) => (
                  <motion.div
                    key={cat.name}
                    className="bg-bg border border-border/60 rounded-[var(--radius-lg)] overflow-hidden"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: ci * 0.1,
                      type: "spring",
                      stiffness: 180,
                      damping: 22,
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr]">
                      <div className="aspect-[4/3] sm:aspect-auto overflow-hidden">
                        <motion.img
                          src={cat.img}
                          alt={cat.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div className="p-space-7">
                        <div className="flex items-center gap-space-3 mb-space-5">
                          <span className="w-px h-4 bg-primary block" />
                          <h3 className="text-small-text font-semibold text-text-primary uppercase tracking-wider">
                            {cat.name}
                          </h3>
                          <span className="text-xs text-text-muted font-light">
                            {cat.flavors.length} flavors
                          </span>
                        </div>
                        <StaggerContainer
                          staggerDelay={0.04}
                          className="flex flex-wrap gap-space-2"
                        >
                          {cat.flavors.map((flavor) => (
                            <StaggerItem key={flavor} distance={8}>
                              <motion.span
                                className="bg-surface border border-border rounded-full px-space-4 py-space-2 text-xs text-text-secondary font-light inline-block cursor-default"
                                whileHover={{
                                  borderColor: "rgba(198,161,69,0.35)",
                                  color: "var(--text-1)",
                                  scale: 1.06,
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 18,
                                }}
                              >
                                {flavor}
                              </motion.span>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <section
        className="bg-alt border-t border-white/[0.06]"
        style={{ paddingTop: "var(--sp-6)", paddingBottom: "var(--sp-6)" }}
      >
        <div className="site-container text-center max-w-2xl mx-auto">
          <FadeIn>
            <p className="text-xs text-text-muted font-light leading-[1.8]">
              Maximum of 2 people per hookah, or $10 additional per person. 18%
              Automatic Gratuity will be added to the Final Bill. All prices are
              subject to change. Menu availability may vary.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="relative overflow-hidden border-t border-white/[0.06]"
        style={{
          paddingTop: "var(--sp-8)",
          paddingBottom: "var(--sp-8)",
          background:
            "linear-gradient(to top right, #0a0a0a, #111111, #221b0d)",
        }}
      >
        <GlowPulse color="rgba(198,161,69,0.06)" size="450px" />
        <div className="relative z-10 site-container text-center">
          <FadeIn delay={0}>
            <h2 className="font-display text-4xl md:text-5xl font-light text-text-primary leading-[1.2] tracking-tight mb-space-4">
              Ready to Book?
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-text-secondary text-body font-light max-w-lg mx-auto leading-[1.6] mb-space-8">
              Reserve your premium hookah experience with unlimited flavors from
              our entire menu collection.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-space-5">
              <Link
                to="/contact"
                className="w-full sm:w-auto btn-base btn-primary shadow-lg hover:shadow-primary/10 inline-flex items-center justify-center gap-space-2"
              >
                Reserve Your Experience <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/packages"
                className="w-full sm:w-auto btn-base btn-secondary hover:bg-white/[0.02]"
              >
                View Packages
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </AnimateWrap>
  );
}
