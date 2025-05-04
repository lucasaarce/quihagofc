fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });

fetch("clasificacion.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("clasificacion").innerHTML = data;
    });

fetch("calendario-table.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("calendario-table").innerHTML = data;
    });

function toggleMenu() {
    var menu = document.getElementById("menu-lat");
    var overlay = document.getElementById("overlay");
    var menuBtn = document.getElementById("menuBtn");
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
    if (menu.classList.contains("active")) {
        menuBtn.innerHTML = "&times;";
    } else {
        menuBtn.innerHTML = "&#9776;"; 
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname.split("/").pop(); 
    let links = document.querySelectorAll(".menu-hor a");
    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.style.color = '#ffaf2b'; 
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname.split("/").pop(); 
    let links = document.querySelectorAll(".menu-lat a");
    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.style.color = '#ffaf2b'; 
        }
    });
});


const images = [
    "../assets/images/equipo/equipo0.jpg",
    "../assets/images/equipo/equipo1.jpg",
    "../assets/images/equipo/equipo2.jpg",
    "../assets/images/equipo/equipo3.jpg",
    "../assets/images/equipo/equipo4.jpg",
    "../assets/images/equipo/equipo5.jpg",
    "../assets/images/equipo/equipo6.jpg",
    "../assets/images/equipo/equipo7.jpg",
    "../assets/images/equipo/equipo8.jpg",
    "../assets/images/equipo/equipo9.jpg",
];

let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "flex";
    
    // Agregar evento para cerrar lightbox al hacer clic fuera de la imagen
    lightbox.addEventListener("click", function(event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function changeImage(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    updateLightbox();
}

function updateLightbox() {
    const mainImg = document.getElementById("lightbox-img");
    mainImg.src = images[currentIndex];

    const thumbnails = document.getElementById("lightbox-thumbnails");
    thumbnails.innerHTML = "";
    images.forEach((src, index) => {
        const thumb = document.createElement("img");
        thumb.src = src;
        thumb.classList.add("lightbox__thumbnail");
        if (index === currentIndex) thumb.classList.add("lightbox__thumbnail--active");
        thumb.onclick = () => {
            currentIndex = index;
            updateLightbox();
        };
        thumbnails.appendChild(thumb);
    });
}

document.addEventListener("keydown", function (event) {
    const lightbox = document.getElementById("lightbox");
    if (lightbox.style.display === "flex") {
        if (event.key === "ArrowRight") {
            changeImage(1);
        } else if (event.key === "ArrowLeft") {
            changeImage(-1);
        } else if (event.key === "Escape") {
            closeLightbox();
        }
    }
});
