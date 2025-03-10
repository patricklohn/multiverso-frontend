class BoxShadowGenerator {

    constructor(
        horizontalInput, verticallInput, blurInput, spreadInput, horizontalInputValue,
        verticallInputValue, blurInputValue, spreadInputValue, previewBox, rule, webkitRule, 
        mozRule, opacityInput, colorInput,insetInput,colorInputValue,opacityInputValue
    ) {
        this.horizontalInput = horizontalInput
        this.verticallInput = verticallInput
        this.blurInput = blurInput
        this.spreadInput = spreadInput
        this.horizontalInputValue = horizontalInputValue
        this.verticallInputValue = verticallInputValue
        this.blurInputValue = blurInputValue
        this.spreadInputValue = spreadInputValue
        this.previewBox = previewBox
        this.rule = rule
        this.webkitRule = webkitRule
        this.mozRule = mozRule
        this.opacityInput = opacityInput
        this.colorInput = colorInput
        this.opacityInputValue = opacityInputValue
        this.colorInputValue = colorInputValue
        // this.insetInput = insetInput
        this.insetRef = insetInput.checked;
    }

    initialize(){
        this.horizontalInputValue.value = horizontalInput.value;
        this.verticallInputValue.value = verticallInput.value;
        this.blurInputValue.value = blurInput.value;
        this.spreadInputValue.value = spreadInput.value; 
        this.opacityInputValue.value = opacityInput.value;
        this.colorInputValue.value = colorInput.value;

        this.applyRule();
        this.showRule();
    }
    applyRule(){
        const rgbValue = this.hexToRgb(this.colorInputValue.value)

        this.previewBox.style.boxShadow = `
        ${this.insetRef ? "inset" : ""}
        ${horizontalInputValue.value}px 
        ${verticallInputValue.value}px
        ${blurInputValue.value}px
        ${spreadInputValue.value}px
        rgba(${rgbValue},
        ${this.opacityInputValue.value}
        )
        `;
        this.currentRule = this.previewBox.style.boxShadow;
    }
    showRule(){
        this.rule.innerText = this.currentRule;
        this.webkitRule.innerText = this.currentRule;
        this.mozRule.innerText = this.currentRule;
    }
    updateValue(type, value){
        switch(type){
            case "horizontalInput":
                this.horizontalInputValue.value = value;
                break
            case "verticallInput":
                this.verticallInputValue.value = value;
                break
            case "blurInput":
                this.blurInputValue.value = value;
                break
            case "spreadInput":
                this.spreadInputValue.value = value;
                break
            case "colorInput":
                this.colorInputValue.value = value;
                break
            case "opacityInput":
                this.opacityInputValue.value = value;
                break
            case "insetInput":
                this.insetRef = value; 
                break
            
            
        }
        this.applyRule();
        this.showRule();
    }
    hexToRgb(hex){
        return `${("0x" + hex[1] + hex[2]) | 0},${("0x" + hex[3] + hex[4]) | 0}, ${("0x" + hex[5] + hex[6]) | 0}`
    }
}


// Seleção de elementos

// RangeInput
const horizontalInput = document.querySelector("#horizontal");
const verticallInput = document.querySelector("#vertical");
const blurInput = document.querySelector("#blur");
const spreadInput = document.querySelector("#spread");
const opacityInput = document.querySelector("#opacity");

// Color
const colorInput = document.querySelector("#color");

//Checkbox
const insetInput = document.querySelector("#inset");

//TextInput
const horizontalInputValue = document.querySelector("#horizontal-value");
const verticallInputValue = document.querySelector("#vertical-value");
const blurInputValue = document.querySelector("#blur-value");
const spreadInputValue = document.querySelector("#spread-value");
const colorInputValue = document.querySelector("#color-value");
const opacityInputValue = document.querySelector("#opacity-value");

// Previw
const previewBox = document.querySelector("#box");

//CodigosCopiar
const rule = document.querySelector("#rule span");
const webkitRule = document.querySelector("#webkit-rule span");
const mozRule = document.querySelector("#moz-rule span");


// Codigo

const boxShadow = new BoxShadowGenerator(
    horizontalInput, verticallInput, blurInput, spreadInput, horizontalInputValue,
    verticallInputValue, blurInputValue, spreadInputValue, previewBox, rule, webkitRule, 
    mozRule,opacityInput, colorInput,insetInput,colorInputValue,opacityInputValue
);

boxShadow.initialize();

// Eventos
horizontalInput.addEventListener("input", (e)=>{
    const value = e.target.value

    boxShadow.updateValue("horizontalInput", value);
});

verticallInput.addEventListener("input", (e)=>{
    const value = e.target.value

    boxShadow.updateValue("verticallInput", value);
});

blurInput.addEventListener("input", (e)=>{
    const value = e.target.value

    boxShadow.updateValue("blurInput", value);
});

spreadInput.addEventListener("input", (e)=>{
    const value = e.target.value

    boxShadow.updateValue("spreadInput", value);
});

colorInput.addEventListener("input", (e)=>{
    const value = e.target.value

    boxShadow.updateValue("colorInput", value);
});

opacityInput.addEventListener("input", (e)=>{
    const value = e.target.value

    boxShadow.updateValue("opacityInput", value);
})

insetInput.addEventListener("input", (e)=>{
    const value = e.target.checked;

    boxShadow.updateValue("insetInput", value);
})

//Copiar Regra

const rulesArea = document.querySelector("#rules-area")
const copyInstructions = document.querySelector("#copy-instructions")

rulesArea.addEventListener("click", () => {
    const rules = rulesArea.innerText.replace(/^\s*\n/gm, "");
    navigator.clipboard.writeText(rules).then(()=>{
        copyInstructions.innerText = "Regra copiada com sucesso!"

        setTimeout(()=>{
            copyInstructions.innerText = "Clique no quadro acima para copiar as regras";
        },2000)
    })
});




