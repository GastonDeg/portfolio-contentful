/* ===========================================
   CONFIGURACIÓN CONTENTFUL
=========================================== */

const SPACE_ID = "kwxup1ckc3r8";

const ACCESS_TOKEN = "IpO1PAMuO7Z06pf-LpM7ezXXRIXq5SrZdMvthprmfEo";

const CONTENT_TYPE = "work";

/* ===========================================
   ELEMENTOS
=========================================== */

const projectsContainer = document.querySelector(".projects__container");

const header = document.querySelector(".header");

const form = document.querySelector(".contact__form");

/* ===========================================
   LOADER
=========================================== */

projectsContainer.innerHTML = `
<div class="loader">
    Cargando proyectos...
</div>
`;

/* ===========================================
   TRAER PROYECTOS
=========================================== */

async function getProjects() {

    try {

        const response = await fetch(

            `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=${CONTENT_TYPE}`

        );

        const data = await response.json();

        console.log(data);

        renderProjects(data);

    }

    catch(error){

        console.error(error);

        projectsContainer.innerHTML = `

            <h2>

                No se pudieron cargar los proyectos.

            </h2>

        `;

    }

}

/* ===========================================
   CREAR TARJETAS
=========================================== */

function renderProjects(data){

    projectsContainer.innerHTML = "";

    const assets = data.includes.Asset;

    data.items.forEach(project=>{

        const title = project.fields.title;

        const description = project.fields.description;

        const url = project.fields.url;

        const imageID = project.fields.image.sys.id;

        const image = assets.find(asset=>asset.sys.id===imageID);

        const imageURL = "https:" + image.fields.file.url;

        const card = document.createElement("article");

        card.classList.add("project-card","fade");

        card.innerHTML = `

            <div class="project-card__image">

                <img src="${imageURL}" alt="${title}">

            </div>

            <div class="project-card__body">

                <h3>${title}</h3>

                <p>${description}</p>

                <a href="${url}"

                   target="_blank"

                   class="project-card__button">

                    Ver proyecto →

                </a>

            </div>

        `;

        projectsContainer.appendChild(card);

    });

    activateAnimations();

}

/* ===========================================
   ANIMACIONES AL HACER SCROLL
=========================================== */

function activateAnimations() {

    const elements = document.querySelectorAll(".fade");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.15
    });

    elements.forEach(element => {

        observer.observe(element);

    });

}

/* ===========================================
   HEADER STICKY
=========================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.style.background = "rgba(15,23,42,.95)";

        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

    } else {

        header.style.background = "rgba(15,23,42,.75)";

        header.style.boxShadow = "none";

    }

});

/* ===========================================
   SCROLL SUAVE DEL MENÚ
=========================================== */

const menuLinks = document.querySelectorAll(".nav a");

menuLinks.forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const id = this.getAttribute("href");

        const section = document.querySelector(id);

        section.scrollIntoView({

            behavior: "smooth"

        });

    });

});

/* ===========================================
   VALIDACIÓN DEL FORMULARIO
=========================================== */

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.querySelector("#name").value.trim();

    const email = document.querySelector("#email").value.trim();

    const message = document.querySelector("#message").value.trim();

    if (!name || !email || !message) {

        alert("Por favor completa todos los campos.");

        return;

    }

    console.log({

        nombre: name,

        email: email,

        mensaje: message

    });

    alert("¡Gracias por tu mensaje!");

    form.reset();

});

/* ===========================================
   BOTÓN VOLVER ARRIBA
=========================================== */

const backTop = document.createElement("button");

backTop.innerHTML = "↑";

backTop.classList.add("back-top");

document.body.appendChild(backTop);

backTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});

/* ===========================================
   INICIALIZACIÓN
=========================================== */

getProjects();