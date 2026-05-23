import html2pdf from "html2pdf.js";

export const generateRegistrationCertificate = (data) => {
  const element = document.createElement("div");

  element.style.padding = "40px";
  element.style.fontFamily = "Arial";
  element.style.direction = "rtl";
  element.style.textAlign = "right";

  element.innerHTML = `
    <div style="border:2px solid #C9A84C; padding:30px;">
      
      <h1 style="text-align:center; color:#C9A84C;">
        شهادة تسجيل
      </h1>

      <p><b>الاسم:</b> ${data.name}</p>
      <p><b>المهنة:</b> ${data.profession}</p>
      <p><b>عنوان العمل:</b> ${data.workTitle}</p>
      <p><b>رقم التسجيل:</b> REG-${Date.now()}</p>
      <p><b>التاريخ:</b> ${new Date().toLocaleDateString()}</p>

      <hr />

      <p style="font-size:12px;">
        هذه الوثيقة تثبت استلام الطلب فقط وليست شهادة ملكية نهائية
      </p>

    </div>
  `;

  html2pdf()
    .set({
      margin: 0.5,
      filename: `registration-${data.name}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    })
    .from(element)
    .save();
};