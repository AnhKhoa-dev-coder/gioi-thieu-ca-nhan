const element = document.getElementById("typing");

const fullTextRaw =
  "In the future, I want to work at Microsoft\nthat is my biggest dream, and I always strive every day to reach that dream.";
const halfway = Math.floor(fullTextRaw.length / 2);

const typingSpeed = 60;
const pauseTime = 3000;

let charIndex = 0;
let isDeleting = false;

function buildGradientText(rawText) {
  let html = "";
  for (let i = 0; i < rawText.length; i++) {
    const char = rawText[i];
    if (char === "\n") {
      html += "<br>";
    } else {
      html += `<span>${char}</span>`;
    }
  }
  return `<span class="gradient-text">${html}</span>`;
}

function typeLoop() {
  if (!isDeleting) {
    const currentRaw = fullTextRaw.slice(0, charIndex);
    element.innerHTML = buildGradientText(currentRaw);
    if (charIndex < fullTextRaw.length) {
      charIndex++;
      setTimeout(typeLoop, typingSpeed);
    } else {
      setTimeout(() => {
        isDeleting = true;
        charIndex = fullTextRaw.length;
        deleteHalf();
      }, pauseTime);
    }
  }
}

function deleteHalf() {
  if (charIndex > halfway) {
    charIndex--;
    const currentRaw = fullTextRaw.slice(0, charIndex);
    element.innerHTML = buildGradientText(currentRaw);
    setTimeout(deleteHalf, typingSpeed);
  } else {
    isDeleting = false;
    charIndex = halfway;
    typeLoop();
  }
}

typeLoop();
