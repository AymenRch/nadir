import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ArtistIllustration = () => (
  <svg viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 160 }}>
    {/* Spotlight glow */}
    <ellipse cx="80" cy="115" rx="45" ry="8" fill="#C9A84C" opacity="0.08" />
    {/* Microphone stand */}
    <line x1="80" y1="80" x2="80" y2="112" stroke="#C9A84C" strokeWidth="2" opacity="0.6" />
    <line x1="62" y1="112" x2="98" y2="112" stroke="#C9A84C" strokeWidth="2" opacity="0.6" />
    {/* Microphone head */}
    <rect x="68" y="46" width="24" height="36" rx="12" fill="#1a1a2e" stroke="#C9A84C" strokeWidth="1.8" />
    {/* Mic grille lines */}
    {[54, 60, 66, 72, 78].map((y, i) => (
      <line key={i} x1="70" y1={y} x2="90" y2={y} stroke="#C9A84C" strokeWidth="0.8" opacity="0.35" />
    ))}
    {/* Sound waves left */}
    <path d="M58 55 Q50 65 58 75" stroke="#C9A84C" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
    <path d="M48 48 Q36 65 48 82" stroke="#C9A84C" strokeWidth="1.2" fill="none" opacity="0.3" strokeLinecap="round" />
    {/* Sound waves right */}
    <path d="M102 55 Q110 65 102 75" stroke="#C9A84C" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
    <path d="M112 48 Q124 65 112 82" stroke="#C9A84C" strokeWidth="1.2" fill="none" opacity="0.3" strokeLinecap="round" />
    {/* Dollar / money sparkles */}
    <text x="28" y="32" fontSize="13" fill="#C9A84C" opacity="0.7" fontFamily="sans-serif" fontWeight="bold">$</text>
    <text x="118" y="38" fontSize="10" fill="#C9A84C" opacity="0.5" fontFamily="sans-serif" fontWeight="bold">$</text>
    <text x="105" y="22" fontSize="14" fill="#C9A84C" opacity="0.6" fontFamily="sans-serif" fontWeight="bold">$</text>
    {/* Stars */}
    {[[20, 60], [140, 55], [35, 20], [130, 100]].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="2" fill="#C9A84C" opacity="0.5" />
    ))}
    {/* Paint palette hint */}
    <ellipse cx="38" cy="95" rx="14" ry="9" fill="#1a1a2e" stroke="#C9A84C" strokeWidth="1" opacity="0.6" />
    {[["#C9A84C", 32, 93], ["#2a4a3a", 40, 89], ["#16213e", 44, 97]].map(([c, x, y], i) => (
      <circle key={i} cx={x} cy={y} r="3" fill={c} opacity="0.8" />
    ))}
  </svg>
);

const RealisateurIllustration = () => (
  <svg viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 160 }}>
    {/* Camera body */}
    <rect x="38" y="45" width="70" height="50" rx="8" fill="#1a1a2e" stroke="#C9A84C" strokeWidth="1.8" />
    {/* Lens outer */}
    <circle cx="73" cy="70" r="20" fill="#0d0d1a" stroke="#C9A84C" strokeWidth="1.5" />
    {/* Lens inner rings */}
    <circle cx="73" cy="70" r="14" fill="#0d0d1a" stroke="#C9A84C" strokeWidth="1" opacity="0.6" />
    <circle cx="73" cy="70" r="8" fill="#141428" stroke="#C9A84C" strokeWidth="1" opacity="0.4" />
    <circle cx="73" cy="70" r="3" fill="#C9A84C" opacity="0.5" />
    {/* Lens shine */}
    <circle cx="67" cy="64" r="3" fill="white" opacity="0.08" />
    {/* Viewfinder top */}
    <rect x="88" y="35" width="18" height="12" rx="3" fill="#1a1a2e" stroke="#C9A84C" strokeWidth="1.2" />
    {/* Record button */}
    <circle cx="97" cy="55" r="6" fill="#1a1a2e" stroke="#C9A84C" strokeWidth="1" />
    <circle cx="97" cy="55" r="3" fill="#C9A84C" opacity="0.7" />
    {/* Clapperboard */}
    <rect x="100" y="72" width="30" height="22" rx="3" fill="#16213e" stroke="#C9A84C" strokeWidth="1" />
    {[0,1,2].map(i => (
      <line key={i} x1={100 + i * 10} y1="72" x2={105 + i * 10} y2="82" stroke="#C9A84C" strokeWidth="1.5" opacity="0.45" />
    ))}
    <text x="115" y="90" textAnchor="middle" fontSize="6" fontFamily="sans-serif" fill="#C9A84C" opacity="0.6" letterSpacing="0.5">ACTION</text>
    {/* Film strip left */}
    <rect x="8" y="50" width="24" height="60" rx="3" fill="#141428" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
    {[56, 68, 80, 90, 100].map((y, i) => (
      <rect key={i} x="12" y={y} width="16" height="7" rx="1" fill="#C9A84C" opacity="0.15" />
    ))}
    {/* AI sparkles */}
    {[[135, 40], [142, 60], [130, 75]].map(([x, y], i) => (
      <g key={i}>
        <line x1={x} y1={y - 5} x2={x} y2={y + 5} stroke="#C9A84C" strokeWidth="1.2" opacity="0.55" />
        <line x1={x - 5} y1={y} x2={x + 5} y2={y} stroke="#C9A84C" strokeWidth="1.2" opacity="0.55" />
        <circle cx={x} cy={y} r="1.5" fill="#C9A84C" opacity="0.4" />
      </g>
    ))}
    {/* Stars */}
    {[[30, 30], [120, 25]].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="2" fill="#C9A84C" opacity="0.45" />
    ))}
  </svg>
);

const CourtMetrageRoles = () => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  const roles = [
    {
      id: 1,
      titleAr: "أنا فنان",
      titleFr: "Je suis un Artiste",
      description:
        "ممثل، موسيقي، مصمم أو سيناريست؟ سوّق موهبتك، اعرض أعمالك، وابدأ في جني الأرباح من إبداعك عبر الإنترنت.",
      descriptionFr: "Monétisez votre talent. Partagez vos œuvres et trouvez des collaborateurs.",
      illustration: <ArtistIllustration />,
      tag: "فنان • إبداع • دخل",
      route: "/court-metrage/artist",
    },
    {
      id: 2,
      titleAr: "أنا مخرج",
      titleFr: "Je suis Réalisateur",
      description:
        "اختر ممثليك، سيناريوك، موسيقاك وأزياءك — ودع الذكاء الاصطناعي يُحوّل رؤيتك إلى كورت ميتراج حقيقي.",
      descriptionFr: "Assemblez vos talents, et laissez l'IA réaliser votre court métrage.",
      illustration: <RealisateurIllustration />,
      tag: "مخرج • إنتاج • ذكاء اصطناعي",
      route: "/court-metrage/pricing",
    },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      {/* Back button */}
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        ← رجوع
      </button>

      <div style={styles.header}>
        <div style={styles.headerLine} />
        <span style={styles.headerText}>كورت ميتراج × ذكاء اصطناعي</span>
        <div style={styles.headerLine} />
      </div>
      <p style={styles.subtitle}>من أنت في هذه القصة؟ — Quel est votre rôle ?</p>

      <div style={styles.cardsContainer}>
        {roles.map((r) => (
          <div
            key={r.id}
            style={{
              ...styles.card,
              ...(hovered === r.id ? styles.cardHovered : {}),
            }}
            onClick={() => navigate(r.route)}
            onMouseEnter={() => setHovered(r.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <span style={styles.tag}>{r.tag}</span>
            <div style={styles.illustrationWrap}>{r.illustration}</div>
            <h2 style={styles.titleAr}>{r.titleAr}</h2>
            <h3 style={styles.titleFr}>{r.titleFr}</h3>
            <div style={styles.divider} />
            <p style={styles.descAr}>{r.description}</p>
            <p style={styles.descFr}>{r.descriptionFr}</p>
            <button
              style={{
                ...styles.btn,
                ...(hovered === r.id ? styles.btnHovered : {}),
              }}
            >
              هذا أنا &rarr;
            </button>
            <div style={{ ...styles.glowBorder, opacity: hovered === r.id ? 1 : 0 }} />
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
  backBtn: {
    position: "absolute", top: "28px", left: "28px",
    background: "transparent", border: "1px solid rgba(201,168,76,0.25)",
    color: "#C9A84C", fontSize: "12px", fontFamily: "sans-serif",
    padding: "8px 18px", borderRadius: "20px", cursor: "pointer",
    letterSpacing: "1px", direction: "rtl",
    transition: "border-color 0.2s, background 0.2s",
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
    textAlign: "center",
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
    marginBottom: "20px", letterSpacing: "0.5px", direction: "rtl",
    textAlign: "right",
  },
  illustrationWrap: {
    width: "140px", height: "120px", display: "flex",
    alignItems: "center", justifyContent: "center", marginBottom: "24px",
    filter: "drop-shadow(0 4px 16px rgba(201,168,76,0.18))",
  },
  titleAr: {
    color: "#e8d9b0", fontSize: "24px", fontWeight: 700,
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

export default CourtMetrageRoles;