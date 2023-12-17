const saveButton = document.querySelector('#btnSave');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const notesContainer = document.querySelector('#notes__container');
const deleteButton = document.querySelector('#btnDelete');
const currentItem = document.querySelector('#note_id');

function clearForm() {
    titleInput.value = '';
    descriptionInput.value = '';
    deleteButton.classList.add('hidden');
}
function displayNoteInForm(note) {
    titleInput.value = note.title;
    descriptionInput.value = note.description;
    deleteButton.classList.remove('hidden');
    currentItem.value = note.id;
}

function populateForm(id) {
    fetch(`https://localhost:7054/api/notes/${id}`)
    .then(data => data.json())
    .then(response => displayNoteInForm(response));
}

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
.then(response => {
    clearForm();
    getAllNotes();
});

}
function getAllNotes() {
    fetch(`https://localhost:7054/api/notes`)
    .then(data => data.json())
    .then(response => displayNotes(response));
}
function displayNotes(notes) {
    let allNotes = '';

notes.forEach(note => {
    const noteElement = `
                            <div class="note" data-id="${note.id}"> 
                            <h3>${note.title}</h3>
                            <p>${note.description}</p>
                            </div>
                              `;  
    allNotes += noteElement;
    
   
});
    
notesContainer.innerHTML = allNotes;

    document.querySelectorAll('.note').forEach(note => {
        note.addEventListener('click', function() {
            populateForm(note.dataset.id);
        });
    });
}

getAllNotes();

function updateNote(id, title, description) {
    const body = {
        title: title,
        description: description,
        isVisible: true
};


fetch(`https://localhost:7054/api/notes/${id}`, {
    method:'PUT',
    body: JSON.stringify(body),
    headers: {
        "content-type": "application/json"
    }
})
.then(data => data.json())
.then(response => {
    clearForm();
    getAllNotes();
});
}

saveButton.addEventListener('click',function() {
    const id = currentItem.value;
    if(id) {
        updateNote(id, titleInput.value, description.value);
    }
    else {
        addNote(titleInput.value, description.value);
    }
    currentItem.value = null;
});

function deleteNote(id) {
    fetch(`https://localhost:7054/api/notes/${id}`, {
        method:'DELETE',
        headers: {
            "content-type": "application/json"
        }
    })
    .then(response => {
     clearForm();
     getAllNotes();
    });
    currentItem.value = null;
}

deleteButton.addEventListener('click', function() {
   const id = currentItem.value;
    deleteNote(id);
});
