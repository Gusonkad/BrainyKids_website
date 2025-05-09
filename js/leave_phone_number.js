// Initialize EmailJS once
emailjs.init("ShcBiXuIWHlhOMFsk");

function sendPhoneNumber() {
    let phoneInput = document.getElementById("phone").value;

    // Validate phone number (simple regex for digits)
    let phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(phoneInput)) {
        alert("Введіть коректний номер телефону!");
        return;
    }

    // Use EmailJS (replace with your service details)
    emailjs.send("service_1lp0glb", "template_fu2ivf8", {
        phone_number: phoneInput
    })
    .then(response => alert("Номер успішно надіслано!"))
    .catch(error => alert("Помилка відправки!"));
}
