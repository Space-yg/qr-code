"use strict";
const NICKNAMEDiv = document.getElementsByClassName("NICKNAME")[0];
createExtraField(NICKNAMEDiv, "NICKNAME");
const PHOTODiv = document.getElementsByClassName("PHOTO")[0];
createExtraField(PHOTODiv, "PHOTO");
const KINDSelect = document.getElementById("KIND");
const KINDSInput = document.getElementById("KINDOther");
const BDAYSelect = document.getElementById("BDAYType");
const BDAYDate = document.getElementById("BDAYDate");
const BDAYDateTime = document.getElementById("BDAYDateTime");
const BDAYTime = document.getElementById("BDAYTime");
const ANNIVERSARYSelect = document.getElementById("ANNIVERSARYType");
const ANNIVERSARYDate = document.getElementById("ANNIVERSARYDate");
const ANNIVERSARYDateTime = document.getElementById("ANNIVERSARYDateTime");
const ANNIVERSARYTime = document.getElementById("ANNIVERSARYTime");
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
BDAYSelect.addEventListener("input", () => {
    BDAYDate.parentElement.style.display = "none";
    BDAYDateTime.parentElement.style.display = "none";
    BDAYTime.parentElement.style.display = "none";
    if (BDAYSelect.value === "Date")
        BDAYDate.parentElement.style.display = "";
    else if (BDAYSelect.value === "DateTime")
        BDAYDateTime.parentElement.style.display = "";
    else if (BDAYSelect.value === "Time")
        BDAYTime.parentElement.style.display = "";
});
ANNIVERSARYSelect.addEventListener("input", () => {
    ANNIVERSARYDate.parentElement.style.display = "none";
    ANNIVERSARYDateTime.parentElement.style.display = "none";
    ANNIVERSARYTime.parentElement.style.display = "none";
    if (ANNIVERSARYSelect.value === "Date")
        ANNIVERSARYDate.parentElement.style.display = "";
    else if (ANNIVERSARYSelect.value === "DateTime")
        ANNIVERSARYDateTime.parentElement.style.display = "";
    else if (ANNIVERSARYSelect.value === "Time")
        ANNIVERSARYTime.parentElement.style.display = "";
});
