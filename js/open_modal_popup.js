// Function to initialize modals
function setupModal(buttonId, modalId) {
    document.getElementById(buttonId).addEventListener("click", function () {
        new bootstrap.Modal(document.getElementById(modalId)).show();
    });
}

// Set up modals dynamically
const modalMappings = [
    { button: "socialModal", modal: "socialModalPopup" },
    { button: "oneYearProgramPopupBtn", modal: "oneYearProgramPopup" },
    { button: "twoYearProgramPopupBtn", modal: "twoYearProgramPopup" },
    { button: "threeMonthProgramPopupBtn", modal: "threeMonthProgramPopup" },
    { button: "englishProgramPopupBtn", modal: "englishProgramPopup" },
    { button: "eideticsProgramPopupBtn", modal: "eideticsProgramPopup" },
    { button: "speechTherapistProgramPopupBtn", modal: "speechTherapistProgramPopup" }
];

modalMappings.forEach(({ button, modal }) => setupModal(button, modal));