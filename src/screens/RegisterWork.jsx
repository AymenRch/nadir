import { useState, useRef } from "react";
import {useNavigate} from "react-router-dom";
import { storeUploadedFile } from "../utils/fileStorage";

const PROFESSIONS = [
  { value: "", labelAr: "اختر مهنتك", labelFr: "Choisir votre profession" },
  { value: "musicien", labelAr: "موسيقي", labelFr: "Musicien" },
  { value: "comedian", labelAr: "ممثل / كوميدي", labelFr: "Comédien" },
  { value: "designer", labelAr: "مصمم", labelFr: "Designer" },
  { value: "senarist", labelAr: "سيناريست", labelFr: "Scénariste" },
  { value: "photographe", labelAr: "مصور فوتوغرافي", labelFr: "Photographe" },
  { value: "peintre", labelAr: "رسام / فنان تشكيلي", labelFr: "Peintre" },
  { value: "ecrivain", labelAr: "كاتب", labelFr: "Écrivain" },
  { value: "realisateur", labelAr: "مخرج", labelFr: "Réalisateur" },
  { value: "autre", labelAr: "أخرى", labelFr: "Autre" },
];

const ALLOWED_TYPES = [
  "audio/mpeg",         
  "video/mp4",          
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
];

const ALLOWED_EXTENSIONS = [".mp3", ".mp4", ".jpg", ".jpeg", ".png", ".gif", ".webp", ".pdf"];

function validate(form) {
  const errors = {};

  if (!form.name.trim()) errors.name = "الاسم الكامل مطلوب";
  else if (form.name.trim().length < 3) errors.name = "الاسم يجب أن يكون 3 أحرف على الأقل";

  if (!form.email.trim()) errors.email = "البريد الإلكتروني مطلوب";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "البريد الإلكتروني غير صالح";

  if (!form.phone.trim()) errors.phone = "رقم الهاتف مطلوب";
  else if (!/^[0-9+\s-]{7,15}$/.test(form.phone)) errors.phone = "رقم الهاتف غير صالح";

  if (!form.profession) errors.profession = "يرجى اختيار مهنتك";

  if (!form.workTitle.trim()) errors.workTitle = "عنوان العمل مطلوب";

  if (!form.file) {
    errors.file = "يرجى رفع ملف العمل الفني";
  } else {
    const ext = "." + form.file.name.split(".").pop().toLowerCase();
    const typeOk = ALLOWED_TYPES.includes(form.file.type);
    const extOk = ALLOWED_EXTENSIONS.includes(ext);
    if (!typeOk && !extOk) {
      errors.file = "صيغة الملف غير مدعومة. المسموح به: MP3, MP4, صورة, PDF";
    } else if (form.file.size > 50 * 1024 * 1024) {
      errors.file = "حجم الملف يجب ألا يتجاوز 50 ميغابايت";
    }
  }

  return errors;
}

const RegisterWork = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", profession: "", workTitle: "", file: null,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFile = (file) => {
    setForm((prev) => ({ ...prev, file }));
    if (errors.file) setErrors((prev) => ({ ...prev, file: undefined }));
  };

  const handleFileInput = (e) => {
    if (e.target.files[0]) handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    
    try {
      // Store the uploaded file and get file path
      const filePath = await storeUploadedFile(form.file);
      
      // Create registration data with file path
      const registrationData = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        profession: form.profession,
        workTitle: form.workTitle,
        filePath: filePath,
        fileName: form.file.name,
        fileSize: form.file.size,
      };
      
      // Save to localStorage
      localStorage.setItem("registrationData", JSON.stringify(registrationData));
      navigate("/Payment");
    } catch (error) {
      setErrors({ file: "خطأ في رفع الملف. يرجى المحاولة مرة أخرى." });
      console.error("File storage error:", error);
    }
  };

  const getFileIcon = () => {
    if (!form.file) return "📎";
    const ext = form.file.name.split(".").pop().toLowerCase();
    if (["mp3"].includes(ext)) return "🎵";
    if (["mp4"].includes(ext)) return "🎬";
    if (["pdf"].includes(ext)) return "📄";
    return "🖼️";
  };

  if (submitted) {
    return (
      <div style={styles.page}>
        <div style={styles.blob1} /><div style={styles.blob2} />
        <div style={styles.successCard}>
          <div style={styles.successIcon}>✦</div>
          <h2 style={styles.successTitle}>تم تسجيل عملك بنجاح</h2>
          <p style={styles.successSub}>Votre œuvre a été enregistrée avec succès</p>
          <div style={styles.divider} />
          <p style={styles.successInfo}>
            سيتم مراجعة طلبك وإرسال تأكيد إلى <span style={{ color: "#C9A84C" }}>{form.email}</span>
          </p>
          <button style={styles.btn} onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", profession: "", workTitle: "", file: null }); }}>
            تسجيل عمل آخر
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.blob1} /><div style={styles.blob2} />

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLine} />
        <span style={styles.headerText}>تسجيل الملكية الفكرية</span>
        <div style={styles.headerLine} />
      </div>
      <p style={styles.subtitle}>Enregistrement de votre propriété intellectuelle</p>

      <div style={styles.formCard}>

        {/* Row 1: Name + Email */}
        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>الاسم الكامل <span style={styles.required}>*</span></label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="أدخل اسمك الكامل"
              style={{ ...styles.input, ...(errors.name ? styles.inputError : {}) }}
            />
            {errors.name && <span style={styles.errorMsg}>{errors.name}</span>}
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>البريد الإلكتروني <span style={styles.required}>*</span></label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@email.com"
              style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }}
            />
            {errors.email && <span style={styles.errorMsg}>{errors.email}</span>}
          </div>
        </div>

        {/* Row 2: Phone + Profession */}
        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>رقم الهاتف <span style={styles.required}>*</span></label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+213 XXX XXX XXX"
              style={{ ...styles.input, ...(errors.phone ? styles.inputError : {}) }}
            />
            {errors.phone && <span style={styles.errorMsg}>{errors.phone}</span>}
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>المهنة <span style={styles.required}>*</span></label>
            <select
              name="profession"
              value={form.profession}
              onChange={handleChange}
              style={{ ...styles.input, ...styles.select, ...(errors.profession ? styles.inputError : {}) }}
            >
              {PROFESSIONS.map((p) => (
                <option key={p.value} value={p.value} disabled={p.value === ""}>
                  {p.labelAr} — {p.labelFr}
                </option>
              ))}
            </select>
            {errors.profession && <span style={styles.errorMsg}>{errors.profession}</span>}
          </div>
        </div>

        {/* Work Title */}
        <div style={styles.fieldGroupFull}>
          <label style={styles.label}>عنوان العمل الفني <span style={styles.required}>*</span></label>
          <input
            name="workTitle"
            value={form.workTitle}
            onChange={handleChange}
            placeholder="أدخل عنوان عملك الفني..."
            style={{ ...styles.input, ...(errors.workTitle ? styles.inputError : {}) }}
          />
          {errors.workTitle && <span style={styles.errorMsg}>{errors.workTitle}</span>}
        </div>

        {/* File Upload */}
        <div style={styles.fieldGroupFull}>
          <label style={styles.label}>رفع العمل الفني <span style={styles.required}>*</span></label>
          <div
            style={{
              ...styles.dropzone,
              ...(dragOver ? styles.dropzoneActive : {}),
              ...(errors.file ? styles.dropzoneError : {}),
              ...(form.file ? styles.dropzoneFilled : {}),
            }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".mp3,.mp4,.jpg,.jpeg,.png,.gif,.webp,.pdf"
              onChange={handleFileInput}
              style={{ display: "none" }}
            />
            {form.file ? (
              <div style={styles.filePreview}>
                <span style={styles.fileIcon}>{getFileIcon()}</span>
                <div>
                  <p style={styles.fileName}>{form.file.name}</p>
                  <p style={styles.fileSize}>{(form.file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button
                  style={styles.removeBtn}
                  onClick={(e) => { e.stopPropagation(); setForm((p) => ({ ...p, file: null })); }}
                >✕</button>
              </div>
            ) : (
              <div style={styles.dropzoneContent}>
                <span style={styles.uploadIcon}>⬆</span>
                <p style={styles.dropzoneText}>اسحب ملفك هنا أو انقر للاختيار</p>
                <p style={styles.dropzoneHint}>MP3 · MP4 · صورة · PDF — الحد الأقصى 50MB</p>
              </div>
            )}
          </div>
          {errors.file && <span style={styles.errorMsg}>{errors.file}</span>}
        </div>

        {/* Divider */}
        <div style={{ ...styles.divider, margin: "8px 0 24px" }} />

        {/* Submit */}
        <button style={styles.submitBtn} onClick={handleSubmit}>
          <span>تسجيل العمل الفني</span>
          <span style={styles.btnArrow}>✦</span>
        </button>
        <p style={styles.formNote}>
          بالنقر على "تسجيل"، أنت توافق على شروط الاستخدام وسياسة الخصوصية
        </p>
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
    justifyContent: "flex-start",
    padding: "60px 24px 80px",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    position: "relative",
    overflow: "hidden",
  },
  blob1: {
    position: "fixed", top: "-120px", left: "-120px",
    width: "420px", height: "420px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  blob2: {
    position: "fixed", bottom: "-100px", right: "-100px",
    width: "380px", height: "380px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(42,74,58,0.22) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  header: {
    display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px",
  },
  headerLine: {
    width: "60px", height: "1px",
    background: "linear-gradient(90deg, transparent, #C9A84C)",
  },
  headerText: {
    color: "#C9A84C", fontSize: "13px", letterSpacing: "4px",
    textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: 600,
  },
  subtitle: {
    color: "#a09070", fontSize: "13px", marginBottom: "40px",
    fontFamily: "sans-serif", letterSpacing: "1px", fontStyle: "italic",
  },
  formCard: {
    width: "100%", maxWidth: "740px",
    background: "linear-gradient(160deg, #141428 0%, #0f1f18 100%)",
    border: "1px solid rgba(201,168,76,0.18)",
    borderRadius: "20px", padding: "48px 40px",
    boxShadow: "0 8px 60px rgba(0,0,0,0.5)",
    position: "relative", zIndex: 1,
  },
  row: {
    display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap",
  },
  fieldGroup: {
    flex: 1, minWidth: "200px", display: "flex", flexDirection: "column", gap: "8px",
  },
  fieldGroupFull: {
    display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px",
  },
  label: {
    color: "#e8d9b0", fontSize: "13px", fontFamily: "sans-serif",
    direction: "rtl", letterSpacing: "0.3px",
  },
  required: { color: "#C9A84C" },
  input: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(201,168,76,0.2)",
    borderRadius: "10px", padding: "13px 16px",
    color: "#e8d9b0", fontSize: "14px", fontFamily: "sans-serif",
    outline: "none", direction: "rtl", width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s, background 0.2s",
  },
  select: {
    cursor: "pointer", appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9A84C' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat", backgroundPosition: "12px center",
    paddingLeft: "36px",
  },
  inputError: {
    border: "1px solid rgba(220,80,80,0.6)",
    background: "rgba(220,80,80,0.05)",
  },
  errorMsg: {
    color: "#e07070", fontSize: "11.5px", fontFamily: "sans-serif",
    direction: "rtl",
  },
  dropzone: {
    border: "2px dashed rgba(201,168,76,0.25)",
    borderRadius: "12px", padding: "32px 20px",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", transition: "all 0.25s ease",
    background: "rgba(255,255,255,0.02)",
    minHeight: "120px",
  },
  dropzoneActive: {
    borderColor: "#C9A84C",
    background: "rgba(201,168,76,0.07)",
  },
  dropzoneError: {
    borderColor: "rgba(220,80,80,0.5)",
    background: "rgba(220,80,80,0.04)",
  },
  dropzoneFilled: {
    borderStyle: "solid",
    borderColor: "rgba(201,168,76,0.4)",
    background: "rgba(201,168,76,0.05)",
  },
  dropzoneContent: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
  },
  uploadIcon: {
    fontSize: "28px", color: "#C9A84C", opacity: 0.7,
  },
  dropzoneText: {
    color: "#b0a898", fontSize: "14px", fontFamily: "sans-serif",
    direction: "rtl", margin: 0,
  },
  dropzoneHint: {
    color: "#5a5a6a", fontSize: "11px", fontFamily: "sans-serif", margin: 0,
    letterSpacing: "0.5px",
  },
  filePreview: {
    display: "flex", alignItems: "center", gap: "16px", width: "100%",
  },
  fileIcon: { fontSize: "32px" },
  fileName: {
    color: "#e8d9b0", fontSize: "13px", fontFamily: "sans-serif",
    margin: 0, direction: "ltr", wordBreak: "break-all",
  },
  fileSize: {
    color: "#6a7a72", fontSize: "11px", fontFamily: "sans-serif",
    margin: "4px 0 0",
  },
  removeBtn: {
    marginLeft: "auto", background: "rgba(220,80,80,0.15)",
    border: "1px solid rgba(220,80,80,0.3)", color: "#e07070",
    borderRadius: "50%", width: "28px", height: "28px",
    cursor: "pointer", fontSize: "12px", display: "flex",
    alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  divider: {
    width: "100%", height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)",
  },
  submitBtn: {
    width: "100%", padding: "16px",
    background: "linear-gradient(135deg, rgba(201,168,76,0.18), rgba(201,168,76,0.08))",
    border: "1px solid rgba(201,168,76,0.5)",
    borderRadius: "12px", color: "#e8d9b0",
    fontSize: "16px", fontFamily: "sans-serif",
    cursor: "pointer", letterSpacing: "2px",
    display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
    direction: "rtl", transition: "all 0.25s ease",
    marginBottom: "16px",
  },
  btnArrow: { color: "#C9A84C", fontSize: "14px" },
  btn: {
    background: "transparent",
    border: "1px solid rgba(201,168,76,0.4)", color: "#C9A84C",
    fontSize: "13px", fontFamily: "sans-serif", padding: "12px 28px",
    borderRadius: "30px", cursor: "pointer", letterSpacing: "1px",
    direction: "rtl", marginTop: "8px",
  },
  formNote: {
    color: "#4a4a5a", fontSize: "11px", fontFamily: "sans-serif",
    textAlign: "center", direction: "rtl", margin: 0,
  },
  successCard: {
    background: "linear-gradient(160deg, #141428 0%, #0f1f18 100%)",
    border: "1px solid rgba(201,168,76,0.25)",
    borderRadius: "20px", padding: "60px 48px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
    maxWidth: "480px", width: "100%",
    boxShadow: "0 8px 60px rgba(0,0,0,0.5)",
    position: "relative", zIndex: 1,
  },
  successIcon: {
    fontSize: "40px", color: "#C9A84C",
    animation: "pulse 2s infinite",
  },
  successTitle: {
    color: "#e8d9b0", fontSize: "22px", fontWeight: 700,
    margin: 0, direction: "rtl", textAlign: "center",
  },
  successSub: {
    color: "#C9A84C", fontSize: "12px", fontFamily: "sans-serif",
    letterSpacing: "2px", margin: 0, fontStyle: "italic",
  },
  successInfo: {
    color: "#b0a898", fontSize: "14px", fontFamily: "sans-serif",
    direction: "rtl", textAlign: "center", lineHeight: "1.8",
  },
};

export default RegisterWork;