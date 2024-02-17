/**
 * Navigation through steps
 */

export const navigateToFormStep = (stepNumber) => {

    document.querySelectorAll(".form-step").forEach((formStepElement) => {
        formStepElement.classList.add("d-none");
    });

    document.querySelector("#step-" + stepNumber).classList.remove("d-none");
};


// non submit on enter on field
let val = document.getElementsByClassName("n-submit");
for (let i of val) {
    i.onkeydown = function (key) {
        var btn = 0 || key.keyCode || key.charCode;
        if (btn == 13) {
            key.preventDefault();
            i.blur();
        }
    }
}
