"use strict";
const NICKNAMEDiv = document.getElementsByClassName("NICKNAME")[0];
createExtraField(NICKNAMEDiv, "NICKNAME");
const PHOTODiv = document.getElementsByClassName("PHOTO")[0];
createExtraField(PHOTODiv, "PHOTO");
const KINDSelect = document.getElementById("KIND");
const KINDSInput = document.getElementById("KINDOther");
function createExtraField(element, field) {
    const clone = element.cloneNode(true);
    clone.insertAdjacentHTML("beforeend", `<button type="button" class="remove${field}">-</button>`);
    element.getElementsByClassName(`add${field}`)[0].addEventListener("click", () => extraField(clone, field, element));
    return clone;
}
function extraField(base, field, afterElement) {
    const clone = base.cloneNode(true);
    clone.getElementsByClassName(`add${field}`)[0].addEventListener("click", () => extraField(base, field, clone));
    clone.getElementsByClassName(`remove${field}`)[0].addEventListener("click", () => clone.remove());
    afterElement.after(clone);
}
function commaSeparateValues(elements) {
    return [...elements].map(a => a.getElementsByTagName("input")[0].value).reduce((pre, cur) => pre + "," + cur);
}
KINDSelect.addEventListener("input", () => {
    if (!KINDSelect.value)
        KINDSInput.parentElement.style.display = "block";
    else
        KINDSInput.parentElement.style.display = "none";
});
