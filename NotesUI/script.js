const saveButton = document.querySelector('#btnSave');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const notesContainer = document.querySelector('#notes__container');






function addNote(title, description) {

    const body = {
        title: title,
        description: description,
        isVisible: true
    };


fetch('https://localhost:7054/api/notes', {
    method:'POST',
    body: JSON.stringify(body),
    headers: {
        "content-type": "application/json"
    }
})
.then(data => data.json())
.then(response => displayNotes(response));

}

function getAllNotes() {
    fetch('https://localhost:7054/api/notes')
    .then(data => data.json())
    .then(response => displayNotes(response));
}

function displayNotes(notes) {

    let allNotes = '';

notes.forEach(note => {
    const noteElement = `
                            <div class="note"> 
                            <h3>${note.title}</h3>
                            <p>${note.description}</p>
                            </div>
                              `;  
    allNotes += noteElement;
});
notesContainer.innerHTML = allNotes;
}


getAllNotes();
saveButton.addEventListener('click',function() {
    addNote(titleInput.value, descriptionInput.value);
})