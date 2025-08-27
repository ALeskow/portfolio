const toggleTheme = document.getElementById("toggleTheme");
const rootHtml = document.documentElement;
const accordionHeaders = document.querySelectorAll(".accordion__header");
const menuLinks = document.querySelectorAll(".menu__link");

const savedTheme = localStorage.getItem("data-theme");
if (savedTheme) {
  rootHtml.setAttribute("data-theme", savedTheme);
  if (savedTheme === "dark") {
    toggleTheme.classList.add("bi-moon-stars");
    toggleTheme.classList.remove("bi-sun");
  } else {
    toggleTheme.classList.add("bi-sun");
    toggleTheme.classList.remove("bi-moon-stars");
  }
}

function changeTheme() {
  const currentTheme = rootHtml.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  rootHtml.setAttribute("data-theme", newTheme);
  localStorage.setItem("data-theme", newTheme);
  toggleTheme.classList.toggle("bi-sun");
  toggleTheme.classList.toggle("bi-moon-stars");
}

toggleTheme.addEventListener("click", changeTheme);

accordionHeaders.forEach(header => {
  header.addEventListener("click", () => {
    const accordionItem = header.parentElement;
    const accordionActive = accordionItem.classList.contains("active");

    accordionActive ? accordionItem.classList.remove("active") : accordionItem.classList.add("active");
  })
})

menuLinks.forEach(item => {
  item.addEventListener("click", () => {
    menuLinks.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
})

fetch('assets/data/sections.json')
  .then(response => response.json())
  .then(data => {
    document.getElementById('brand').innerHTML = `<a href="#home">${data.header.brand}</a>`;

    const mainMenu = document.getElementById('main-menu');
    mainMenu.innerHTML = data.header.menu.map(item => `<li class="menu__item"><a class="menu__link" href="${item.href}"><span class="menu__text">${item.text}</span></a></li>`).join('');

    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.innerHTML = data.header.menu.map((item, i) => `<li class="menu__item"><a class="menu__link${i === 0 ? ' active' : ''}" href="${item.href}"><span class="menu__text">${item.text}</span></a></li>`).join('');

    document.getElementById('main-content1').innerHTML = `
      <p>${data.main.subtitle}</p>
      <ul class="menu menu--social">
        ${data.main.social.map(s => `<li><a class="menu__link" href="${s.href}" target="_blank"><i class="menu__icon bi ${s.icon}"></i></a></li>`).join('')}
      </ul>
      <a href="#projetos"><button class="btn btn--primary"><span>Ver Projetos</span><i class="bi bi-arrow-down-right"></i></button></a>
    `;
    document.getElementById('main-content2').innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/wDchsz8nmbo?si=kBp1yT-tzXM1hh9E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;

    document.getElementById('technologies-list').innerHTML = data.technologies.map(t => `<li class="technologies__item"><img class="technologies__logo" src="${t.logo}" alt="Logo ${t.name}"></li>`).join('');

    document.getElementById('projects-container').innerHTML = data.projects.map(p => `
      <div class="projects__card">
        <img class="card__cover" src="${p.cover}" alt="Capa ${p.title}">
        <div class="card__body">
          <h3 class="card__title">${p.title}</h3>
          <p class="card__description">${p.description}</p>
          <ul class="card__list">${p.features.map(f => `<li class="${f.class}">${f.text}</li>`).join('')}</ul>
          <ul class="technologies__list">${p.technologies.map(t => {
            const tech = data.technologies.find(tech => tech.name === t);
            return `<li class="technologies__item"><img class="technologies__logo" src="${tech.logo}" alt="Logo ${tech.name}"></li>`;
          }).join('')}</ul>
          <div class="card__buttons">
            <a href="${p.preview}" target="_blank" class="btn btn--primary"><span>Prévia</span><i class="bi bi-arrow-up-right"></i></a>
            <a href="${p.repo}" target="_blank" class="btn"><span>Repositório</span></a>
          </div>
        </div>
      </div>
    `).join('') + `<a href="https://github.com/ALeskow" target="_blank"><button class="btn btn--primary"><span>Ver Todos os Projetos</span><i class="bi bi-arrow-up-right"></i></button></a>`;

    document.getElementById('about-content1').innerHTML = `
      <img class="about__photo" src="${data.about.photo}" alt="">
      <div class="about__description">
        <p>${data.about.description}</p>
        <div class="about__icons"><i class="bi bi-translate"></i><span>${data.about.languages}</span></div>
        <div class="description__buttons">
          <a href="${data.about.linkedin}" target="_blank"><button class="btn btn--primary"><span>Conecte-se Comigo</span><i class="bi bi-arrow-up-right"></i></button></a>
          <a href="${data.about.curriculo}"><button class="btn"><span>Currículo</span></button></a>
        </div>
      </div>
    `;
    document.getElementById('about-education').innerHTML = `
      <h4>${data.about.education.course}</h4>
      <span>${data.about.education.period}</span>
      <div class="about__icons"><i class="bi bi-bank"></i><span>${data.about.education.university}</span></div>
    `;
    document.getElementById('about-experiences').innerHTML = `
      <h3>Experiências</h3>
      <h4>${data.about.experiences[0]}</h4>
      <span>${data.about.experiences[1]}</span>
      <span>${data.about.experiences[2]}</span>
      <ul class="about__list">${data.about.experiences.map(e => `<li class="about__item">${e}</li>`).join('')}</ul>
    `;
    document.getElementById('about-courses').innerHTML = `
      <div id="accordion">
        ${data.about.courses.map((c, i) => `
          <div class="accordion__item${i === 0 ? ' active' : ''}">
            <button class="accordion__header${i === 0 ? ' start' : i === data.about.courses.length - 1 ? ' end' : ''}"><span>${c.title}</span><i class="bi bi-caret-down-fill"></i></button>
        <div class="accordion__body${i === data.about.courses.length - 1 ? ' end' : ''}">
          <p>${c.details}</p>
          <p>${c.description}</p>
          <ul class="course-topics-list">
            ${c.topics ? c.topics.map(topic => `<li class="course-topic">${topic.text}</li>`).join('') : ''}
          </ul>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    const accordionHeaders = document.querySelectorAll(".accordion__header");
accordionHeaders.forEach(header => {
  header.addEventListener("click", () => {
    const accordionItem = header.parentElement;
    const accordionActive = accordionItem.classList.contains("active");
    if (accordionActive) {
      accordionItem.classList.remove("active");
    } else {
      accordionItem.classList.add("active");
    }
  });
});

    document.getElementById('contact-content').innerHTML = `
      <h2>${data.contact.title}</h2>
      <p>${data.contact.description}</p>
      <ul class="menu menu--social">
        ${data.contact.social.map(s => `<li><a class="menu__link" href="${s.href}" target="_blank"><i class="menu__icon bi ${s.icon}"></i><span>${s.text}</span></a></li>`).join('')}
      </ul>
      <a href="mailto:${data.contact.email}"><button class="btn btn--primary"><span class="email">${data.contact.email}</span></button></a>
    `;

    document.getElementById('footer-content').innerHTML = `
      <p>${data.footer.text.replace('Digital Innovation One', `<a href='${data.footer.dio}' target='_blank'>Digital Innovation One</a>`).replace('Ana Leskow', `<a href='${data.footer.github}' target='_blank'>Ana Leskow</a>`)}</p>
    `;
  });