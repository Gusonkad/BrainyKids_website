function sendContactForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

    if (!name) {
    showAppFeedback("❌ Введіть своє ім'я", "error");
    return;
    } else {
    const hasDigitsPattern = /\d/;
    if (hasDigitsPattern.test(name)) {
      showAppFeedback("❌ Ім'я не повинно містити цифр", "error");
      return;
    }
    }

    if (!email) {
    showAppFeedback("❌ Введіть email", "error");
    return;
    } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showAppFeedback("❌ Невірний формат email", "error");
        return;
    }
    }

    if (!subject) {
    showAppFeedback("❌ Введіть тему звернення", "error");
    return;
    } else {
    if (subject.length > 50) {
      showAppFeedback("❌ Тема не може містити більше ніж 50 символів", "error");
      return;
    }
    }

  if (message.length > 1000) {
    showAppFeedback("❌ Повідомлення не може містити більше ніж 1000 символів", "error");
    return;
  }

fetch("/php/send_contact_form.php", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, subject, message }),
})
  .then((res) => {
    // console.log("HTTP статус:", res.status);
    // console.log("Обʼєкт відповіді:", res);
    return res.json();
  })
  .then((data) => {
    // console.log("Відповідь сервера:", data);

    if (data.success) {
      showAppFeedback(`✅ ${data.message}`, "success");
      document.getElementById("contact-form").reset();
    } else {
      showAppFeedback(`❌ ${data.error || "Щось пішло не так"}`, "error");
    }
  })
  .catch((error) => {
    console.error("Помилка fetch:", error);
    showAppFeedback("⚠️ Помилка з'єднання з сервером.", "error");
  });
}

function showAppFeedback(message, type) {
  const feedback = document.getElementById("contact-feedback");
  if (!feedback) return;

  feedback.textContent = message;
  feedback.style.backgroundColor = type === "error" ? "#dc3545" : "#198754";
  feedback.style.display = "block";
  requestAnimationFrame(() => (feedback.style.opacity = "1"));
  feedback.style.pointerEvents = "auto";

  clearTimeout(feedback._timer);
  if (feedback._clickHandler) {
    document.removeEventListener("click", feedback._clickHandler);
  }

  setTimeout(() => {
    feedback._clickHandler = (e) => {
      if (!feedback.contains(e.target)) {
        hideAppFeedback();
        document.removeEventListener("click", feedback._clickHandler);
      }
    };
    document.addEventListener("click", feedback._clickHandler);
  }, 600);

  feedback._timer = setTimeout(() => {
    hideAppFeedback();
    if (feedback._clickHandler) {
      document.removeEventListener("click", feedback._clickHandler);
    }
  }, 6000);
}

function hideAppFeedback() {
  const feedback = document.getElementById("contact-feedback");
  if (!feedback) return;

  feedback.style.opacity = "0";
  feedback.style.pointerEvents = "none";
  setTimeout(() => {
    feedback.style.display = "none";
  }, 3000);
}
