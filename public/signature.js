/** @format */
var saveButton = document.getElementById("signature_submit");
var cancelButton = document.getElementById("clear");
var sigimg = document.getElementById("sigimg");

const signatureArea = document.querySelector("#signature-pad");
const clearButton = document.querySelector("#clear_container");

var signaturePad = new SignaturePad(document.getElementById("signature-pad"), {
    backgroundColor: "rgba(255, 255, 255, 0)",
    penColor: "rgb(169, 169, 169)",
});

saveButton.addEventListener("click", function () {
    sigimg.value = signaturePad.toDataURL("image/png");
});

cancelButton.addEventListener("click", function () {
    signaturePad.clear();
    clearButton.style.display = "none";
});

signatureArea.addEventListener("mouseenter", () => {
    clearButton.style.display = "block";
});
