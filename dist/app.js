const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  mobileMenu.classList.toggle("flex");
});

const navLinks = document.querySelectorAll("#mobile-menu a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("flex");
    mobileMenu.classList.add("hidden");
  });
});

document.addEventListener("click", (e) => {
  if (
    !mobileMenu.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    mobileMenu.classList.remove("flex");
    mobileMenu.classList.add("hidden");
  }
});

//description dynamique
const mission = "I build modern web applications.";
const text =
  " I'm a computer science student passionate about clean code, distributed \n systems, and artificial intelligence.";
let i = 0;
function ecriture(id, phrase, fin, i = 0) {
  if (i < phrase.length) {
    document.getElementById(id).textContent += phrase[i];

    setTimeout(() => {
      ecriture(id, phrase, fin, i + 1);
    }, 40);
  } else {
    if (fin) {
      fin();
    }
  }
}
ecriture("mission", mission, () => {
  ecriture("statutPro", text);
});

// cartes en 3D
const cartes = document.querySelectorAll(".cartes");
cartes.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = (x - centerX) / 40;
    const rotateX = (centerY - y) / 40;

    card.style.transform = `
          perspective(1000px)
          scale(1.03)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
        `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `
          perspective(1000px)
          scale(1)
          rotateX(0deg)
          rotateY(0deg)
        `;
  });
});

//scrollpsy

let sections = document.querySelectorAll("section");
let links = document.querySelectorAll(".link");
window.addEventListener("scroll", () => {
  let courant = "";
  sections.forEach((section) => {
    let position = section.offsetTop;
    let taille = section.offsetHeight;
    if (!section.id) {
      return;
    }
    if (
      window.scrollY >= position - 150 &&
      window.scrollY < position + taille - 150
    ) {
      courant = section.id;
      console.log(courant);
    }
  });

  links.forEach((link) => {
    link.classList.remove("text-green-400", "font-bold");

    if (link.getAttribute("href") === `#${courant}`) {
      link.classList.add("text-green-400", "font-bold");
    }
  });
});

//recuperation des elements
const contactForm = document.getElementById("contact_form");
const sendBtn = document.getElementById("sendBtn");
const feedback = document.getElementById("feedBack");
//implementation du EmailJS

emailjs.init({
  publicKey: "pTO6OerZPGBEjC5Q9",
});
//ecoute d'envoi
if (contactForm) {
    contactForm.addEventListener("submit", envoyerEmail);
}

//fonction principale
function envoyerEmail(e) {
  // Empêcher le rechargement
  e.preventDefault();

  // Désactivation du bouton envoyer
  sendBtn.disabled = true;

  sendBtn.textContent = "Sending...";

  feedback.textContent = "";

  // Envoi à EmailJS
  emailjs
    .sendForm(
      "service_b5k73bx",

      "template_6wkwc6j",

      contactForm,
    )

    // Succès
    .then(() => {
    feedback.classList.remove("text-red-500");
    feedback.classList.add("text-green-400");

    feedback.textContent = "✅ Message sent successfully.";

    contactForm.reset();
})

    // Erreur
    .catch((error) => {
    feedback.classList.remove("text-green-400");
    feedback.classList.add("text-red-500");

    feedback.textContent = "❌ Error while sending.";

    console.error(error);
})

    // Dans tous les cas
    .finally(() => {
      sendBtn.disabled = false;

      sendBtn.textContent = "Send Message";
    });
}
