// Function to initialize social modals
function setupSocialModal(buttonId, modalId) {
    document.getElementById(buttonId).addEventListener("click", function () {
        new bootstrap.Modal(document.getElementById(modalId)).show();
    });
}

// Set up modals dynamically
const socialModalMappings = [
    { button: "socialModal", modal: "socialModalPopup" }
];

socialModalMappings.forEach(({ button, modal }) => setupSocialModal(button, modal));