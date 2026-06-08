import jsPDF from "jspdf";

const gold = [201, 168, 76];

export const generateRegistrationCertificate = (data) => {

    const doc =
        new jsPDF();


    doc.setFillColor(
        13, 13, 26
    );

    doc.rect(
        0, 0,
        210, 297,
        "F"
    );



    doc.setDrawColor(
        ...gold
    );

    doc.rect(
        10,
        10,
        190,
        277
    );



    doc.setFontSize(
        24
    );

    doc.setTextColor(
        ...gold
    );

    doc.text(
        "registeration receipt",
        105,
        40,
        {
            align: "center"
        }
    );



    doc.setFontSize(
        14
    );

    doc.setTextColor(
        255,
        255,
        255
    );



    doc.text(
        `الاسم:
${data.name}`,
        20,
        80
    );



    doc.text(
        `عنوان العمل:
${data.workTitle}`,
        20,
        100
    );



    doc.text(
        `المهنة:
${data.profession}`,
        20,
        120
    );



    doc.text(
        `رقم التسجيل:
REG-${Date.now()}`,
        20,
        140
    );



    doc.text(
        `التاريخ:
${new Date().toLocaleDateString()}`,
        20,
        160
    );



    doc.setFontSize(
        12
    );


    doc.text(

        "هذه الوثيقة تثبت استلام الطلب فقط",

        20,

        200

    );



    doc.text(

        "وليست شهادة ملكية فكرية نهائية",

        20,

        210

    );



    doc.text(

        "ختم إلكتروني",

        150,

        250

    );



    doc.save(

        `registration-${data.name}.pdf`

    );

};






export const generateOwnershipCertificate = (data) => {


    const doc =
        new jsPDF();



    doc.setFillColor(
        13, 13, 26
    );

    doc.rect(
        0,
        0,
        210,
        297,
        "F"
    );



    doc.setDrawColor(
        ...gold
    );

    doc.rect(
        10,
        10,
        190,
        277
    );



    doc.setTextColor(
        ...gold
    );


    doc.setFontSize(
        28
    );


    doc.text(

        "شهادة ملكية فكرية",

        105,

        40,

        {
            align: "center"
        }

    );



    doc.setTextColor(
        255,
        255,
        255
    );



    doc.setFontSize(
        15
    );



    doc.text(

        `تشهد المنصة أن:

${data.name}

هو المالك الشرعي للعمل:

"${data.workTitle}"`,

        20,

        90

    );



    doc.text(

        `نوع العمل:
${data.profession}`,

        20,

        150

    );



    doc.text(

        `رقم الشهادة:

IP-${Date.now()}`,

        20,

        180

    );



    doc.text(

        `تاريخ الاعتماد:

${new Date().toLocaleDateString()}`,

        20,

        210

    );



    doc.text(

        "الإدارة المختصة",

        140,

        250

    );



    doc.save(

        `ownership-${data.name}.pdf`

    );


};