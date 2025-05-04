const url =
	"https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhEemdlDXj_UH4Qm-wv5296ibZQhTyGr7iSLgc3Awutga97ofw0AW2kksf03WtPly9I8gM9aGc01k24czDr_Pjjc2MEBolRPg05qID6HL9mpLKBX3FHmxaLhDqthFtLSmFM6fQX99HLzWVuJQbuLvHI54Vy3ogOGZqMcP9SDxX19PFSg-BwhCg84kpc-CEyD1PLVF5EXnvtLZrN9gmdeeavs8cMa8i3G1BSD1R-U4nmgDYhZ7gGtjVai1Qhvm-bMxvT33FwL0BuLfobxWabhjb_LhO-4Q&lib=MNEgiEzdQDxscnyQUI-MFdHOpm2CLhtpt";

fetch(url)
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		const datos = data && data.length ? data : data["data"] || [];

		if (!Array.isArray(datos) || datos.length === 0) {
			document.getElementById("tabla").innerHTML =
				"<tr><td>No hay datos</td></tr>";
		} else {
			const tabla = document.getElementById("tabla");
			const headers = Object.keys(datos[0]);
			const thead =
				"<tr>" + headers.map((h) => `<th>${h}</th>`).join("") + "</tr>";
			const rows = datos
				.map((fila) => {
					return (
						"<tr>" +
						headers
							.map((h, i) => {
								let clase = "";
								if (i === 0) {
									if (fila[h] === "1.-") clase = ' class="primero"';
									else if (fila[h] === "2.-") clase = ' class="segundo"';
									else if (fila[h] === "3.-") clase = ' class="tercero"';
									else clase = ' class="ranking"';
								} else if (i === 1) {
									clase = ' class="jugador"';
								}
								return `<td${clase}>${fila[h]}</td>`;
							})
							.join("") +
						"</tr>"
					);
				})
				.join("");

			tabla.innerHTML = thead + rows;

			// Limpia encabezados si es necesario
			const ths = tabla.querySelectorAll("#tabla th");
			ths.forEach((th) => {
				const texto = th.textContent.trim().toLowerCase();
				if (texto === "jugadores" || texto === "pos") {
					th.textContent = "";
					th.style.border = "none";
					th.style.padding = "0";
					th.style.background = "transparent";
				}
			});
		}

		// Mostrar contenido y ocultar loader
		document.getElementById("loader").style.display = "none";
		document.getElementById("main-content").style.display = "block";
	})
	.catch((error) => {
		console.error("Error al cargar los datos:", error);
		document.getElementById("tabla").innerHTML =
			"<tr><td>Error al cargar los datos</td></tr>";
		document.getElementById("loader").style.display = "none";
		document.getElementById("main-content").style.display = "block";
	});
