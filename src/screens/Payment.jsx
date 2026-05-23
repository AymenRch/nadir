import { useState } from "react";
import {generateRegistrationCertificate} from "../utils/generateRegistrationCertificate ";
import {sendCertificateEmail} from "../utils/sendEmail";
import { saveArtwork } from "../utils/fileStorage";


const PaymentPage = () => {
  
  const storedData = JSON.parse(localStorage.getItem("registrationData"));

  const [form, setForm] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    email: storedData?.email || "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePayment = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Save artwork to artworks list
      try {
        saveArtwork(storedData);
      } catch (error) {
        console.error("Error saving artwork:", error);
      }
      
      generateRegistrationCertificate(storedData);
      sendCertificateEmail(storedData);
      console.log(storedData);
    }, 3000);
  };

  return (
    <div style={styles.page}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      {!success ? (
        <div style={styles.card}>

          <div style={styles.header}>
            <div style={styles.line} />
            <span style={styles.headerText}>
              إتمام التسجيل والدفع
            </span>
            <div style={styles.line} />
          </div>

          <p style={styles.subtitle}>
            Finaliser l’enregistrement
          </p>


          <div style={styles.summary}>
            <h3 style={styles.summaryTitle}>
              رسوم تسجيل الملكية الفكرية
            </h3>

            <div style={styles.row}>
              <span>تسجيل العمل</span>
              <span>5000 DA</span>
            </div>

            <div style={styles.row}>
              <span>شهادة التسجيل</span>
              <span>مجانية</span>
            </div>

            <div style={styles.divider} />

            <div style={styles.total}>
              <span>الإجمالي</span>
              <span>5000 DA</span>
            </div>
          </div>


          <input
            name="cardName"
            placeholder="اسم حامل البطاقة"
            value={form.cardName}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="cardNumber"
            placeholder="XXXX XXXX XXXX XXXX"
            value={form.cardNumber}
            onChange={handleChange}
            style={styles.input}
          />


          <div style={styles.flex}>
            <input
              name="expiry"
              placeholder="MM/YY"
              value={form.expiry}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="cvv"
              placeholder="CVV"
              value={form.cvv}
              onChange={handleChange}
              style={styles.input}
            />
          </div>


          <button
            disabled={loading}
            onClick={handlePayment}
            style={{
              ...styles.payBtn,
              opacity: loading ? .7 : 1
            }}
          >

            {loading ? (
              <>
                <div style={styles.spinner} />
                معالجة الدفع...
              </>
            ) : (
              <>
                دفع وتسجيل العمل ✦
              </>
            )}

          </button>

        </div>

      ) : (

        <div style={styles.popup}>

          <div style={styles.successIcon}>
            ✦
          </div>

          <h2 style={styles.successTitle}>
            تم تسجيل العمل بنجاح
          </h2>

          <p style={styles.successSub}>
            Votre œuvre a été enregistrée
          </p>


          <div style={styles.divider} />

          <p style={styles.successText}>
            سيتم إرسال شهادة التسجيل الخاصة بك إلى:
          </p>

          <p style={styles.email}>
            {storedData?.email}
          </p>


          <button
            onClick={() => setSuccess(false)}
            style={styles.btn}
          >
            إغلاق
          </button>

        </div>
      )}

    </div>
  );
};


const styles = {

  page: {
    minHeight: "100vh",
    background: "#0d0d1a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    position: "relative",
    overflow: "hidden"
  },

  blob1: {
    position: "fixed",
    width: 400,
    height: 400,
    top: -100,
    left: -100,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(201,168,76,.1), transparent)"
  },

  blob2: {
    position: "fixed",
    width: 350,
    height: 350,
    bottom: -100,
    right: -100,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(42,74,58,.2), transparent)"
  },

  card: {
    background: "linear-gradient(160deg,#141428,#0f1f18)",
    padding: "40px",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "500px",
    border: "1px solid rgba(201,168,76,.2)",
    boxShadow: "0 8px 50px rgba(0,0,0,.5)"
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    justifyContent: "center"
  },

  line: {
    height: 1,
    width: 60,
    background: "#C9A84C"
  },

  headerText: {
    color: "#C9A84C",
    letterSpacing: "2px"
  },

  subtitle: {
    textAlign: "center",
    color: "#a09070"
  },

  summary: {
    marginBottom: 30
  },

  summaryTitle: {
    color: "#e8d9b0"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 12,
    color: "#b0a898"
  },

  total: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    color: "#C9A84C"
  },

  input: {
    width: "100%",
    padding: "15px",
    marginBottom: "16px",
    background: "rgba(255,255,255,.03)",
    border: "1px solid rgba(201,168,76,.2)",
    borderRadius: "10px",
    color: "#fff",
    boxSizing: "border-box"
  },

  flex: {
    display: "flex",
    gap: "10px"
  },

  payBtn: {
    width: "100%",
    padding: "16px",
    background:
      "linear-gradient(135deg, rgba(201,168,76,.2), rgba(201,168,76,.08))",
    border: "1px solid rgba(201,168,76,.4)",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px"
  },

  spinner: {
    width: "18px",
    height: "18px",
    border: "2px solid rgba(255,255,255,.3)",
    borderTop: "2px solid #C9A84C",
    borderRadius: "50%",
    animation: "spin .8s linear infinite"
  },

  popup: {
    background:
      "linear-gradient(160deg,#141428,#0f1f18)",
    padding: "60px",
    borderRadius: "20px",
    textAlign: "center",
    border: "1px solid rgba(201,168,76,.2)",
    maxWidth: "500px"
  },

  successIcon: {
    fontSize: 50,
    color: "#C9A84C"
  },

  successTitle: {
    color: "#e8d9b0"
  },

  successSub: {
    color: "#C9A84C"
  },

  successText: {
    color: "#b0a898"
  },

  email: {
    color: "#C9A84C",
    fontWeight: "bold"
  },

  btn: {
    padding: "12px 30px",
    background: "transparent",
    border: "1px solid rgba(201,168,76,.4)",
    borderRadius: "30px",
    color: "#C9A84C",
    cursor: "pointer",
    marginTop: 20
  },

  divider: {
    height: 1,
    background:
      "linear-gradient(90deg,transparent,rgba(201,168,76,.3),transparent)",
    margin: "20px 0"
  }

};

export default PaymentPage;