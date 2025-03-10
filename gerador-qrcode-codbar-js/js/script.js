const container = document.querySelector(".container");
const qrCodeBtn = document.querySelector("#btn-qr");
const inputValue = document.querySelector("#qr-form input");
const qrCodeImg = document.querySelector("#qrImg-code");
const selectCode = document.querySelector("#selectCode");

/*Gerar codigos QR*/
function generateQrCode(){
    
    const qrCodeInputValue = inputValue.value;
    const selectCodeValue = selectCode.value;

    if(!qrCodeInputValue) return;
    if(!selectCodeValue) return;

    switch (selectCodeValue){
        case "qr":
        qrCodeBtn.innerText = "Gerando código...";
        qrCodeImg.src = `http://barcode.orcascan.com/?type=qr&data=${qrCodeInputValue}`;
        break
        case "code128":
        qrCodeBtn.innerText = "Gerando código...";
        qrCodeImg.src = `http://barcode.orcascan.com/?type=code128&data=${qrCodeInputValue}`;
        break
        case "ean13":
        qrCodeBtn.innerText = "Gerando código...";
        qrCodeImg.src = `http://barcode.orcascan.com/?type=ean13&data=${qrCodeInputValue}`;
        break
    }

    qrCodeImg.addEventListener("load", ()=>{
        container.classList.add("active");
        qrCodeBtn.innerText = "Gerar novo Code";
    });
}

// Eventos

inputValue.addEventListener("keyup", ()=>{
    if(!inputValue.value){
        container.classList.remove("active");
        qrCodeBtn.innerText = "Gerar Code";
    }
})

qrCodeBtn.addEventListener("click", ()=>{
    generateQrCode();
})

document.addEventListener("keydown",(e)=>{
    if(e.key!="Enter") return;
    generateQrCode();
})

/*inputValue.addEventListener("keydown",(e)=>{
    if(e.code === "Enter"){
    generateQrCode();
    }
})*/

