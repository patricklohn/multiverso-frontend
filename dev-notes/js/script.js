// Elementos

const notesContainer = document.querySelector("#notas-container");
const noteInput = document.querySelector("#note-content");
const addNoteBtn = document.querySelector(".add-note");
const searchInput = document.querySelector("#search-input");
const exportBt = document.querySelector("#exports-notes");
const exportBtnPdf = document.querySelector("#exports-notes-pdf")

// Funções 
function showNotes() {
    cleanNotes()

    getNotes().forEach((note)=>{
        const noteElement = createNote(note.id, note.content, note.fixed);

        notesContainer.appendChild(noteElement);
    })
}

function cleanNotes(){
    notesContainer.replaceChildren([]);
}

const addNote = () => {
    const note = getNotes();
    codigoId = generateId();
    const noteObject ={ 
        id: codigoId,
        content: noteInput.value,
        fixed: false,
    };

    const noteElement = createNote(noteObject.id, noteObject.content);

    notesContainer.appendChild(noteElement);

    note.push(noteObject);

    saveNotes(note);

    noteInput.value = "";
}

// const generateId = () =>{
//     return Math.floor(Math.random()* 5000);
// }
function generateId() {
    let lastId = parseInt(localStorage.getItem("lastId")) || 0;

    let newId = lastId + 1;

    localStorage.setItem("lastId", newId.toString());

    return newId;
}

function createNote(id, content, fixed){
    const elementDiv = document.createElement("div");
    elementDiv.classList.add("note");
    const textArea = document.createElement("textarea");
    textArea.value = content;
    textArea.placeholder= "Adicione a sua anotação";
    elementDiv.appendChild(textArea);
    
    const pinIcon = document.createElement("i");
    pinIcon.classList.add(...["bi","bi-pin"]);
    elementDiv.appendChild(pinIcon);

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add(...["bi","bi-x-lg"]);
    elementDiv.appendChild(deleteIcon);

    const duplicateIcon = document.createElement("i");
    duplicateIcon.classList.add(...["bi","bi-file-earmark-plus"]);
    elementDiv.appendChild(duplicateIcon);

    if(fixed){
        elementDiv.classList.add("fixed");
    }

    // Eventos do elemento
    elementDiv.querySelector("textarea").addEventListener("keyup", (e)=>{

        const noteContent = e.target.value;
        
        updateNote(id, noteContent);


    })

    elementDiv.querySelector(".bi-pin").addEventListener("click",()=>{
        toggleFixNote(id);
    })

    elementDiv.querySelector(".bi-x-lg").addEventListener("click",()=>{
        deleteNote(id, elementDiv);
    })

    elementDiv.querySelector(".bi-file-earmark-plus").addEventListener("click",()=>{
        copyNote(id);
    })

    return elementDiv;
}

function toggleFixNote(id){
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id === id)[0]

    targetNote.fixed = !targetNote.fixed;

    saveNotes(notes);

    showNotes();
}

function deleteNote(id, element) {
    const notes = getNotes().filter((notes)=> notes.id !== id)

    saveNotes(notes);

    notesContainer.removeChild(element);
}

function copyNote(id) {
    const notes = getNotes();

    const targetNote = notes.filter((note) => note.id === id)[0]

    codigoId = generateId();
    const noteObject = {
        id: codigoId,
        content: targetNote.content,
        fixed: false
    }

    const noteElement = createNote(noteObject.id, noteObject.content, noteObject.fixed)

    notesContainer.appendChild(noteElement)

    notes.push(noteObject)

    saveNotes(notes);
}

function updateNote(id, newContent) {

    const notes = getNotes();

    const targetNote = notes.filter((note) => note.id === id)[0]

    targetNote.content = newContent;

    saveNotes(notes);

}

function searchNotes(search){
    const note = getNotes();

    const searchResults = getNotes().filter((note) =>{
      return note.content.includes(search);
    })

    if(search !== ""){
        cleanNotes()
        searchResults.forEach((note) =>{
            const noteElement = createNote(note.id, note.content);
            notesContainer.appendChild(noteElement);
        });

        return;
    }

    cleanNotes();
    showNotes();

}

//Export CSV

function exportData(){

    const notes = getNotes();

    // Separa o dado por, quebra lina \n
    const csvString = [
        ["ID", "Contúdo", "Fixado?"],
        ...notes.map((note) => [note.id, note.content, note.fixed]),
    ].map((e) => e.join(",")).join("\n");

    const element = document.createElement("a");
    element.href = "data:text/csv;charset=utf-8," + encodeURI(csvString);
    element.target = "_blank";

    element.download = "Notes.csv";

    element.click();
}

// Local Storage
function saveNotes(note) {
    localStorage.setItem("note", JSON.stringify(note));
}

function getNotes(){
    const note = JSON.parse(localStorage.getItem("note") || "[]");

    const orderNotes = note.sort((a, b) => a.fixed > b.fixed ? -1 : 1);

    return orderNotes;
}

// Eventos
addNoteBtn.addEventListener("click", () => addNote());

searchInput.addEventListener("keyup", (e) =>{
    const search = e.target.value; 

    searchNotes(search);
})

noteInput.addEventListener("keydown", (e) =>{
    if(e.key === "Enter"){
        addNote();
    }
})

exportBt.addEventListener("click", ()=>{
    exportData();
})

exportBtnPdf.addEventListener("click", ()=>{

    // const notes = getNotes();
    const elemet = notesContainer;

    // const PdfString = [
    //     ["ID", "Contúdo", "Fixado?"],
    //     ...notes.map((note) => [note.id, note.content, note.fixed]),
    // ].map((e) => e.join("-")).join("\n");
    

    const options = {
        margin:[10,10,10,10],
        filename: "ArquivoNotes.pdf",
        html2canvas: {scale:2},
        jsPDF: {unit:"mm", format:"a4", orientation:"portrait"},
    }

    html2pdf().set(options).from(elemet).save();

})

// Inicialização

showNotes();