const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

const sectionLinks = document.querySelectorAll("[data-section-link]");
const sections = document.querySelectorAll("[data-section]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    sectionLinks.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.sectionLink === visible.target.dataset.section);
    });
  },
  { rootMargin: "-35% 0px -45% 0px", threshold: [0.15, 0.35, 0.6] }
);

sections.forEach((section) => sectionObserver.observe(section));

const characterData = {
  luka: {
    color: "#f28b38",
    image: "assets/characters/luka-full.png",
    alt: "Luka full-body character art",
    role: "Energetic Beginner",
    name: "Luka",
    quote: "Wait... I can read that now? That is actually awesome.",
    description:
      "A curious beginner who jumps into new places before he feels ready. Luka gives learners a familiar starting point: excited, imperfect, and brave enough to try.",
    facts: [
      ["Role", "The Adventurer"],
      ["Height", "178 cm"],
      ["Likes", "Travel, ramen, anime culture, useful slang"],
      ["Not a fan of", "Dry memorization and standing still too long"],
    ],
    compass: [
      ["Curiosity", 5],
      ["Speaking Courage", 5],
      ["Action", 5],
      ["Mistake Recovery", 4],
      ["Japanese Level", 1],
    ],
  },
  philia: {
    color: "#78b9b4",
    image: "assets/characters/philia-full.png",
    alt: "Philia full-body character art",
    role: "Soft Observer",
    name: "Philia",
    quote: "This character has such a gentle shape... I can almost hear it.",
    description:
      "A sensitive learner who notices atmosphere, sound, color, and feeling. Philia helps turn Japanese from symbols on a page into something learners can sense.",
    facts: [
      ["Role", "The Observer"],
      ["Height", "156 cm"],
      ["Likes", "Japanese colors, fashion, food, quiet places"],
      ["Not a fan of", "Harsh words and overly noisy rooms"],
    ],
    compass: [
      ["Listening Sense", 5],
      ["Aesthetic Sense", 5],
      ["Observation", 5],
      ["Focus", 4],
      ["Word Sensitivity", 5],
    ],
  },
  kotoha: {
    color: "#c9963c",
    image: "assets/characters/kotoha-full.png",
    alt: "Kotoha-sensei full-body character art",
    role: "Native Guide",
    name: "Kotoha-sensei",
    quote: "Words are travelers too. They carry history in very small shapes.",
    description:
      "A tiny white fox teacher with native Japanese insight and a warm margin-note voice. Kotoha-sensei keeps the journey clear, gentle, and culturally grounded.",
    facts: [
      ["Role", "The Guide of Words"],
      ["Height", "78 cm"],
      ["Likes", "Tea, wagashi, word history, bright learner moments"],
      ["Pronouns", "he / him"],
    ],
    compass: [
      ["Native Insight", 5],
      ["Teaching Skill", 5],
      ["Cultural Notes", 5],
      ["Encouragement", 4],
      ["Mystery", 5],
    ],
  },
};

const maxPoints = [
  [110, 18],
  [197.5, 81.4],
  [164.1, 183.6],
  [55.9, 183.6],
  [22.5, 81.4],
];
const center = [110, 110];

function compassPoints(values) {
  return values
    .map(([, value], index) => {
      const [x, y] = maxPoints[index];
      const ratio = value / 5;
      return [
        center[0] + (x - center[0]) * ratio,
        center[1] + (y - center[1]) * ratio,
      ]
        .map((point) => Number(point.toFixed(1)))
        .join(",");
    })
    .join(" ");
}

function setCharacter(key) {
  const data = characterData[key];
  const consoleEl = document.querySelector(".character-console");
  if (!data || !consoleEl) return;

  consoleEl.dataset.activeCharacter = key;
  consoleEl.style.setProperty("--character-color", data.color);

  document.querySelectorAll(".character-tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.character === key);
  });

  const image = consoleEl.querySelector(".profile-image");
  image.src = data.image;
  image.alt = data.alt;

  consoleEl.querySelector(".profile-role").textContent = data.role;
  consoleEl.querySelector(".profile-name").textContent = data.name;
  consoleEl.querySelector(".profile-quote").textContent = data.quote;
  consoleEl.querySelector(".profile-description").textContent = data.description;

  consoleEl.querySelector(".profile-facts").innerHTML = data.facts
    .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
    .join("");

  consoleEl.querySelector(".compass-values").innerHTML = data.compass
    .map(([label, value]) => `<li><span>${label}</span><b>${value}</b></li>`)
    .join("");

  consoleEl.querySelector(".radar-fill").setAttribute("points", compassPoints(data.compass));
  consoleEl.querySelector(".radar-chart").setAttribute("aria-label", `${data.name} learning compass chart`);
}

document.querySelectorAll(".character-tab").forEach((tab) => {
  tab.addEventListener("click", () => setCharacter(tab.dataset.character));
});

setCharacter("luka");

const dailySamples = [
  {
    label: "N5 Word",
    word: "たべる",
    reading: "taberu",
    meaning: "to eat",
    japanese: "あさごはんを たべます。",
    english: "I eat breakfast.",
    note: "In casual speech, you'll often hear たべる. In polite speech, use たべます.",
    question: "What does たべる mean?",
    options: ["A. to eat", "B. to go", "C. to read"],
    answer: 0,
    result: "Correct. たべる means \"to eat.\"",
  },
  {
    label: "Useful Phrase",
    word: "きをつけて",
    reading: "ki o tsukete",
    meaning: "take care / be careful",
    japanese: "かえるとき、きをつけて。",
    english: "Be careful on your way home.",
    note: "This phrase is warm and practical. You can use it when someone is leaving or traveling.",
    question: "When would you use きをつけて?",
    options: ["A. When someone leaves", "B. When ordering food", "C. When counting money"],
    answer: 0,
    result: "Correct. きをつけて is often used when someone is leaving or traveling.",
  },
  {
    label: "Culture Word",
    word: "おし",
    reading: "oshi",
    meaning: "favorite character / person you support",
    japanese: "わたしのおしは このキャラです。",
    english: "My favorite character is this one.",
    note: "おし is common in anime, idol, game, and fandom spaces. It carries a feeling of support, not just liking.",
    question: "What does おし usually refer to?",
    options: ["A. A favorite character or person", "B. A train ticket", "C. A cold drink"],
    answer: 0,
    result: "Correct. おし is someone or something you strongly support as a fan.",
  },
];

function setDailySample(index) {
  const sample = dailySamples[index];
  if (!sample) return;

  document.querySelector(".daily-level").textContent = sample.label;
  document.querySelector(".daily-word").textContent = sample.word;
  document.querySelector(".daily-reading").textContent = sample.reading;
  document.querySelector(".daily-meaning").textContent = sample.meaning;
  document.querySelector(".daily-japanese").textContent = sample.japanese;
  document.querySelector(".daily-english").textContent = sample.english;
  document.querySelector(".kotoha-note p").textContent = sample.note;
  document.querySelector(".quiz-question").textContent = sample.question;
  document.querySelector(".quiz-result").textContent = "Choose an answer to check your understanding.";

  document.querySelector(".quiz-options").innerHTML = sample.options
    .map((option, optionIndex) => `<button type="button" data-option="${optionIndex}">${option}</button>`)
    .join("");

  document.querySelectorAll(".daily-switcher button").forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.dailyIndex) === index);
  });

  document.querySelectorAll(".quiz-options button").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = Number(button.dataset.option);
      document.querySelectorAll(".quiz-options button").forEach((optionButton) => {
        optionButton.classList.remove("is-correct", "is-wrong");
      });
      button.classList.add(selected === sample.answer ? "is-correct" : "is-wrong");
      document
        .querySelector(`.quiz-options button[data-option="${sample.answer}"]`)
        ?.classList.add("is-correct");
      document.querySelector(".quiz-result").textContent =
        selected === sample.answer ? sample.result : `Not quite. ${sample.result}`;
    });
  });
}

document.querySelectorAll(".daily-switcher button").forEach((button) => {
  button.addEventListener("click", () => setDailySample(Number(button.dataset.dailyIndex)));
});

setDailySample(0);
