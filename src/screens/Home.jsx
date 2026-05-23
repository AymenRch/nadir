import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.png";

const IntellectualPropertyIllustration = () => (
  <svg viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 160 }}>
    <path d="M80 10 L130 30 L130 75 Q130 110 80 125 Q30 110 30 75 L30 30 Z" fill="url(#shieldGrad)" stroke="#C9A84C" strokeWidth="2" />
    <path d="M80 20 L118 36 L118 75 Q118 103 80 115 Q42 103 42 75 L42 36 Z" fill="url(#shieldInner)" opacity="0.4" />
    <text x="80" y="82" textAnchor="middle" fontSize="42" fontFamily="serif" fill="#C9A84C" fontWeight="bold">©</text>
    {[[22, 20], [138, 22], [15, 85], [145, 80], [75, 5]].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="2.5" fill="#C9A84C" opacity="0.7" />
    ))}
    <defs>
      <linearGradient id="shieldGrad" x1="30" y1="10" x2="130" y2="125" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1a1a2e" />
        <stop offset="100%" stopColor="#16213e" />
      </linearGradient>
      <linearGradient id="shieldInner" x1="42" y1="20" x2="118" y2="115" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#C9A84C" />
        <stop offset="100%" stopColor="#1a1a2e" />
      </linearGradient>
    </defs>
  </svg>
);

const CourtMetrageIllustration = () => (
  <svg viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 160 }}>
    {/* Film strip left */}
    <rect x="8" y="20" width="22" height="90" rx="3" fill="#1a1a2e" stroke="#C9A84C" strokeWidth="1.2" />
    {[28, 42, 56, 70, 84, 98].map((y, i) => (
      <rect key={i} x="12" y={y} width="14" height="8" rx="1.5" fill="#C9A84C" opacity="0.25" />
    ))}
    {/* Film strip right */}
    <rect x="130" y="20" width="22" height="90" rx="3" fill="#1a1a2e" stroke="#C9A84C" strokeWidth="1.2" />
    {[28, 42, 56, 70, 84, 98].map((y, i) => (
      <rect key={i} x="134" y={y} width="14" height="8" rx="1.5" fill="#C9A84C" opacity="0.25" />
    ))}
    {/* Center screen */}
    <rect x="38" y="28" width="84" height="54" rx="6" fill="#0d0d1a" stroke="#C9A84C" strokeWidth="1.5" />
    {/* Play triangle */}
    <polygon points="68,42 68,68 95,55" fill="#C9A84C" opacity="0.85" />
    {/* AI sparkle stars */}
    {[[108, 35], [114, 55], [104, 70]].map(([x, y], i) => (
      <g key={i}>
        <line x1={x} y1={y - 5} x2={x} y2={y + 5} stroke="#C9A84C" strokeWidth="1.2" opacity="0.6" />
        <line x1={x - 5} y1={y} x2={x + 5} y2={y} stroke="#C9A84C" strokeWidth="1.2" opacity="0.6" />
      </g>
    ))}
    {/* Bottom clapperboard hint */}
    <rect x="50" y="90" width="60" height="22" rx="3" fill="#16213e" stroke="#C9A84C" strokeWidth="1" />
    {[0,1,2,3,4].map(i => (
      <line key={i} x1={50 + i * 12} y1="90" x2={56 + i * 12} y2="100" stroke="#C9A84C" strokeWidth="1.5" opacity="0.5" />
    ))}
    <text x="80" y="107" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fill="#C9A84C" opacity="0.7" letterSpacing="1">COURT MÉTRAGE</text>
  </svg>
);

const Home = () => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      titleAr: "ملكية فكرية",
      titleFr: "Propriété Intellectuelle",
      description:
        "سجّل أعمالك الفنية والإبداعية لحماية حقوقك القانونية. نضمن لك حماية شاملة لإنتاجك الفكري وفق أحدث الأطر التشريعية.",
      descriptionFr: "Enregistrez vos œuvres artistiques pour protéger votre propriété et vos droits légaux.",
      illustration: <IntellectualPropertyIllustration />,
      tag: "حماية قانونية",
      route: "/registerWork",
    },
    {
      id: 2,
      titleAr: "كوّن فيلمك القصير",
      titleFr: "Court Métrage IA",
      description:
        "ممثل؟ سيناريست؟ موسيقي؟ أو مخرج يجمع الكل؟ ابدأ رحلتك الإبداعية ودع الذكاء الاصطناعي يُكمل الصورة.",
      descriptionFr: "Choisissez votre rôle. L'IA crée votre court métrage.",
      illustration: <CourtMetrageIllustration />,
      tag: "إبداع × ذكاء اصطناعي",
      route: "/court-metrage/roles",
    },
  ];

  return (
    <div style={styles.page}>
      <img src={logo} alt="Logo" style={{ width: 200, marginBottom: 40 }} />
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.header}>
        <div style={styles.headerLine} />
        <span style={styles.headerText}>خدماتنا القانونية</span>
        <div style={styles.headerLine} />
      </div>
      <p style={styles.subtitle}>نقدّم لك حلولاً قانونية وإبداعية متكاملة بكل احترافية وشفافية</p>

      <div style={styles.cardsContainer}>
        {projects.map((p) => (
          <div
            key={p.id}
            style={{
              ...styles.card,
              ...(hovered === p.id ? styles.cardHovered : {}),
            }}
            onClick={() => navigate(p.route)}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <span style={styles.tag}>{p.tag}</span>
            <div style={styles.illustrationWrap}>{p.illustration}</div>
            <h2 style={styles.titleAr}>{p.titleAr}</h2>
            <h3 style={styles.titleFr}>{p.titleFr}</h3>
            <div style={styles.divider} />
            <p style={styles.descAr}>{p.description}</p>
            <p style={styles.descFr}>{p.descriptionFr}</p>
            <button
              style={{
                ...styles.btn,
                ...(hovered === p.id ? styles.btnHovered : {}),
              }}
            >
              اكتشف المزيد &rarr;
            </button>
            <div style={{ ...styles.glowBorder, opacity: hovered === p.id ? 1 : 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0d0d1a",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 24px",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    position: "relative",
    overflow: "hidden",
  },
  blob1: {
    position: "absolute", top: "-120px", left: "-120px",
    width: "420px", height: "420px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  blob2: {
    position: "absolute", bottom: "-100px", right: "-100px",
    width: "380px", height: "380px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(42,74,58,0.25) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  header: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" },
  headerLine: { width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #C9A84C)" },
  headerText: {
    color: "#C9A84C", fontSize: "13px", letterSpacing: "4px",
    textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: 600,
  },
  subtitle: {
    color: "#a09070", fontSize: "14px", marginBottom: "48px",
    direction: "rtl", fontFamily: "sans-serif", letterSpacing: "0.5px",
  },
  cardsContainer: {
    display: "flex", flexDirection: "row", alignItems: "stretch",
    justifyContent: "center", gap: "32px", flexWrap: "wrap",
    zIndex: 1, position: "relative",
  },
  card: {
    position: "relative", width: "300px",
    background: "linear-gradient(160deg, #141428 0%, #0f1f18 100%)",
    border: "1px solid rgba(201,168,76,0.18)", borderRadius: "20px",
    padding: "36px 28px 32px", display: "flex", flexDirection: "column",
    alignItems: "center", cursor: "pointer",
    transition: "transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s ease",
    boxShadow: "0 8px 40px rgba(0,0,0,0.4)", overflow: "hidden",
  },
  cardHovered: {
    transform: "translateY(-10px) scale(1.02)",
    boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(201,168,76,0.08)",
  },
  glowBorder: {
    position: "absolute", inset: 0, borderRadius: "20px",
    border: "1.5px solid rgba(201,168,76,0.55)",
    pointerEvents: "none", transition: "opacity 0.35s ease",
  },
  tag: {
    alignSelf: "flex-end", background: "rgba(201,168,76,0.12)", color: "#C9A84C",
    fontSize: "11px", fontFamily: "sans-serif", padding: "4px 12px",
    borderRadius: "20px", border: "1px solid rgba(201,168,76,0.3)",
    marginBottom: "20px", letterSpacing: "0.5px",
  },
  illustrationWrap: {
    width: "140px", height: "120px", display: "flex",
    alignItems: "center", justifyContent: "center", marginBottom: "24px",
    filter: "drop-shadow(0 4px 16px rgba(201,168,76,0.18))",
  },
  titleAr: {
    color: "#e8d9b0", fontSize: "22px", fontWeight: 700,
    margin: "0 0 4px", textAlign: "center", direction: "rtl", letterSpacing: "0.5px",
  },
  titleFr: {
    color: "#C9A84C", fontSize: "12px", fontWeight: 400, margin: "0 0 16px",
    textAlign: "center", fontFamily: "sans-serif", letterSpacing: "2px",
    textTransform: "uppercase", opacity: 0.8,
  },
  divider: {
    width: "40px", height: "2px",
    background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
    marginBottom: "16px", borderRadius: "2px",
  },
  descAr: {
    color: "#b0a898", fontSize: "13.5px", lineHeight: "1.9",
    textAlign: "center", direction: "rtl", fontFamily: "sans-serif", margin: "0 0 8px",
  },
  descFr: {
    color: "#6a7a72", fontSize: "11px", lineHeight: "1.7",
    textAlign: "center", fontFamily: "sans-serif", margin: "0 0 24px", fontStyle: "italic",
  },
  btn: {
    background: "transparent", border: "1px solid rgba(201,168,76,0.4)",
    color: "#C9A84C", fontSize: "12px", fontFamily: "sans-serif",
    padding: "10px 24px", borderRadius: "30px", cursor: "pointer",
    letterSpacing: "1px", transition: "background 0.25s, border-color 0.25s, color 0.25s",
    direction: "rtl", marginTop: "auto",
  },
  btnHovered: {
    background: "rgba(201,168,76,0.14)", borderColor: "#C9A84C", color: "#e8d9b0",
  },
};

export default Home;