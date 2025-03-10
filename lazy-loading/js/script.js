const images = document.querySelectorAll(".imagem-container img");

const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry =>{
        if(!entry.isIntersecting) return;

        const image = entry.target;

        image.src = image.src.replace("?w=10&auto", "?w=1000&auto");

        observer.unibserve(image);
    })

},{});

images.forEach((image) => {
    observer.observe(image);
})

