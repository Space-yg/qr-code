// import type { } from "./index.d.ts"

// ELements
/** The generate button */
const generateButton = <HTMLButtonElement> document.getElementById("generate")!
/** The vCard as a string */
var vCard: string
/** The QR code */
const qrCode = new QRCode(document.getElementById("QRcode")!, {})

/** Update the QR code */
function updateQRCode(): void {
	/** All fields in the vCard */
	const fields: vCardFields = {
		N: {
			prefix: (<HTMLInputElement> document.getElementById("NPrefix")).value,
			first: (<HTMLInputElement> document.getElementById("NFirst")).value,
			middle: (<HTMLInputElement> document.getElementById("NMiddle")).value,
			last: (<HTMLInputElement> document.getElementById("NLast")).value,
			suffix: (<HTMLInputElement> document.getElementById("NSuffix")).value,
		},
		NICKNAME: commaSeparateValues(document.getElementsByClassName("NICKNAME")),
		BDAY: (<HTMLInputElement> document.getElementById("BDAY")).value,
		PHOTO: commaSeparateValues(document.getElementsByClassName("PHOTO")),
		KIND: (((<HTMLSelectElement> document.getElementById("KIND")).value ?? `x-${(<HTMLInputElement> document.getElementById("KINDOther")).value}`) as KINDField),
	}

	vCard = `
	BEGIN:VCARD
	VERSION:4.0
	N:${fields.N.last};${fields.N.first};${fields.N.middle};${fields.N.prefix};${fields.N.suffix}
	FN:${fields.N.prefix ? fields.N.prefix + " " : ""}${fields.N.first ? fields.N.first + " " : ""}${fields.N.middle ? fields.N.middle + " " : ""}${fields.N.last ? fields.N.last + " " : ""}${fields.N.suffix}
	KIND:${fields.KIND}
	`

	//// Additional fields
	if (fields.NICKNAME) vCard += `NICKNAME:${fields.NICKNAME}\n`
	if (fields.PHOTO) vCard += `PHOTO:${fields.PHOTO}\n`

	vCard += "END:VCARD"
	qrCode.makeCode(vCard)
}
updateQRCode()

// Update the QR code on click of the button
generateButton.addEventListener("click", () => {
	updateQRCode()
})