//// vCard fields' ELements
// NICKNAME
const NICKNAMEDiv = (<HTMLCollectionOf<HTMLDivElement>> document.getElementsByClassName("NICKNAME"))[0]
createExtraField(NICKNAMEDiv, "NICKNAME")
// PHOTO
const PHOTODiv = (<HTMLCollectionOf<HTMLDivElement>> document.getElementsByClassName("PHOTO"))[0]
createExtraField(PHOTODiv, "PHOTO")
// KIND
const KINDSelect = <HTMLSelectElement> document.getElementById("KIND")
const KINDSInput = <HTMLInputElement> document.getElementById("KINDOther")
// const BDAY = 

/**
 * Create an extra field from an existing field
 * @param element The element to clone
 * @param field The name of the field
 * @returns The newly created extra field
 */
function createExtraField<T extends HTMLElement>(element: T, field: string): T {
	const clone = <T> element.cloneNode(true)
	clone.insertAdjacentHTML("beforeend", `<button type="button" class="remove${field}">-</button>`);
	(<HTMLCollectionOf<HTMLButtonElement>> element.getElementsByClassName(`add${field}`))[0].addEventListener("click", () => extraField(clone, field, element))
	return clone
}

/**
 * Add an extra field of the same type of another field after an element
 * @param base The element to copy
 * @param afterElement The element to add this nickname after
 */
function extraField(base: HTMLElement, field: string, afterElement: HTMLElement): void {
	const clone = <HTMLElement> base.cloneNode(true)
	clone.getElementsByClassName(`add${field}`)[0].addEventListener("click", () => extraField(base, field, clone))
	clone.getElementsByClassName(`remove${field}`)[0].addEventListener("click", () => clone.remove())
	afterElement.after(clone)
}

/**
 * Separate input values in a collection of HTML elements by commas
 * @param elements The elements to get their input values
 * @returns A comma separated values
 */
function commaSeparateValues(elements: HTMLCollectionOf<Element>): string {
	return [...(<HTMLCollectionOf<HTMLDivElement>> elements)].map(a => a.getElementsByTagName("input")[0].value).reduce((pre, cur) => pre + "," + cur)
}

// vCard fields' eLements events
KINDSelect.addEventListener("input", () => {
	if (!KINDSelect.value) KINDSInput.parentElement!.style.display = "block"
	else KINDSInput.parentElement!.style.display = "none"
})