"use strict";
const generateButton = document.getElementById("generate");
var vCard;
const qrCode = new QRCode(document.getElementById("QRcode"), {
    correctLevel: QRCode.CorrectLevel.L
});
function updateQRCode() {
    const BDAYDateType = document.getElementById("BDAYType");
    const BDAYDateValue = document.getElementById("BDAY" + BDAYDateType.value).value;
    const ANNIVERSARYDateType = document.getElementById("ANNIVERSARYType");
    const ANNIVERSARYDateValue = document.getElementById("ANNIVERSARY" + ANNIVERSARYDateType.value).value;
    const fields = {
        N: {
            prefix: document.getElementById("NPrefix").value,
            first: document.getElementById("NFirst").value,
            middle: document.getElementById("NMiddle").value,
            last: document.getElementById("NLast").value,
            suffix: document.getElementById("NSuffix").value,
        },
        NICKNAME: commaSeparateValues(document.getElementsByClassName("NICKNAME")),
        GENDER: document.getElementById("GENDER").value,
        BDAY: BDAYDateType.value === "Time" ? "T" + BDAYDateValue.slice(0, 2) + BDAYDateValue.slice(3, 5) : Date.parse(BDAYDateValue).toString(),
        ANNIVERSARY: ANNIVERSARYDateType.value === "Time" ? "T" + ANNIVERSARYDateValue.slice(0, 2) + ANNIVERSARYDateValue.slice(3, 5) : Date.parse(ANNIVERSARYDateValue).toString(),
        PHOTO: commaSeparateValues(document.getElementsByClassName("PHOTO")),
        KIND: (document.getElementById("KIND").value ?? `x-${document.getElementById("KINDOther").value}`),
    };
    vCard = `
	BEGIN:VCARD
	VERSION:4.0
	N:${fields.N.last};${fields.N.first};${fields.N.middle};${fields.N.prefix};${fields.N.suffix}
	FN:${fields.N.prefix ? fields.N.prefix + " " : ""}${fields.N.first ? fields.N.first + " " : ""}${fields.N.middle ? fields.N.middle + " " : ""}${fields.N.last ? fields.N.last + " " : ""}${fields.N.suffix}
	KIND:${fields.KIND}
	`;
    if (fields.NICKNAME)
        vCard += `NICKNAME:${fields.NICKNAME}\n`;
    if (fields.GENDER)
        vCard += `GENDER:${fields.GENDER}\n`;
    if (fields.PHOTO)
        vCard += `PHOTO:${fields.PHOTO}\n`;
    if (fields.BDAY !== "NaN")
        vCard += `BDAY:${fields.BDAY}\n`;
    if (fields.ANNIVERSARY !== "NaN")
        vCard += `ANNIVERSARY:${fields.ANNIVERSARY}\n`;
    vCard += "END:VCARD";
    qrCode.makeCode(vCard);
}
updateQRCode();
generateButton.addEventListener("click", () => {
    updateQRCode();
});
