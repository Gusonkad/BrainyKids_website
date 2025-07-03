let images = document.querySelectorAll("img.footer-galery-item")
let srcList = Array.from(images).map(img => img.src);

let currentIndex = 0;

function openModal(index) {
    currentIndex = index;
    document.getElementById("fullImage").src = srcList[currentIndex];
    document.getElementById("footerImageModal").style.display = "block";
}

function closeModal() {
    document.getElementById("footerImageModal").style.display = "none";
}

function prevImage() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : srcList.length - 1;
    document.getElementById("fullImage").src = srcList[currentIndex];
}

function nextImage() {
    currentIndex = (currentIndex < srcList.length - 1) ? currentIndex + 1 : 0;
    document.getElementById("fullImage").src = srcList[currentIndex];
}

// Add swipes
let startX = 0;
let endX = 0;

const modal = document.getElementById("footerImageModal");

modal.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

modal.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const threshold = 50;
  const diff = startX - endX;

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      nextImage();
    } else {
      prevImage();
    }
  }
}
