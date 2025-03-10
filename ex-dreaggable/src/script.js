document.addEventListener("DOMContentLoaded", () => {
    const blocos = document.querySelectorAll(".bloco");
    const areas = document.querySelectorAll(".area-drop");

    let blocoArrastado = null;

    // Evento de início do arrasto
    blocos.forEach((bloco) => {
        bloco.addEventListener("dragstart", (e) => {
            blocoArrastado = bloco;
            e.dataTransfer.setData("text/plain", bloco.id);
            bloco.style.opacity = "0.5";
        });

        bloco.addEventListener("dragend", () => {
            bloco.style.opacity = "1";
        });
    });

    // Permite que a área receba o bloco
    areas.forEach((area) => {
        area.addEventListener("dragover", (e) => {
            e.preventDefault();
            area.classList.add("hover");
        });

        area.addEventListener("dragleave", () => {
            area.classList.remove("hover");
        });

        area.addEventListener("drop", (e) => {
            e.preventDefault();
            const blocoID = e.dataTransfer.getData("text/plain");
            const bloco = document.getElementById(blocoID);
            
            if (bloco) {
                area.appendChild(bloco);
                area.classList.remove("hover");
            }
        });
    });
});
