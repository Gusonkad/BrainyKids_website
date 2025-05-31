// Function to initialize classes modals
function setupClassesModal(buttonId, modalId) {
    document.getElementById(buttonId).addEventListener("click", function () {
        new bootstrap.Modal(document.getElementById(modalId)).show();
    });
}

// Set up modals dynamically
const classesmodalMappings = [
    { button: "oneYearProgramPopupBtn", modal: "oneYearProgramPopup" },
    { button: "twoYearProgramPopupBtn", modal: "twoYearProgramPopup" },
    { button: "threeMonthProgramPopupBtn", modal: "threeMonthProgramPopup" },
    { button: "englishProgramPopupBtn", modal: "englishProgramPopup" },
    { button: "eideticsProgramPopupBtn", modal: "eideticsProgramPopup" },
    { button: "speechTherapistProgramPopupBtn", modal: "speechTherapistProgramPopup" },
    { button: "handwritingProgramPopupBtn", modal: "handwritingProgramPopup" },
    { button: "speedReadingProgramPopupBtn", modal: "speedReadingProgramPopup" },
    { button: "multiplicationProgramPopupBtn", modal: "multiplicationProgramPopup" }
];

classesmodalMappings.forEach(({ button, modal }) => setupClassesModal(button, modal));