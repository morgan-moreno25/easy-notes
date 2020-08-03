class NotesView {
    notesContainer;
    noteForm;
    noteText;
    constructor(){
        this.notesContainer = document.getElementById('notes-container');
        this.noteForm = document.getElementById('note-form');
    };
    init(){
        this.renderForm();
        this.renderNotes();
    };
    resetUI(){
        this.clearForm();
        this.clearNotes();
        this.renderNotes();
        this.renderForm();
    };
    clearForm(){
        while(this.noteForm.children.length > 0){
            this.noteForm.removeChild(this.noteForm.firstChild);
        };
    };
    clearNotes(){
        while(this.notesContainer.children.length > 0){
            this.notesContainer.removeChild(this.notesContainer.firstChild);
        };
    };
    createNote(note){
        const noteElement = document.createElement('div');
        noteElement.classList.add('card', 'note');
        noteElement.dataset.id = note.id;

        const noteBody = document.createElement('p');
        noteBody.innerHTML = note.text;
        noteElement.appendChild(noteBody);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-dark', 'edit');
        editBtn.addEventListener('click', () => {
            let editNote = notesApp.getNote(note.id);
            this.clearForm();
            this.renderForm(editNote);
        });
        noteElement.appendChild(editBtn);

        const editIcon = document.createElement('i');
        editIcon.classList.add('fa', 'fa-pencil-square-o');
        editBtn.appendChild(editIcon);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-danger', 'del');
        deleteBtn.addEventListener('click', () => {
            notesApp.deleteNote(note.id);
            this.clearNotes();
            this.renderNotes();
        })
        noteElement.appendChild(deleteBtn);

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash');
        deleteBtn.appendChild(deleteIcon);

        this.notesContainer.appendChild(noteElement);
    };
    renderNotes(){
        // get the NOTES data
        let notes = notesApp.getNotes();

        for( let i = 0; i < notes.length; i++ ){
            this.createNote(notes[i]);
        }
    };
    renderForm(note){
        if(note){
            const formGroup = document.createElement('div');
            formGroup.classList.add('form-group');

            const label = document.createElement('label');
            label.innerHTML = 'Edit note:';
            formGroup.appendChild(label);

            const textArea = document.createElement('textarea');
            textArea.cols = 20;
            textArea.rows = 5;
            textArea.id = 'note-text';
            textArea.innerHTML = note.text;
            formGroup.appendChild(textArea);

            const submitBtn = document.createElement('button');
            submitBtn.type = 'button';
            submitBtn.classList.add('btn', 'btn-info');
            submitBtn.innerHTML = 'Submit';
            submitBtn.addEventListener('click', () => {
                let newNote = {
                    id: note.id,
                    text: this.noteText.value,
                };
                notesApp.updateNote(note.id, newNote);
                this.resetUI();
            });

            this.noteForm.append(formGroup, submitBtn);
        }else {
            const formGroup = document.createElement('div');
            formGroup.classList.add('form-group');
            
            const label = document.createElement('label');
            label.innerHTML = 'Enter a note:';
            formGroup.appendChild(label);

            const textArea = document.createElement('textarea');
            textArea.cols = 20;
            textArea.rows = 5;
            textArea.id = 'note-text';
            formGroup.appendChild(textArea);

            const addNoteBtn = document.createElement('button');
            addNoteBtn.type = 'button';
            addNoteBtn.classList.add('btn', 'btn-primary');
            addNoteBtn.innerHTML = 'Add Note';
            addNoteBtn.addEventListener('click', () => {
                let newNote = {
                    id: notesApp.getNotes().length,
                    text: this.noteText.value ? this.noteText.value : 'Hey idiot, you forgot to enter a note :)',
                };

                notesApp.addNote(newNote);
                this.resetUI();
            });

            this.noteForm.append(formGroup, addNoteBtn);
        }

        this.noteText = document.getElementById('note-text');
    };
};

class NotesController {
    NOTES;

    constructor(notesView){
        if(localStorage.getItem('notes')){
            this.NOTES = JSON.parse(localStorage.getItem('notes'));
        }else{
            localStorage.setItem('notes', JSON.stringify([{ id: 0, text: 'Welcome to the easy notes app.'}]));
            this.NOTES = JSON.parse(localStorage.getItem('notes'));
        };
        this.notesView = notesView;
    };
    init(){
        console.log('APP IS RUNNING.')
        this.notesView.init();
    };
    saveToLocalStorage(){
        localStorage.setItem('notes', JSON.stringify(this.NOTES));
    };
    getNotes(){
        return this.NOTES;
    };
    getNote(id){
        for( let i = 0; i < this.NOTES.length; i++ ){
            if(this.NOTES[i].id === id){
                console.log(this.NOTES[i]);
                return this.NOTES[i];
            }
        };
    };
    addNote(note){
        this.NOTES.push(note);
        this.saveToLocalStorage();
    };
    deleteNote(id){
        this.NOTES = this.NOTES.filter(note => note.id != id);
        this.saveToLocalStorage();
    };
    updateNote(id, newNote){
        this.NOTES[id] = newNote;
        this.saveToLocalStorage();
    };
};

const notesView = new NotesView();
const notesApp = new NotesController(notesView);

notesApp.init();



