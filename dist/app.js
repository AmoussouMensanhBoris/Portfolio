const menuBtn = document.getElementById("menu-btn");
      const mobileMenu = document.getElementById("mobile-menu");

      menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
        mobileMenu.classList.toggle("flex");
      });

      const navLinks = document.querySelectorAll("#mobile-menu a");

      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
        });
      });

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
      
   
