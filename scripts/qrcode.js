"use strict";
const generateButton = document.getElementById("generate");
var vCard;
const qrCode = new QRCode(document.getElementById("QRcode"), {});
function updateQRCode() {
    const fields = {
        N: {
            prefix: document.getElementById("NPrefix").value,
            first: document.getElementById("NFirst").value,
            middle: document.getElementById("NMiddle").value,
            last: document.getElementById("NLast").value,
            suffix: document.getElementById("NSuffix").value,
        },
        NICKNAME: commaSeparateValues(document.getElementsByClassName("NICKNAME")),
        BDAY: document.getElementById("BDAY").value,
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
    if (fields.PHOTO)
        vCard += `PHOTO:${fields.PHOTO}\n`;
    vCard += "END:VCARD";
    qrCode.makeCode(vCard);
}
updateQRCode();
generateButton.addEventListener("click", () => {
    updateQRCode();
});
