import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MAX_ACTORS = 3;
const MAX_MUSIC = 1;
const MAX_SCENARIOS = 1;

const actors = [
  {
    id: 1,
    name: "Yanis B.",
    image: "https://tse1.mm.bing.net/th/id/OIP.yn3KB_SljMxXaRSM9wgiLwHaLS?r=0&cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3",
    cv: "https://example.com/cv1.pdf",
  },
  {
    id: 2,
    name: "Sara K.",
    image: "https://i.pinimg.com/originals/11/7a/6c/117a6ca28b85e3757cf84c81f35de1cb.webp",
    cv: "https://example.com/cv2.pdf",
  },
  {
    id: 3,
    name: "Omar Z.",
    image: "https://img.freepik.com/premium-photo/professional-photoshoot-pose-male-stock-image-portrait-paris-high-res-free-jpg_883241-10961.jpg?w=2000",
    cv: "https://example.com/cv3.pdf",
  },
  {
    id: 4,
    name: "Lina M.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    cv: "https://example.com/cv4.pdf",
  },
  {
    id: 5,
    name: "Youssef A.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    cv: "https://example.com/cv5.pdf",
  },
  {
    id: 6,
    name: "Nora S.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    cv: "https://example.com/cv6.pdf",
  },
  {
    id: 7,
    name: "Karim D.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    cv: "https://example.com/cv7.pdf",
  },
  {
    id: 8,
    name: "Amel H.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    cv: "https://example.com/cv8.pdf",
  },
  {
    id: 9,
    name: "Rami F.",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
    cv: "https://example.com/cv9.pdf",
  },
  {
    id: 10,
    name: "Ines B.",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c",
    cv: "https://example.com/cv10.pdf",
  },
];

const music = [
  { id: 1, title: "Cinematic Ambient", file: "https://example.com/music1.mp3", duration: "3:42" },
  { id: 2, title: "Dark Piano Score", file: "https://example.com/music2.mp3", duration: "2:58" },
];

const scenarios = [
  { id: 1, title: "Love & Loss", file: "https://example.com/scenario1.pdf", genre: "Drame romantique" },
  { id: 2, title: "Cyber Future", file: "https://example.com/scenario2.pdf", genre: "Science-fiction" },
];

// Dot indicator component
const DotIndicator = ({ filled, total }) => (
  <div style={styles.dots}>
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        style={{
          ...styles.dot,
          background: i < filled ? "#C9A84C" : "transparent",
        }}
      />
    ))}
  </div>
);

// Section header with limit badge
const SectionHeader = ({ title, current, max }) => {
  const full = current >= max;
  return (
    <div style={styles.sectionHeader}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <div style={styles.limitRow}>
        <DotIndicator filled={current} total={max} />
        <span
          style={{
            ...styles.badge,
            background: full
              ? "rgba(201,168,76,0.15)"
              : "rgba(255,255,255,0.05)",
            color: full ? "#C9A84C" : "#a09070",
            border: `1px solid ${full ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.1)"}`,
          }}
        >
          {current} / {max}
        </span>
      </div>
    </div>
  );
};

const RealisateurStudio = () => {
  const navigate = useNavigate();
  const [selectedActors, setSelectedActors] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);

  const toggleActor = (id) => {
    setSelectedActors((prev) => {
      if (prev.includes(id)) return prev.filter((a) => a !== id);
      if (prev.length >= MAX_ACTORS) return prev;
      return [...prev, id];
    });
  };

  const toggleMusic = (id) =>
    setSelectedMusic((prev) => (prev === id ? null : id));

  const toggleScenario = (id) =>
    setSelectedScenario((prev) => (prev === id ? null : id));

  const canGenerate =
    selectedActors.length > 0 && selectedMusic !== null && selectedScenario !== null;

  return (
    <div style={styles.page}>
      {/* Ambient blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        ← Retour
      </button>

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroDivider} />
        <h1 style={styles.title}>Studio du Réalisateur</h1>
        <div style={styles.heroDivider} />
      </div>
      <p style={styles.subtitle}>
        Choisissez vos acteurs, musiques et scénarios pour construire votre court métrage
      </p>

      {/* ── ACTORS ── */}
      <SectionHeader title="Acteurs" current={selectedActors.length} max={MAX_ACTORS} />
      <div style={styles.grid}>
        {actors.map((a) => {
          const isSelected = selectedActors.includes(a.id);
          const isDisabled = !isSelected && selectedActors.length >= MAX_ACTORS;
          return (
            <div
              key={a.id}
              onClick={() => !isDisabled && toggleActor(a.id)}
              style={{
                ...styles.actorCard,
                borderColor: isSelected
                  ? "#C9A84C"
                  : "rgba(201,168,76,0.15)",
                borderWidth: isSelected ? "2px" : "1px",
                opacity: isDisabled ? 0.4 : 1,
                cursor: isDisabled ? "not-allowed" : "pointer",
                background: isSelected
                  ? "linear-gradient(160deg,#1a1a32,#112219)"
                  : "linear-gradient(160deg,#141428,#0f1f18)",
              }}
            >
              {isSelected && <div style={styles.selectedCheck}>✦</div>}
              <img src={a.image} alt={a.name} style={styles.actorImg} />
              <h3 style={styles.cardTitle}>{a.name}</h3>
              <a
                href={a.cv}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={styles.link}
              >
                Voir CV ↗
              </a>
            </div>
          );
        })}
      </div>

      {/* ── MUSIC ── */}
      <SectionHeader title="Musique" current={selectedMusic !== null ? 1 : 0} max={MAX_MUSIC} />
      <div style={styles.grid}>
        {music.map((m) => {
          const isSelected = selectedMusic === m.id;
          return (
            <div
              key={m.id}
              onClick={() => toggleMusic(m.id)}
              style={{
                ...styles.simpleCard,
                borderColor: isSelected ? "#C9A84C" : "rgba(201,168,76,0.15)",
                borderWidth: isSelected ? "2px" : "1px",
                background: isSelected
                  ? "linear-gradient(160deg,#1a1a32,#112219)"
                  : "#141428",
              }}
            >
              {isSelected && <div style={styles.selectedCheck}>✦</div>}
              <div style={styles.musicIcon}>♪</div>
              <p style={styles.cardTitle}>{m.title}</p>
              <p style={styles.cardSub}>{m.duration}</p>
              <a
                href={m.file}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={styles.link}
              >
                Écouter ↗
              </a>
            </div>
          );
        })}
      </div>

      {/* ── SCENARIOS ── */}
      <SectionHeader
        title="Scénarios"
        current={selectedScenario !== null ? 1 : 0}
        max={MAX_SCENARIOS}
      />
      <div style={styles.grid}>
        {scenarios.map((s) => {
          const isSelected = selectedScenario === s.id;
          return (
            <div
              key={s.id}
              onClick={() => toggleScenario(s.id)}
              style={{
                ...styles.simpleCard,
                borderColor: isSelected ? "#C9A84C" : "rgba(201,168,76,0.15)",
                borderWidth: isSelected ? "2px" : "1px",
                background: isSelected
                  ? "linear-gradient(160deg,#1a1a32,#112219)"
                  : "#141428",
              }}
            >
              {isSelected && <div style={styles.selectedCheck}>✦</div>}
              <div style={styles.musicIcon}>📄</div>
              <p style={styles.cardTitle}>{s.title}</p>
              <p style={styles.cardSub}>{s.genre}</p>
              <a
                href={s.file}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={styles.link}
              >
                Ouvrir ↗
              </a>
            </div>
          );
        })}
      </div>

      {/* ── SUMMARY ── */}
      {canGenerate && (
        <div style={styles.summary}>
          <div style={styles.summaryDivider} />
          <p style={styles.summaryLabel}>Votre sélection</p>
          <div style={styles.summaryRow}>
            <span style={styles.summaryKey}>Acteurs</span>
            <span style={styles.summaryVal}>
              {actors
                .filter((a) => selectedActors.includes(a.id))
                .map((a) => a.name)
                .join(", ")}
            </span>
          </div>
          <div style={styles.summaryRow}>
            <span style={styles.summaryKey}>Musique</span>
            <span style={styles.summaryVal}>
              {music.find((m) => m.id === selectedMusic)?.title}
            </span>
          </div>
          <div style={styles.summaryRow}>
            <span style={styles.summaryKey}>Scénario</span>
            <span style={styles.summaryVal}>
              {scenarios.find((s) => s.id === selectedScenario)?.title}
            </span>
          </div>
          <div style={styles.summaryDivider} />
        </div>
      )}

      {/* ── CTA ── */}
      <button
        disabled={!canGenerate}
        style={{
          ...styles.cta,
          opacity: canGenerate ? 1 : 0.35,
          cursor: canGenerate ? "pointer" : "not-allowed",
        }}
      >
        {canGenerate ? "Générer mon court métrage ✦" : "Complétez votre sélection"}
      </button>

      {!canGenerate && (
        <p style={styles.hint}>
          {selectedActors.length === 0 && "· Choisissez au moins un acteur  "}
          {selectedMusic === null && "· Choisissez une musique  "}
          {selectedScenario === null && "· Choisissez un scénario"}
        </p>
      )}
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0d0d1a",
    color: "#e8d9b0",
    padding: "80px 24px 60px",
    fontFamily: "'Georgia', serif",
    position: "relative",
    overflow: "hidden",
    margin: "0 auto",
  },
  blob1: {
    position: "fixed",
    width: 400,
    height: 400,
    top: -100,
    left: -100,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(201,168,76,.08), transparent)",
    pointerEvents: "none",
  },
  blob2: {
    position: "fixed",
    width: 350,
    height: 350,
    bottom: -100,
    right: -100,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(42,74,58,.15), transparent)",
    pointerEvents: "none",
  },
  backBtn: {
    position: "fixed",
    top: 20,
    left: 20,
    background: "transparent",
    border: "1px solid rgba(201,168,76,0.3)",
    color: "#C9A84C",
    padding: "8px 16px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "13px",
    zIndex: 10,
  },
  hero: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    justifyContent: "center",
    marginBottom: 12,
  },
  heroDivider: {
    height: 1,
    width: 50,
    background: "#C9A84C",
  },
  title: {
    textAlign: "center",
    fontSize: "26px",
    color: "#C9A84C",
    letterSpacing: "2px",
    margin: 0,
  },
  subtitle: {
    textAlign: "center",
    fontSize: "13px",
    color: "#a09070",
    marginBottom: "40px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "36px",
    marginBottom: "14px",
  },
  sectionTitle: {
    color: "#C9A84C",
    fontSize: "16px",
    letterSpacing: "1px",
    margin: 0,
  },
  limitRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  dots: {
    display: "flex",
    gap: 5,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: "50%",
    border: "1.5px solid #C9A84C",
  },
  badge: {
    fontSize: "11px",
    padding: "2px 10px",
    borderRadius: "20px",
    fontFamily: "monospace",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "14px",
  },
  actorCard: {
    position: "relative",
    width: "150px",
    padding: "18px 14px",
    borderRadius: "16px",
    border: "1px solid rgba(201,168,76,0.15)",
    textAlign: "center",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
  },
  actorImg: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    objectFit: "cover",
    display: "block",
    margin: "0 auto 10px",
    border: "1px solid rgba(201,168,76,0.2)",
  },
  simpleCard: {
    position: "relative",
    width: "200px",
    padding: "18px 16px",
    borderRadius: "14px",
    border: "1px solid rgba(201,168,76,0.15)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
  },
  musicIcon: {
    fontSize: "22px",
    marginBottom: "8px",
    color: "#C9A84C",
  },
  cardTitle: {
    fontSize: "13px",
    fontWeight: "bold",
    color: "#e8d9b0",
    margin: "0 0 4px",
  },
  cardSub: {
    fontSize: "11px",
    color: "#a09070",
    margin: "0 0 8px",
  },
  link: {
    display: "inline-block",
    fontSize: "11px",
    color: "#C9A84C",
    textDecoration: "none",
  },
  selectedCheck: {
    position: "absolute",
    top: 8,
    right: 10,
    color: "#C9A84C",
    fontSize: "12px",
  },
  summary: {
    marginTop: "36px",
  },
  summaryDivider: {
    height: 1,
    background: "linear-gradient(90deg,transparent,rgba(201,168,76,.3),transparent)",
    margin: "16px 0",
  },
  summaryLabel: {
    fontSize: "11px",
    letterSpacing: "2px",
    color: "#a09070",
    textTransform: "uppercase",
    marginBottom: "12px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    fontSize: "13px",
  },
  summaryKey: {
    color: "#a09070",
  },
  summaryVal: {
    color: "#e8d9b0",
    textAlign: "right",
  },
  cta: {
    marginTop: "28px",
    display: "block",
    width: "100%",
    padding: "14px 28px",
    borderRadius: "12px",
    border: "1px solid rgba(201,168,76,0.4)",
    background: "linear-gradient(135deg, rgba(201,168,76,.12), rgba(201,168,76,.04))",
    color: "#C9A84C",
    fontSize: "15px",
    letterSpacing: "1px",
    transition: "opacity 0.2s",
  },
  hint: {
    textAlign: "center",
    fontSize: "11px",
    color: "#a09070",
    marginTop: "12px",
    letterSpacing: "0.5px",
  },
};

export default RealisateurStudio;