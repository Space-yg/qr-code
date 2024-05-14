// ELements
/** The generate button */
const generateButton = <HTMLButtonElement> document.getElementById("generate")!
/** The vCard as a string */
var vCard: string
/** The QR code */
// ?: Add support for correction level? https://www.qrcode.com/en/about/error_correction.html
const qrCode = new QRCode(document.getElementById("QRcode")!, {
	correctLevel: QRCode.CorrectLevel.L
})

/** Update the QR code */
function updateQRCode(): void {
	// BDAY
	const BDAYDateType = <HTMLSelectElement> document.getElementById("BDAYType")
	const BDAYDateValue = (<HTMLInputElement> document.getElementById("BDAY" + BDAYDateType.value)).value
	// ANNIVERSARY
	const ANNIVERSARYDateType = <HTMLSelectElement> document.getElementById("ANNIVERSARYType")
	const ANNIVERSARYDateValue = (<HTMLInputElement> document.getElementById("ANNIVERSARY" + ANNIVERSARYDateType.value)).value

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
		GENDER: (<HTMLSelectElement> document.getElementById("GENDER")).value as GENDERFieldOptions,
		BDAY: BDAYDateType.value === "Time" ? "T" + BDAYDateValue.slice(0, 2) + BDAYDateValue.slice(3, 5) : Date.parse(BDAYDateValue).toString(),
		ANNIVERSARY: ANNIVERSARYDateType.value === "Time" ? "T" + ANNIVERSARYDateValue.slice(0, 2) + ANNIVERSARYDateValue.slice(3, 5) : Date.parse(ANNIVERSARYDateValue).toString(),
		PHOTO: commaSeparateValues(document.getElementsByClassName("PHOTO")),
		KIND: (((<HTMLSelectElement> document.getElementById("KIND")).value ?? `x-${(<HTMLInputElement> document.getElementById("KINDOther")).value}`) as KINDFieldOptions),
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
	if (fields.GENDER) vCard += `GENDER:${fields.GENDER}\n`
	if (fields.PHOTO) vCard += `PHOTO:${fields.PHOTO}\n`
	if (fields.BDAY !== "NaN") vCard += `BDAY:${fields.BDAY}\n`
	if (fields.ANNIVERSARY !== "NaN") vCard += `ANNIVERSARY:${fields.ANNIVERSARY}\n`

	vCard += "END:VCARD"
	qrCode.makeCode(vCard)
}
updateQRCode()

// Update the QR code on click of the button
generateButton.addEventListener("click", () => {
	updateQRCode()
})