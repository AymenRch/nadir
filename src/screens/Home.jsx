import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.container}>
        <div style={styles.iconWrapper}>
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: 120, height: 120 }}
          >
            <circle cx="50" cy="50" r="45" stroke="#C9A84C" strokeWidth="2" opacity="0.3" />
            <circle cx="50" cy="50" r="40" fill="#16213e" stroke="#C9A84C" strokeWidth="2" />
            <text x="50" y="60" textAnchor="middle" fontSize="50" fontFamily="serif" fill="#C9A84C" fontWeight="bold">⏱</text>
          </svg>
        </div>

        <h1 style={styles.titleAr}>انتهت فترة التجربة المجانية</h1>
        <h2 style={styles.titleFr}>Votre essai gratuit a expiré</h2>

        <div style={styles.divider} />

        <p style={styles.descAr}>
          لقد انتهت فترة التجربة المجانية الخاصة بك. للمتابعة والاستمتاع بجميع خدماتنا المميزة، يرجى الدفع.
        </p>
        <p style={styles.descFr}>
          Votre période d'essai gratuit a pris fin. Pour continuer à utiliser nos services premium, veuillez payer.
        </p>

        {/*
        <div style={styles.buttonGroup}>
          <button
            style={styles.btn}
            onClick={() => navigate('/pricing')}
            onMouseEnter={(e) => (e.target.style.background = '#A08040')}
            onMouseLeave={(e) => (e.target.style.background = 'transparent')}
          >
            اختر خطة ← Choisir un plan
          </button>

          <button
            style={styles.btnSecondary}
            onClick={() => navigate('/')}
            onMouseEnter={(e) => (e.target.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.target.style.opacity = '0.6')}
          >
            العودة إلى الصفحة الرئيسية ← Retour à l'accueil
          </button>
        </div>
        */}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0d0d1a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
    fontFamily: "'Georgia', 'Times New Roman', serif",
    position: 'relative',
    overflow: 'hidden',
  },
  blob1: {
    position: 'absolute',
    top: '-120px',
    right: '-120px',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(201, 168, 76, 0.15) 0%, transparent 70%)',
    filter: 'blur(40px)',
  },
  blob2: {
    position: 'absolute',
    bottom: '-100px',
    left: '-100px',
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(201, 168, 76, 0.1) 0%, transparent 70%)',
    filter: 'blur(40px)',
  },
  container: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    maxWidth: '600px',
    padding: '60px 40px',
    border: '1px solid rgba(201, 168, 76, 0.3)',
    borderRadius: '12px',
    background: 'rgba(22, 33, 62, 0.4)',
    backdropFilter: 'blur(10px)',
  },
  iconWrapper: {
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'center',
  },
  titleAr: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#C9A84C',
    marginBottom: '10px',
    direction: 'rtl',
    letterSpacing: '1px',
  },
  titleFr: {
    fontSize: '24px',
    fontWeight: '300',
    color: '#C9A84C',
    opacity: '0.8',
    marginBottom: '25px',
    direction: 'ltr',
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)',
    margin: '25px 0',
  },
  descAr: {
    fontSize: '16px',
    color: '#e0e0e0',
    lineHeight: '1.8',
    marginBottom: '15px',
    direction: 'rtl',
  },
  descFr: {
    fontSize: '15px',
    color: '#b0b0b0',
    lineHeight: '1.8',
    marginBottom: '40px',
    direction: 'ltr',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '30px',
  },
  btn: {
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#C9A84C',
    background: 'transparent',
    border: '2px solid #C9A84C',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: "'Georgia', 'Times New Roman', serif",
  },
  btnSecondary: {
    padding: '12px 28px',
    fontSize: '14px',
    color: '#C9A84C',
    background: 'transparent',
    border: '1px solid rgba(201, 168, 76, 0.5)',
    borderRadius: '6px',
    cursor: 'pointer',
    opacity: '0.6',
    transition: 'all 0.3s ease',
    fontFamily: "'Georgia', 'Times New Roman', serif",
  },
};

export default Home;
