const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const intro = document.getElementById("intro");
const lovePage = document.getElementById("lovePage");
const tinyNote = document.getElementById("tinyNote");
const heartsLayer = document.getElementById("floatingHearts");

// Relationship start date: 24 October 2026
const relationshipStart = new Date(2026, 9, 24, 0, 0, 0);

// YES button: reveal the love website
yesBtn.addEventListener("click", () => {
  intro.classList.add("hidden");
  lovePage.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  burstHearts(35);
  startHeartRain();
  updateCounter();

  setInterval(updateCounter, 1000);
});

// NO button: move to another position
function moveNoButton() {
  const margin = 16;

  const maxX = Math.max(
    margin,
    window.innerWidth - noBtn.offsetWidth - margin
  );

  const maxY = Math.max(
    margin,
    window.innerHeight - noBtn.offsetHeight - margin
  );

  noBtn.style.position = "fixed";
  noBtn.style.left =
    `${margin + Math.random() * (maxX - margin)}px`;

  noBtn.style.top =
    `${margin + Math.random() * (maxY - margin)}px`;

  noBtn.style.zIndex = "10";

  tinyNote.textContent = "Hehe, try again! 💗";
}

noBtn.addEventListener("pointerenter", moveNoButton);

noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

// Love counter
function updateCounter() {
  const now = new Date();
  const difference = now - relationshipStart;

  const caption = document.getElementById("counterCaption");

  // If the start date is in the future, show a countdown.
  const time = Math.abs(difference);

  const days = Math.floor(time / 86400000);
  const hours = Math.floor((time % 86400000) / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  document.getElementById("days").textContent = days;

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");

  if (difference < 0) {
    caption.textContent = "Counting down to our special day 💞";
  } else {
    caption.textContent = "Counting our moments together 💞";
  }
}

// Create floating hearts
function createHeart() {
  const heart = document.createElement("span");

  heart.className = "float-heart";

  const symbols = ["♥", "♡", "❤", "✦"];

  heart.textContent =
    symbols[Math.floor(Math.random() * symbols.length)];

  heart.style.left = `${Math.random() * 100}%`;

  heart.style.fontSize =
    `${14 + Math.random() * 24}px`;

  heart.style.animationDuration =
    `${4 + Math.random() * 5}s`;

  heartsLayer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 9500);
}

// Continuous heart animation
function startHeartRain() {
  createHeart();
  setInterval(createHeart, 380);
}

// Heart burst when YES is clicked
function burstHearts(amount) {
  for (let i = 0; i < amount; i++) {
    setTimeout(createHeart, i * 45);
  }
}

// Music player
const loveSong = document.getElementById("loveSong");
const musicBtn = document.getElementById("musicBtn");
const musicStatus = document.getElementById("musicStatus");

musicBtn.addEventListener("click", async () => {
  if (loveSong.paused) {
    try {
      await loveSong.play();

      musicBtn.textContent = "❚❚ Pause our song";
      musicStatus.textContent =
        "Playing just for you, Rama 💗";

    } catch (error) {
      musicStatus.textContent =
        "Please add a valid song.mp3 file to the website folder.";
    }

  } else {
    loveSong.pause();

    musicBtn.textContent = "♫ Play our song";
    musicStatus.textContent =
      "Paused — tap play to continue 💞";
  }
});

loveSong.addEventListener("ended", () => {
  musicBtn.textContent = "♫ Play our song";
});

// Initialize the counter
updateCounter();