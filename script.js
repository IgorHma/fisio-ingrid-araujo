/**
 * ============================================================================
 * CONFIGURAÇÃO CENTRAL DO SITE - INGRID ARAÚJO (FISIOTERAPIA PÉLVICA)
 * ============================================================================
 * Altere qualquer informação abaixo e o site será atualizado automaticamente.
 */
const CONFIG = {
  nome: "Ingrid Araújo",
  especialidade: "Fisioterapia Pélvica",
  crefito: "CREFITO 350769-F",
  cidade: "João Pessoa/PB",
  whatsapp: "5581996449249", // Somente números com DDI (55) + DDD
  instagramUsuario: "@fisioingridaraujo",
  instagramUrl: "https://www.instagram.com/fisioingridaraujo/",
  endereco: "R. Antônio Rabelo Júnior, 170 - Miramar, João Pessoa - PB, 58032-090 · Sala 1202 (12º andar)",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=R.+Ant%C3%B4nio+Rabelo+J%C3%BAnior,+170+-+Miramar,+Jo%C3%A3o+Pessoa+-+PB,+58032-090",
  horarioAtendimento: "Segunda a Sexta · Com hora marcada",
  corPrincipal: "#721F32", // Bordô principal (combinado com Rosa Chá no CSS)
  fotoHero: "assets/ingrid.jpg",
  fotoSobre: "assets/ingrid.jpg", // Se tiver uma 2ª foto, basta salvar em assets/ e mudar aqui!
  mensagemPadraoWhatsApp: "Olá, Ingrid! Vim pelo seu site e gostaria de agendar uma avaliação de fisioterapia pélvica."
};

(function () {
  // 1. Aplica cor personalizada se configurada
  if (CONFIG.corPrincipal && /^#[0-9a-fA-F]{6}$/.test(CONFIG.corPrincipal)) {
    document.documentElement.style.setProperty("--accent", CONFIG.corPrincipal);
  }

  // 2. Formata telefone para exibição: (81) 99644-9249
  function formatarTelefone(digitos) {
    const d = (digitos || "").replace(/\D/g, "");
    if (d.length === 13) return `(${d.slice(2, 4)}) ${d.slice(4, 9)}-${d.slice(9)}`;
    if (d.length === 12) return `(${d.slice(2, 4)}) ${d.slice(4, 8)}-${d.slice(8)}`;
    if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    return digitos;
  }

  function gerarLinkWhatsApp(mensagemCustomizada) {
    const digitos = (CONFIG.whatsapp || "").replace(/\D/g, "");
    const texto = mensagemCustomizada || CONFIG.mensagemPadraoWhatsApp;
    return `https://wa.me/${digitos}?text=${encodeURIComponent(texto)}`;
  }

  // 3. Atualiza elementos com data-attributes
  document.querySelectorAll("[data-nome]").forEach((el) => {
    el.textContent = CONFIG.nome;
  });

  document.querySelectorAll("[data-especialidade]").forEach((el) => {
    el.textContent = CONFIG.especialidade;
  });

  document.querySelectorAll("[data-cidade]").forEach((el) => {
    el.textContent = CONFIG.cidade;
  });

  document.querySelectorAll("[data-crefito]").forEach((el) => {
    if (CONFIG.crefito) {
      el.textContent = CONFIG.crefito;
      el.style.display = "";
    } else {
      el.style.display = "none";
    }
  });

  document.querySelectorAll("[data-endereco]").forEach((el) => {
    el.textContent = CONFIG.endereco;
  });

  document.querySelectorAll("[data-horario]").forEach((el) => {
    el.textContent = CONFIG.horarioAtendimento;
  });

  // Fotos
  const imgHero = document.getElementById("imgHero");
  if (imgHero && CONFIG.fotoHero) imgHero.src = CONFIG.fotoHero;

  const imgSobre = document.getElementById("imgSobre");
  if (imgSobre && CONFIG.fotoSobre) imgSobre.src = CONFIG.fotoSobre;

  // Links de WhatsApp
  const linkWaPadrao = gerarLinkWhatsApp();
  document.querySelectorAll("[data-wa]").forEach((el) => {
    const assunto = el.getAttribute("data-wa-assunto");
    if (assunto) {
      el.href = gerarLinkWhatsApp(
        `Olá, ${CONFIG.nome}! Vim pelo seu site e gostaria de saber mais sobre o tratamento para *${assunto}*.`
      );
    } else {
      el.href = linkWaPadrao;
    }
    el.target = "_blank";
    el.rel = "noopener";
  });

  document.querySelectorAll("[data-wa-numero]").forEach((el) => {
    el.textContent = formatarTelefone(CONFIG.whatsapp);
  });

  // Links de Instagram
  document.querySelectorAll("[data-ig]").forEach((el) => {
    el.href = CONFIG.instagramUrl || "#";
    el.target = "_blank";
    el.rel = "noopener";
  });

  document.querySelectorAll("[data-ig-user]").forEach((el) => {
    el.textContent = CONFIG.instagramUsuario;
  });

  // Links de Google Maps
  document.querySelectorAll("[data-maps]").forEach((el) => {
    el.href = CONFIG.mapsUrl || "#";
    el.target = "_blank";
    el.rel = "noopener";
  });

  // Ano atual no rodapé
  const anoEl = document.getElementById("anoAtual");
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  // 4. Menu Mobile
  const menuBtn = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 5. Sombra no Header ao rolar a página
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 6. Accordion de Perguntas Frequentes (FAQ)
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!btn || !answer) return;

    btn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Fecha outros abertos
      document.querySelectorAll(".faq-item.active").forEach((openItem) => {
        openItem.classList.remove("active");
        const openAnswer = openItem.querySelector(".faq-answer");
        if (openAnswer) openAnswer.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // 7. Formulário inteligente que envia para o WhatsApp
  const waForm = document.getElementById("waForm");
  if (waForm) {
    waForm.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const nomePaciente = (document.getElementById("f-nome")?.value || "").trim();
      const modalidade = (document.getElementById("f-modalidade")?.value || "").trim();
      const mensagem = (document.getElementById("f-msg")?.value || "").trim();

      if (!nomePaciente || !mensagem) {
        alert("Por favor, preencha seu nome e conte brevemente como posso te ajudar.");
        return;
      }

      const linhas = [
        `Olá, ${CONFIG.nome}! Meu nome é *${nomePaciente}*.`,
        mensagem
      ];
      if (modalidade) {
        linhas.push(`Preferência de atendimento: *${modalidade}*.`);
      }
      linhas.push("Vim pelo seu site e gostaria de agendar uma avaliação.");

      window.open(gerarLinkWhatsApp(linhas.join("\n")), "_blank", "noopener");
    });
  }

  // 8. Animações suaves de entrada (Scroll Reveal)
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }
})();
