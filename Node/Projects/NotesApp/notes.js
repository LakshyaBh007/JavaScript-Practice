const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) => {
   const notes = loadNotes()
   const duplicateNotes = notes.find((note) => note.title===title)

   if (!duplicateNotes){
    notes.push({
        title: title,
        body: body
       })
       saveNotes(notes)
       console.log('new note added!')
   } else {
    console.log('note title taken!')
   }
}

const removeNote = (title)=>{
   const notes = loadNotes();
   const notesToKeep = notes.filter(note => note.title !== title)
   if(notes.length > notesToKeep.length){
    console.log(chalk.green.inverse('note removed'))
    saveNotes(notesToKeep)
   } else {
    console.log(chalk.red.inverse('no note found'))
   }
   
}

const listNotes = ()=>{
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes'))
    notes.forEach((note) => {
        console.log(note.title);   
    });
}

const readNote = (title)=>{
    const notes = loadNotes()
    const note = notes.find((note)=>note.title===title)
    if (note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('note not found'))
    }
}

const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON);
     }  catch(e){
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}