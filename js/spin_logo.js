const logo = document.querySelector('.logo-icon');

logo.addEventListener('mouseenter', (event) => {
  const rect = logo.getBoundingClientRect();
  const mouseX = event.clientX;
  const centerX = rect.left + rect.width / 2;

  // Remove any previous animation classes
  logo.classList.remove('jump-spin-right', 'jump-spin-left');

  if (mouseX < centerX) {
    // Mouse entered from left side — spin left
    logo.classList.add('jump-spin-left');
  } else {
    // Mouse entered from right side — spin right
    logo.classList.add('jump-spin-right');
  }
});

logo.addEventListener('animationend', () => {
  // Remove classes after animation ends so it can trigger again next hover
  logo.classList.remove('jump-spin-right', 'jump-spin-left');
});