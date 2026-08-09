import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useScrollReveal";
import SectionHeading from "../components/SectionHeading";
import { Check, ArrowRight } from "lucide-react";

const pkgs = [
  {
    name: "The Essential",
    price: "$250",
    pop: false,
    features: [
      "1 Premium Hookah",
      "Up to 10 Guests",
      "2 Hours of Service",
      "Unlimited Flavors",
      "Setup & Breakdown",
      "All Supplies Included",
    ],
  },
  {
    name: "The Signature",
    price: "$450",
    pop: true,
    features: [
      "2 Premium Hookahs",
      "Up to 25 Guests",
      "3 Hours of Service",
      "Premium Flavors",
      "Dedicated Attendant",
      "Setup & Breakdown",
      "LED Lighting",
      "All Supplies Included",
    ],
  },
  {
    name: "The Prestige",
    price: "$750",
    pop: false,
    features: [
      "4 Premium Hookahs",
      "Up to 50 Guests",
      "4 Hours of Service",
      "Premium Flavors",
      "2 Dedicated Attendants",
      "VIP Setup",
      "LED & Smoke Effects",
      "Priority Booking",
      "All Supplies Included",
    ],
  },
];

const comparison = [
  { f: "Hookahs", a: "1", b: "2", c: "4" },
  { f: "Guests", a: "≤10", b: "≤25", c: "≤50" },
  { f: "Duration", a: "2h", b: "3h", c: "4h" },
  { f: "Attendant", a: "—", b: "1", c: "2" },
  { f: "LED Lighting", a: "—", b: "✓", c: "✓" },
  { f: "VIP Setup", a: "—", b: "—", c: "✓" },
];

const starbuzz = [
  "Blue Mist",
  "Code 69",
  "Pirate's Cave",
  "Queen of Sex",
  "Piña Colada",
  "Passion Kiss",
  "Safari Melon",
  "Chocolate Mint",
  "Citrus Mist",
];
const alfakher = [
  "Double Apple",
  "Grape Mint",
  "Watermelon",
  "Lemon Mint",
  "Peach",
  "Blueberry",
  "Mint",
  "Strawberry",
  "Mango",
];

export default function PackagesPage() {
  const { ref: r1, visible: v1 } = useReveal(0.06);
  const { ref: r2, visible: v2 } = useReveal(0.06);
  const { ref: r3, visible: v3 } = useReveal(0.06);

  return (
    <>
      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: "52vh" }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/16935900/pexels-photo-16935900.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1400"
            alt="Luxury hookah packages"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.78) 60%, rgba(8,8,8,1) 100%)",
            }}
          />
        </div>

        {/* Radial glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            height: "300px",
            background:
              "radial-gradient(ellipse, rgba(198,161,69,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          ref={r1}
          className="relative z-10 site-container w-full text-center"
          style={{
            paddingTop: "100px",
            paddingBottom: "80px",
            opacity: v1 ? 1 : 0,
            transform: v1 ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <span className="lux-label" style={{ marginBottom: "24px" }}>
            Packages
          </span>
          <h1
            className="lux-h1"
            style={{
              marginTop: "0",
              marginBottom: "24px",
              maxWidth: "760px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Curated Luxury Experiences
          </h1>
          <p
            className="lux-body"
            style={{ maxWidth: "520px", margin: "0 auto" }}
          >
            Select from our curated packages or contact us for a bespoke
            experience tailored to your event.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════
          PACKAGE CARDS
      ══════════════════════════════════ */}
      <section
        className="bg-alt"
        style={{ paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div className="site-container">
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            style={{
              opacity: v1 ? 1 : 0,
              transition: "opacity 0.75s ease 0.2s",
            }}
          >
            {pkgs.map((p, i) => (
              <div
                key={p.name}
                style={{
                  background: p.pop
                    ? "rgba(198,161,69,0.04)"
                    : "rgba(255,255,255,0.025)",
                  border: p.pop
                    ? "1px solid rgba(198,161,69,0.35)"
                    : "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "24px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: p.pop
                    ? "0 0 0 1px rgba(198,161,69,0.1), 0 24px 64px rgba(0,0,0,0.4)"
                    : "0 4px 24px rgba(0,0,0,0.3)",
                  transition: "transform 350ms ease, box-shadow 350ms ease",
                  animationDelay: `${i * 80}ms`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-6px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = p.pop
                    ? "0 0 0 1px rgba(198,161,69,0.2), 0 32px 80px rgba(0,0,0,0.5)"
                    : "0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(198,161,69,0.07)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = p.pop
                    ? "0 0 0 1px rgba(198,161,69,0.1), 0 24px 64px rgba(0,0,0,0.4)"
                    : "0 4px 24px rgba(0,0,0,0.3)";
                }}
              >
                {/* Popular badge */}
                {p.pop && (
                  <div
                    style={{
                      background: "linear-gradient(135deg, #C6A145, #D4AF37)",
                      color: "#080808",
                      textAlign: "center",
                      padding: "10px 24px",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <div
                  style={{
                    padding: "40px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Header */}
                  <div style={{ marginBottom: "32px" }}>
                    <h3 className="lux-h3" style={{ marginBottom: "16px" }}>
                      {p.name}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(36px, 4vw, 52px)",
                          fontWeight: 400,
                          color: p.pop ? "var(--gold)" : "var(--text-1)",
                          letterSpacing: "-0.02em",
                          lineHeight: 1,
                        }}
                      >
                        {p.price}
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "var(--text-3)",
                          fontWeight: 300,
                        }}
                      >
                        / event
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                      flex: 1,
                      marginBottom: "32px",
                    }}
                  >
                    {p.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                        }}
                      >
                        <Check
                          style={{
                            width: "16px",
                            height: "16px",
                            color: "var(--gold)",
                            marginTop: "2px",
                            flexShrink: 0,
                          }}
                          aria-hidden="true"
                        />
                        <span
                          style={{
                            fontSize: "15px",
                            color: "var(--text-2)",
                            lineHeight: 1.5,
                            fontWeight: 300,
                          }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to="/contact"
                    className={`btn-base w-full ${p.pop ? "btn-primary" : "btn-secondary"}`}
                    style={{ justifyContent: "center" }}
                  >
                    Reserve This Package
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          COMPARISON TABLE
      ══════════════════════════════════ */}
      <section
        style={{
          paddingTop: "80px",
          paddingBottom: "80px",
          background: "var(--bg)",
        }}
      >
        <div className="site-container" style={{ maxWidth: "860px" }}>
          <SectionHeading eyebrow="Compare" title="Package Comparison" />
          <div
            ref={r2}
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "24px",
              overflow: "hidden",
              overflowX: "auto",
              opacity: v2 ? 1 : 0,
              transform: v2 ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.75s ease, transform 0.75s ease",
            }}
          >
            <table
              style={{
                width: "100%",
                fontSize: "14px",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <th
                    style={{
                      textAlign: "left",
                      padding: "20px 32px",
                      color: "var(--text-3)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontSize: "11px",
                    }}
                  >
                    Feature
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "20px 24px",
                      color: "var(--text-3)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontSize: "11px",
                    }}
                  >
                    Essential
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "20px 24px",
                      color: "var(--gold)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontSize: "11px",
                      background: "rgba(198,161,69,0.04)",
                    }}
                  >
                    Signature
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "20px 24px",
                      color: "var(--text-3)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontSize: "11px",
                    }}
                  >
                    Prestige
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((r, idx) => (
                  <tr
                    key={r.f}
                    style={{
                      borderBottom:
                        idx < comparison.length - 1
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "none",
                    }}
                  >
                    <td
                      style={{
                        padding: "18px 32px",
                        color: "var(--text-2)",
                        fontWeight: 500,
                      }}
                    >
                      {r.f}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "18px 24px",
                        color: "var(--text-3)",
                        fontWeight: 300,
                      }}
                    >
                      {r.a}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "18px 24px",
                        color: "var(--gold)",
                        fontWeight: 600,
                        background: "rgba(198,161,69,0.03)",
                      }}
                    >
                      {r.b}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "18px 24px",
                        color: "var(--text-3)",
                        fontWeight: 300,
                      }}
                    >
                      {r.c}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FLAVORS
      ══════════════════════════════════ */}
      {/* <section className="bg-alt" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="site-container" style={{ maxWidth: '860px' }}>
          <SectionHeading
            eyebrow="Flavors"
            title="Premium Flavors, Unlimited Choice"
            description="All flavors included with every package — unlimited throughout your event."
          />
          <div
            ref={r3}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '48px',
              opacity: v3 ? 1 : 0,
              transform: v3 ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.75s ease, transform 0.75s ease',
            }}
          >
            {[{ label: 'Starbuzz', items: starbuzz }, { label: 'Al Fakher', items: alfakher }].map(brand => (
              <div key={brand.label}>
                <h3 className="lux-label" style={{ marginBottom: '20px' }}>{brand.label}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {brand.items.map(f => (
                    <span
                      key={f}
                      style={{
                        background: 'rgba(255,255,255,0.025)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '12px',
                        padding: '10px 18px',
                        fontSize: '14px',
                        color: 'var(--text-2)',
                        fontWeight: 300,
                        transition: 'border-color 200ms ease, color 200ms ease',
                        cursor: 'default',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(198,161,69,0.3)';
                        (e.currentTarget as HTMLElement).style.color = 'var(--text-1)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                        (e.currentTarget as HTMLElement).style.color = 'var(--text-2)';
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ══════════════════════════════════
          CTA
      ══════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #1a160a 100%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(198,161,69,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 site-container text-center">
          <span className="lux-label" style={{ marginBottom: "24px" }}>
            Custom Experience
          </span>
          <h2
            className="lux-h2"
            style={{
              maxWidth: "680px",
              margin: "0 auto",
              marginBottom: "32px",
            }}
          >
            Need a Custom Package?
          </h2>
          <p
            className="lux-body"
            style={{
              maxWidth: "520px",
              margin: "0 auto",
              marginBottom: "48px",
            }}
          >
            We create bespoke experiences for events of any scale. Contact us
            for a tailored proposal.
          </p>
          <Link
            to="/contact"
            className="btn-base btn-primary"
            style={{ minWidth: "220px" }}
          >
            Request Custom Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
