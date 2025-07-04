function sendPhoneNumber() {
  const phoneInput = document.getElementById("phone");
  const phone = phoneInput.value.trim();

  // Remove formatting chars
  const cleaned = phone.replace(/[\s\-()]/g, '');
  const valid = /^\+?\d{9,15}$/.test(cleaned);

  if (!valid) {
    showFeedback("❌ Неправильний формат номера.", "error");
    return;
  }

  fetch("/php/send_phone_number.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone })
  })
  .then(res => res.json())
  .then(data => {
    if (data.message) {
      showFeedback(`✅ ${data.message}`, "success");
      phoneInput.value = "";
    } else if (data.error) {
      showFeedback(`❌ ${data.error}`, "error");
    } else {
      showFeedback("⚠️ Неочікувана відповідь сервера.", "error");
    }
  })
  .catch(() => {
    showFeedback("⚠️ Не вдалося відправити. Спробуйте пізніше.", "error");
  });
}

function showFeedback(message, type) {
  const feedback = document.getElementById("feedback");

  feedback.textContent = message;
  feedback.style.backgroundColor = (type === "error") ? "#dc3545" : "#198754";
  feedback.style.display = "block";
  requestAnimationFrame(() => {
    feedback.style.opacity = "1";
    feedback.style.pointerEvents = "auto";
  });

  clearTimeout(feedback._hideTimer);
  if (feedback._clickHandler) {
    document.removeEventListener("click", feedback._clickHandler);
  }

  feedback._clickHandler = (e) => {
    if (!feedback.contains(e.target)) {
      hideFeedback();
    }
  };
  document.addEventListener("click", feedback._clickHandler);

  feedback._hideTimer = setTimeout(() => {
    hideFeedback();
    document.removeEventListener("click", feedback._clickHandler);
  }, 5000);
}

function hideFeedback() {
  const feedback = document.getElementById("feedback");
  feedback.style.opacity = "0";
  feedback.style.pointerEvents = "none";

  setTimeout(() => {
    feedback.style.display = "none";
  }, 5000);
}