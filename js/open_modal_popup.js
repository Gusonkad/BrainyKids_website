document.getElementById("socialModal").addEventListener("click", function () {
    var modal = new bootstrap.Modal(document.getElementById("socialModalPopup"));
    modal.show();
});
document.getElementById("programPopupBtn").addEventListener("click", function () {
    var modal = new bootstrap.Modal(document.getElementById("programPopup"));
    modal.show();
});