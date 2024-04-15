const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

getNotes().sort(function(a, b) {
    return b.createdAt - a.createdAt;
}).forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.appendChild(noteElement);
});

addNoteButton.addEventListener("click", () => {
    addNote();
});

function getNotes() {
    return JSON.parse(localStorage.getItem("sticky-notes") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("sticky-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Sticky Note";
    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you wish to delete this sticky note?")

        if (doDelete) {
            deleteNote(id, element);
        }
    });
    return element;
}

function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: "",
        createdAt: new Date().getTime(),
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.appendChild(noteElement);

    notes.push(noteObject);
    saveNotes(notes);
    window.location.reload();
}

function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);
}