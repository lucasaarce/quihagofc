document.addEventListener('DOMContentLoaded', () => {
    // Primero: cargar el menú
    fetch('menu.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('menu').innerHTML = html;
            inicializarIdioma(); // <- cuando termine de cargar el menú, inicializamos
        })
        .catch(error => {
            console.error('Error al cargar el menú:', error);
        });

    fetch("menu.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("menu").innerHTML = data;
        const currentPage = window.location.pathname.split("/").pop().replace(".html", "");
        
        const desktopLink = document.getElementById(`link-${currentPage}`);
        const mobileLink = document.getElementById(`link-${currentPage}-m`);
        
        if (desktopLink) {
            desktopLink.classList.add("active");
        }
        
        if (mobileLink) {
            mobileLink.classList.add("active");
        }
    });
    
    function inicializarIdioma() {
        fetch('../json/idiomas.json')
            .then(response => response.json())
            .then(data => {
                traducciones = data;
                const selectorIdioma = document.getElementById('idioma');
                if (!selectorIdioma) {
                    console.error('Selector de idioma no encontrado.');
                    return;
                }

                const idiomaGuardado = localStorage.getItem('idioma') || 'es';
                selectorIdioma.value = idiomaGuardado;
                cambiarIdioma(idiomaGuardado);

                selectorIdioma.addEventListener('change', function() {
                    const nuevoIdioma = this.value;
                    localStorage.setItem('idioma', nuevoIdioma);
                    cambiarIdioma(nuevoIdioma);
                });
            })
            .catch(error => {
                console.error('Error al cargar las traducciones:', error);
            });
    }

    function cambiarIdioma(idioma) {
        const textos = traducciones[idioma];
        if (!textos) return;

        for (let id in textos) {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.textContent = textos[id];
            } else {
                console.warn(`Elemento con ID '${id}' no encontrado en esta página.`);
            }
        }
    }
});


