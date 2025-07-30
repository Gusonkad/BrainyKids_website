function sendApplication() {
  const gname = document.getElementById("gname").value.trim();
  const gmail = document.getElementById("gmail").value.trim();
  const cname = document.getElementById("cname").value.trim();
  const cage = document.getElementById("cage").value.trim();
  const cphone = document.getElementById("cphone").value.trim();
  const message = document.getElementById("message").value.trim();

    if (!gname) {
    showAppFeedback("❌ Введіть ПІБ одного з батьків", "error");
    return;
    } else {
    const hasDigitsPattern = /\d/;
    if (hasDigitsPattern.test(gname)) {
        showAppFeedback("❌ ПІБ одного з батьків не повинно містити цифр", "error");
        return;
    }
    }

    if (!gmail) {
    showAppFeedback("❌ Введіть email одного з батьків", "error");
    return;
    } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(gmail)) {
        showAppFeedback("❌ Невірний формат email", "error");
        return;
    }
    }

    if (!cname) {
    showAppFeedback("❌ Введіть ПІБ дитини", "error");
    return;
    } else {
    const hasDigitsPattern = /\d/;
    if (hasDigitsPattern.test(cname)) {
        showAppFeedback("❌ ПІБ дитини не повинно містити цифр", "error");
        return;
    }
    }

  if (!cage) {
    showAppFeedback("❌ Введіть вік дитини", "error");
    return;
  } else if (!/^\d{1,2}$/.test(cage)) {
    showAppFeedback("❌ Вік дитини має бути числом", "error");
    return;
  }

  if (!cphone) {
    showAppFeedback("❌ Введіть вік дитини", "error");
    return;
  } else if (!/^\+?\d{9,15}$/.test(cphone)) {
    showAppFeedback("❌ Неправильний формат номера телефону.", "error");
    return;
  }

  if (message.length > 1000) {
    showAppFeedback("❌ Повідомлення не може містити більше ніж 1000 символів", "error");
    return;
  }

fetch("/php/send_application.php", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ gname, gmail, cname, cage, cphone, message }),
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
      document.getElementById("application-form").reset();
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
  const feedback = document.getElementById("application-feedback");
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
  const feedback = document.getElementById("application-feedback");
  if (!feedback) return;

  feedback.style.opacity = "0";
  feedback.style.pointerEvents = "none";
  setTimeout(() => {
    feedback.style.display = "none";
  }, 3000);
}
