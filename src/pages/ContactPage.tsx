import { useState } from "react";
import SectionHeading from "../components/SectionHeading";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  AnimateWrap,
  AnimatePresence,
  motion,
} from "../components/AnimatedSection";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  User,
  CalendarDays,
  Package,
  MessageSquare,
  ClipboardList,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Shield,
  ChevronDown,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "How many people can one hookah serve?",
    a: "Each hookah comfortably serves 5–10 guests. For larger events, we recommend multiple hookahs. Our Signature package with 2 hookahs is ideal for groups up to 25.",
  },
  {
    q: "Do you provide professional attendants?",
    a: "Yes. Our Signature and Prestige packages include dedicated attendants who manage setup, coal management, flavor changes, and breakdown. All are professionally trained.",
  },
  {
    q: "Can you serve outdoor venues?",
    a: "Absolutely. We specialize in beach parties, poolside gatherings, rooftop events, and garden celebrations. Our equipment works indoors and outdoors.",
  },
  {
    q: "Do you travel outside Miami?",
    a: "We serve Miami-Dade, Broward, and Palm Beach counties. With our Orlando expansion, we also cover Central Florida.",
  },
  {
    q: "How long does setup take?",
    a: "Full setup takes 15–30 minutes. We arrive at least 30 minutes before your event start time.",
  },
  {
    q: "What flavors are available?",
    a: "We carry Al Fakher, Adalya, Eternal Smoke, Starbuzz, and Afzal — with unlimited flavors included in every package. View the full menu on our Menu page.",
  },
  {
    q: "How far in advance should I book?",
    a: "We recommend 1–2 weeks for standard events and 3–4 weeks for peak season. Last-minute bookings available when possible.",
  },
  {
    q: "What about cleanup?",
    a: "We handle everything — delivery, setup, service during the event, and complete breakdown. You don't need to lift a finger.",
  },
  {
    q: "Can you customize packages?",
    a: "Yes. We regularly create bespoke packages for large-scale events and multi-day celebrations. Contact us for a tailored proposal.",
  },
  {
    q: "Are hookahs sanitized?",
    a: "Every hookah undergoes thorough cleaning and sanitization before each event using medical-grade protocols.",
  },
];

const steps = [
  { label: "Personal", icon: User },
  { label: "Event", icon: CalendarDays },
  { label: "Package", icon: Package },
  { label: "Requests", icon: MessageSquare },
  { label: "Details", icon: ClipboardList },
  { label: "Confirm", icon: CheckCircle2 },
];

const PACKAGES: Record<string, { label: string; price: string; sub: string }> =
  {
    essential: { label: "Essential", price: "$250", sub: "1 Hookah" },
    signature: { label: "Signature", price: "$450", sub: "2 Hookahs" },
    prestige: { label: "Prestige", price: "$750", sub: "4 Hookahs" },
  };

const ADDONS = [
  "Belly Dancer",
  "Live DJ",
  "Extra Hookah",
  "Extended Hours",
  "LED Lighting",
  "Smoke Effects",
];

// ─── Variants ────────────────────────────────────────────────────────────────

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    filter: "blur(4px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    filter: "blur(4px)",
  }),
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    eventDate: "",
    eventTime: "",
    eventType: "",
    guestCount: "",
    location: "",
    selectedPackage: "",
    addons: [] as string[],
    specialRequests: "",
  });

  // ── Helpers ────────────────────────────────────────────────────────────────

  const set = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const toggle = (addon: string) =>
    setForm((p) => ({
      ...p,
      addons: p.addons.includes(addon)
        ? p.addons.filter((x) => x !== addon)
        : [...p.addons, addon],
    }));

  const goNext = () => {
    // Validate required fields on steps 1–4 before advancing
    if (step < 5) {
      const formEl = document.querySelector("form");
      if (formEl && !formEl.checkValidity()) {
        formEl.reportValidity();
        return;
      }
    }
    setDirection(1);
    setStep((s) => Math.min(6, s + 1));
  };

  const goPrev = () => {
    setDirection(-1);
    setStep((s) => Math.max(1, s - 1));
  };

  const jumpTo = (target: number) => {
    setDirection(target < step ? -1 : 1);
    setStep(target);
  };

  // ── Submit ─────────────────────────────────────────────────────────────────

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Guard: only submit on the review step (step 5)
    if (step !== 5) return;

    setSubmitFeedback(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, guestCount: Number(form.guestCount) }),
      });

      let data: unknown = null;
      try {
        data = await response.json();
      } catch {
        throw new Error(
          "Cannot connect to the server. Please ensure the backend is running.",
        );
      }

      if (!response.ok || !(data as Record<string, unknown>)?.ok) {
        const d = data as Record<string, unknown> | null;
        const serverMessage = d?.message as string | undefined;
        const errors = d?.errors as Record<string, unknown> | undefined;

        const detail = errors
          ? (serverMessage ?? "Please check your details and try again.") +
            "\n" +
            Object.entries(errors)
              .map(
                ([field, errs]) =>
                  `${field}: ${Array.isArray(errs) ? errs.join(", ") : String(errs)}`,
              )
              .join("\n")
          : (serverMessage ?? "Please check your details and try again.");

        throw new Error(detail);
      }

      // ✅ Success — advance to confirmation
      setDirection(1);
      setStep(6);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to send reservation right now.";
      setSubmitFeedback({ type: "error", text: message });
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const today = new Date();

  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
  // ── Styles ─────────────────────────────────────────────────────────────────

  const inp =
    "w-full bg-surface border border-border rounded-[var(--radius-sm)] px-space-5 py-space-4 text-small-text text-text-primary placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors duration-150";

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <AnimateWrap>
      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section
        className="bg-surface"
        style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}
      >
        <div className="site-container text-center">
          <FadeIn delay={0}>
            <span className="text-primary text-small-text font-semibold tracking-[0.2em] uppercase mb-space-4 block">
              Contact
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-0 font-display text-hero-heading font-light text-text-primary leading-[1.2] tracking-tight">
              Begin Your Experience
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-space-6 text-text-secondary text-body font-light max-w-xl mx-auto leading-[1.5]">
              Complete the form or reach out directly. We respond within 15
              minutes.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════
          RESERVATION FORM
      ════════════════════════════════ */}
      <section
        className="bg-alt border-t border-white/[0.06]"
        style={{ paddingTop: "var(--sp-8)", paddingBottom: "var(--sp-8)" }}
      >
        <div className="site-container max-w-3xl mx-auto">
          <SectionHeading
            eyebrow="Reservation"
            title="Reserve Your Experience"
          />

          <FadeIn delay={0.15}>
            <div className="mt-space-9 bg-surface-raised border border-border/80 rounded-[var(--radius-lg)] overflow-hidden">
              {/* ── Step progress bar ── */}
              <div className="p-space-7 border-b border-border/50 bg-surface/50">
                <div className="flex items-center justify-between max-w-lg mx-auto">
                  {steps.map((s, i) => {
                    const isActive = step >= i + 1;
                    const isComplete = step > i + 1;
                    return (
                      <div key={s.label} className="flex items-center">
                        <div className="flex flex-col items-center gap-space-2">
                          <motion.div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                              isActive
                                ? "bg-primary text-primary-text"
                                : "bg-surface border border-border text-text-muted"
                            }`}
                            animate={{
                              scale: step === i + 1 ? 1.1 : 1,
                              backgroundColor: isActive
                                ? "var(--gold)"
                                : "var(--surface)",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                          >
                            {isComplete ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <s.icon className="w-4 h-4" />
                            )}
                          </motion.div>
                          <span
                            className={`text-[11px] font-medium hidden sm:block transition-colors duration-300 ${
                              isActive ? "text-primary" : "text-text-muted"
                            }`}
                          >
                            {s.label}
                          </span>
                        </div>

                        {/* Connector line — all steps except last */}
                        {i < steps.length - 1 && (
                          <div className="w-6 sm:w-10 h-px mx-space-2 overflow-hidden">
                            <motion.div
                              className="h-full"
                              animate={{
                                backgroundColor:
                                  step > i + 1
                                    ? "var(--gold)"
                                    : "var(--border)",
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

              {/* ── Form body ── */}
              <div
                className="p-space-7 md:p-space-9"
                style={{ minHeight: "340px" }}
              >
                <form onSubmit={submit}>
                  <AnimatePresence mode="wait" custom={direction}>
                    {/* ── Step 1: Personal ── */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 25,
                        }}
                        className="space-y-space-5"
                      >
                        <h3 className="font-display text-card-title font-light text-text-primary">
                          Personal Information
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-5">
                          <div>
                            <label className="block text-xs font-medium text-text-tertiary mb-space-2">
                              First Name *
                            </label>
                            <input
                              type="text"
                              className={inp}
                              placeholder="John"
                              value={form.firstName}
                              onChange={(e) =>
                                set(
                                  "firstName",
                                  e.target.value
                                    .replace(/[^a-zA-Z\s]/g, "")
                                    .slice(0, 30),
                                )
                              }
                              maxLength={30}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-text-tertiary mb-space-2">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              className={inp}
                              placeholder="Doe"
                              value={form.lastName}
                              onChange={(e) =>
                                set(
                                  "lastName",
                                  e.target.value
                                    .replace(/[^a-zA-Z\s]/g, "")
                                    .slice(0, 30),
                                )
                              }
                              maxLength={30}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-text-tertiary mb-space-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            className={inp}
                            placeholder="john@example.com"
                            value={form.email}
                            onChange={(e) => set("email", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-text-tertiary mb-space-2">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            className={inp}
                            placeholder="407-960-1018"
                            value={form.phone}
                            onChange={(e) =>
                              set(
                                "phone",
                                e.target.value
                                  .replace(/[^0-9+\-()\s]/g, "")
                                  .slice(0, 25),
                              )
                            }
                            maxLength={25}
                            required
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* ── Step 2: Event ── */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 25,
                        }}
                        className="space-y-space-5"
                      >
                        <h3 className="font-display text-card-title font-light text-text-primary">
                          Event Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-5">
                          <div>
                            <label className="block text-xs font-medium text-text-tertiary mb-space-2">
                              Date *
                            </label>
                            <input
                              type="date"
                              className={inp}
                              value={form.eventDate}
                              onChange={(e) => set("eventDate", e.target.value)}
                              min={minDate}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-text-tertiary mb-space-2">
                              Time *
                            </label>
                            <input
                              type="time"
                              className={inp}
                              value={form.eventTime}
                              onChange={(e) => set("eventTime", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-text-tertiary mb-space-2">
                            Event Type *
                          </label>
                          <select
                            className={inp}
                            value={form.eventType}
                            onChange={(e) => set("eventType", e.target.value)}
                            required
                          >
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
                            <label className="block text-xs font-medium text-text-tertiary mb-space-2">
                              Guests *
                            </label>
                            <input
                              type="number"
                              className={inp}
                              placeholder="50"
                              min="1"
                              value={form.guestCount}
                              onChange={(e) =>
                                set("guestCount", e.target.value)
                              }
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-text-tertiary mb-space-2">
                              Location *
                            </label>
                            <input
                              type="text"
                              className={inp}
                              placeholder="Event location"
                              value={form.location}
                              onChange={(e) =>
                                set("location", e.target.value.slice(0, 200))
                              }
                              maxLength={200}
                              required
                            />

                            <p className="text-sm text-gray-500 mt-1">
                              {form.location.length}/200 characters
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ── Step 3: Package ── */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 25,
                        }}
                        className="space-y-space-5"
                      >
                        <h3 className="font-display text-card-title font-light text-text-primary">
                          Select Package
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-5">
                          {Object.entries(PACKAGES).map(([id, pkg]) => (
                            <motion.button
                              key={id}
                              type="button"
                              onClick={() => set("selectedPackage", id)}
                              className={`p-space-6 rounded-[var(--radius-md)] text-left transition-all duration-150 flex flex-col justify-between ${
                                form.selectedPackage === id
                                  ? "border-2 border-primary bg-primary-muted"
                                  : "border border-border hover:border-text-tertiary bg-surface"
                              }`}
                              whileHover={{ scale: 1.03, y: -4 }}
                              whileTap={{ scale: 0.97 }}
                              animate={{
                                borderColor:
                                  form.selectedPackage === id
                                    ? "var(--gold)"
                                    : "var(--border)",
                                backgroundColor:
                                  form.selectedPackage === id
                                    ? "var(--gold-muted)"
                                    : "var(--surface)",
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                              }}
                            >
                              <p className="text-small-text font-semibold text-text-primary">
                                {pkg.label}
                              </p>
                              <p className="font-display text-card-title font-light text-text-primary mt-space-3">
                                {pkg.price}
                              </p>
                              <p className="text-xs text-text-muted mt-space-2">
                                {pkg.sub}
                              </p>
                            </motion.button>
                          ))}
                        </div>

                        <div className="pt-space-4">
                          <p className="text-small-text font-medium text-text-secondary mb-space-4">
                            Add-ons
                          </p>
                          <div className="flex flex-wrap gap-space-3">
                            {ADDONS.map((a) => (
                              <motion.button
                                key={a}
                                type="button"
                                onClick={() => toggle(a)}
                                className={`px-space-4 py-space-2 rounded-[var(--radius-sm)] text-xs font-medium transition-colors duration-150 ${
                                  form.addons.includes(a)
                                    ? "bg-primary text-primary-text"
                                    : "border border-border text-text-tertiary hover:border-text-tertiary"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                layout
                              >
                                {form.addons.includes(a) && "✓ "}
                                {a}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ── Step 4: Special Requests ── */}
                    {step === 4 && (
                      <motion.div
                        key="step4"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 25,
                        }}
                        className="space-y-space-5"
                      >
                        <h3 className="font-display text-card-title font-light text-text-primary">
                          Special Requests
                        </h3>
                        <p className="text-xs text-text-muted">
                          Optional — preferred flavors, setup preferences, or
                          anything else you'd like us to know.
                        </p>
                        <textarea
                          className={`${inp} min-h-[160px] resize-none`}
                          placeholder="e.g. Double apple flavor, premium seating arrangement, outdoor setup..."
                          value={form.specialRequests}
                          onChange={(e) =>
                            set("specialRequests", e.target.value)
                          }
                        />
                      </motion.div>
                    )}

                    {/* ── Step 5: Review Details ── */}
                    {step === 5 && (
                      <motion.div
                        key="step5"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 25,
                        }}
                        className="space-y-space-5"
                      >
                        <div>
                          <h3 className="font-display text-card-title font-light text-text-primary">
                            Review Your Details
                          </h3>
                          <p className="text-xs text-text-muted mt-space-2">
                            Please review everything before submitting your
                            reservation.
                          </p>
                        </div>

                        {/* Personal */}
                        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-space-5 space-y-space-3">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                              Personal
                            </p>
                            <motion.button
                              type="button"
                              onClick={() => jumpTo(1)}
                              className="text-xs text-primary hover:underline"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Edit
                            </motion.button>
                          </div>
                          <div className="grid grid-cols-2 gap-space-3">
                            <div>
                              <p className="text-text-muted text-xs">Name</p>
                              <p className="text-text-primary text-sm font-medium">
                                {form.firstName} {form.lastName}
                              </p>
                            </div>
                            <div>
                              <p className="text-text-muted text-xs">Phone</p>
                              <p className="text-text-primary text-sm font-medium">
                                {form.phone || "—"}
                              </p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-text-muted text-xs">Email</p>
                              <p className="text-text-primary text-sm font-medium break-all">
                                {form.email || "—"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Event */}
                        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-space-5 space-y-space-3">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                              Event
                            </p>
                            <motion.button
                              type="button"
                              onClick={() => jumpTo(2)}
                              className="text-xs text-primary hover:underline"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Edit
                            </motion.button>
                          </div>
                          <div className="grid grid-cols-2 gap-space-3">
                            <div>
                              <p className="text-text-muted text-xs">Date</p>
                              <p className="text-text-primary text-sm font-medium">
                                {form.eventDate
                                  ? new Date(
                                      form.eventDate + "T00:00",
                                    ).toLocaleDateString("en-US", {
                                      month: "long",
                                      day: "numeric",
                                      year: "numeric",
                                    })
                                  : "—"}
                              </p>
                            </div>
                            <div>
                              <p className="text-text-muted text-xs">Time</p>
                              <p className="text-text-primary text-sm font-medium">
                                {form.eventTime
                                  ? new Date(
                                      `2000-01-01T${form.eventTime}`,
                                    ).toLocaleTimeString("en-US", {
                                      hour: "numeric",
                                      minute: "2-digit",
                                    })
                                  : "—"}
                              </p>
                            </div>
                            <div>
                              <p className="text-text-muted text-xs">Type</p>
                              <p className="text-text-primary text-sm font-medium capitalize">
                                {form.eventType || "—"}
                              </p>
                            </div>
                            <div>
                              <p className="text-text-muted text-xs">Guests</p>
                              <p className="text-text-primary text-sm font-medium">
                                {form.guestCount || "—"}
                              </p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-text-muted text-xs">
                                Location
                              </p>
                              <p className="text-text-primary text-sm font-medium">
                                {form.location || "—"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Package */}
                        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-space-5 space-y-space-3">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                              Package
                            </p>
                            <motion.button
                              type="button"
                              onClick={() => jumpTo(3)}
                              className="text-xs text-primary hover:underline"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Edit
                            </motion.button>
                          </div>
                          <div className="space-y-space-3">
                            <div>
                              <p className="text-text-muted text-xs">
                                Selected Package
                              </p>
                              <p className="text-text-primary text-sm font-medium capitalize">
                                {form.selectedPackage &&
                                PACKAGES[form.selectedPackage]
                                  ? `${PACKAGES[form.selectedPackage].label} — ${PACKAGES[form.selectedPackage].price}`
                                  : "—"}
                              </p>
                            </div>
                            <div>
                              <p className="text-text-muted text-xs">Add-ons</p>
                              {form.addons.length > 0 ? (
                                <div className="flex flex-wrap gap-space-2 mt-space-1">
                                  {form.addons.map((a) => (
                                    <span
                                      key={a}
                                      className="px-space-3 py-space-1 rounded-[var(--radius-sm)] bg-primary-muted text-primary text-xs font-medium"
                                    >
                                      {a}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-text-primary text-sm font-medium">
                                  None
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Special Requests */}
                        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-space-5 space-y-space-3">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                              Special Requests
                            </p>
                            <motion.button
                              type="button"
                              onClick={() => jumpTo(4)}
                              className="text-xs text-primary hover:underline"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Edit
                            </motion.button>
                          </div>
                          <p className="text-sm text-text-secondary leading-relaxed">
                            {form.specialRequests ? (
                              form.specialRequests
                            ) : (
                              <span className="text-text-muted italic">
                                None provided
                              </span>
                            )}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* ── Step 6: Confirmation ── */}
                    {step === 6 && (
                      <motion.div
                        key="step6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        }}
                        className="text-center py-space-10"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                          <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-space-6" />
                        </motion.div>
                        <h3 className="font-display text-card-title font-light text-text-primary mb-space-3">
                          Reservation Submitted
                        </h3>
                        <p className="text-small-text text-text-secondary mb-space-7 max-w-sm mx-auto leading-[1.5]">
                          Thank you,{" "}
                          <span className="text-text-primary font-medium">
                            {form.firstName}
                          </span>
                          . Our concierge will contact you within 15 minutes to
                          confirm your{" "}
                          <span className="capitalize">
                            {form.eventType || "event"}
                          </span>{" "}
                          reservation.
                        </p>
                        <motion.a
                          href="tel:+14079601018"
                          className="btn-base btn-primary inline-flex items-center gap-space-2"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          Call Now
                        </motion.a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── Navigation (hidden on step 6) ── */}
                  {step < 6 && (
                    <div className="mt-space-10 pt-space-7 border-t border-border/50">
                      {submitFeedback && (
                        <p
                          className={`mb-space-4 whitespace-pre-line text-sm ${
                            submitFeedback.type === "error"
                              ? "text-[#ff8f8f]"
                              : "text-[#9be59b]"
                          }`}
                        >
                          {submitFeedback.text}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        {/* Back */}
                        {step > 1 ? (
                          <motion.button
                            type="button"
                            onClick={goPrev}
                            className="flex items-center gap-space-2 text-small-text text-text-tertiary hover:text-text-primary transition-colors"
                            whileHover={{ x: -4 }}
                          >
                            <ArrowLeft className="w-4 h-4" /> Back
                          </motion.button>
                        ) : (
                          <div />
                        )}

                        {/* Continue — steps 1–4 */}
                        {step < 5 && (
                          <motion.button
                            type="button"
                            onClick={goNext}
                            disabled={isSubmitting}
                            className="btn-base btn-primary flex items-center gap-space-2 disabled:opacity-70"
                            whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                          >
                            Continue <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        )}

                        {/* Confirm — step 5 only */}
                        {step === 5 && (
                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-base btn-primary flex items-center gap-space-2 disabled:opacity-70"
                            whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                          >
                            {isSubmitting ? (
                              "Sending…"
                            ) : (
                              <>
                                <CheckCircle2 className="w-4 h-4" /> Confirm
                                Reservation
                              </>
                            )}
                          </motion.button>
                        )}
                      </div>
                    </div>
                  )}
                </form>

                {/* Security badge — hidden on confirmation */}
                {step < 6 && (
                  <p className="flex items-center justify-center gap-space-2 mt-space-6 text-xs text-text-muted">
                    <Shield className="w-3.5 h-3.5" /> Secure. We respond within
                    15 minutes.
                  </p>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════
          FAQ
      ════════════════════════════════ */}
      <section
        className="bg-bg border-t border-white/[0.06]"
        style={{ paddingTop: "var(--sp-8)", paddingBottom: "var(--sp-8)" }}
      >
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
                    borderColor: isOpen
                      ? "rgba(198,161,69,0.25)"
                      : "rgba(255,255,255,0.06)",
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
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
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 18,
                      }}
                    >
                      <ChevronDown className="w-4 h-4 text-text-tertiary flex-shrink-0" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 25,
                        }}
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

      {/* ════════════════════════════════
          CONTACT INFO
      ════════════════════════════════ */}
      <section
        className="bg-alt border-t border-white/[0.06]"
        style={{ paddingTop: "var(--sp-8)", paddingBottom: "var(--sp-8)" }}
      >
        <div className="site-container">
          <SectionHeading eyebrow="Direct Contact" title="Get In Touch" />

          <StaggerContainer
            staggerDelay={0.1}
            className="mt-space-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-6 lg:gap-space-7"
          >
            <StaggerItem>
              <a
                href="tel:+14079601018"
                className="site-card hover:border-primary/20 transition-all duration-300 block"
              >
                <div>
                  <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-space-2">
                  <h4 className="text-small-text font-semibold text-text-primary">
                    Call Us
                  </h4>
                  <p className="text-small-text text-primary font-medium">
                    407-960-1018
                  </p>
                  <p className="text-xs text-text-muted">3PM – 2AM daily</p>
                </div>
              </a>
            </StaggerItem>

            <StaggerItem>
              <a
                href="mailto:info@hookahrental.com"
                className="site-card hover:border-primary/20 transition-all duration-300 block"
              >
                <div>
                  <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-space-2">
                  <h4 className="text-small-text font-semibold text-text-primary">
                    Email
                  </h4>
                  <p className="text-small-text text-primary font-medium break-all">
                    info@hookahrental.com
                  </p>
                </div>
              </a>
            </StaggerItem>

            <StaggerItem>
              <a
                href="https://wa.me/14079601018"
                target="_blank"
                rel="noopener noreferrer"
                className="site-card hover:border-success/20 transition-all duration-300 block"
              >
                <div>
                  <MessageCircle
                    className="w-5 h-5 text-success"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-col gap-space-2">
                  <h4 className="text-small-text font-semibold text-text-primary">
                    WhatsApp
                  </h4>
                  <p className="text-small-text text-success font-medium">
                    Message Us
                  </p>
                </div>
              </a>
            </StaggerItem>

            <StaggerItem>
              <div className="site-card hover:border-primary/20 transition-all duration-300">
                <div>
                  <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-space-2">
                  <h4 className="text-small-text font-semibold text-text-primary">
                    Hours
                  </h4>
                  <p className="text-small-text text-text-secondary">
                    Mon – Sun
                  </p>
                  <p className="text-small-text text-primary font-medium">
                    3PM – 2AM
                  </p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Service Areas */}
          <FadeIn delay={0.3}>
            <div className="mt-space-9 bg-surface-raised border border-border/80 rounded-[var(--radius-lg)] p-space-7 md:p-space-9">
              <div className="flex items-center gap-space-3 mb-space-6">
                <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  Service Areas
                </h4>
              </div>
              <StaggerContainer
                staggerDelay={0.05}
                className="flex flex-wrap gap-space-3"
              >
                {[
                  "Miami Beach",
                  "Brickell",
                  "Wynwood",
                  "Coral Gables",
                  "Fort Lauderdale",
                  "Key Biscayne",
                  "Doral",
                  "Orlando",
                  "Kissimmee",
                  "Lake Nona",
                ].map((area) => (
                  <StaggerItem key={area} distance={6}>
                    <motion.span
                      className="bg-surface border border-border rounded-[var(--radius-sm)] px-space-5 py-space-3 text-small-text font-light text-text-secondary inline-block"
                      whileHover={{
                        borderColor: "rgba(198,161,69,0.3)",
                        color: "var(--text-1)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 18,
                      }}
                    >
                      {area}
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
