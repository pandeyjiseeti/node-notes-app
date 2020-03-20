const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New Note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const remainingNotes = notes.filter((note) => {
        return note.title !== title
    })
    if (notes.length > remainingNotes.length) {
        console.log(chalk.green.inverse('Note Removed'))
        saveNotes(remainingNotes)
    }
    else console.log(chalk.red.inverse('No Note Found'))

}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes :'))
    notes.forEach(note => {
        console.log(note.title)
    });
}

const readNotes = (title) => {
    const notes = loadNotes()
    const noteFound = notes.find((note) => {
        return note.title === title
    })
    if (noteFound) {
        console.log('Note Title : ' + chalk.inverse(noteFound.title) + '\nNote Body : ' + noteFound.body)
    } else {
        console.log(chalk.red.inverse('No note Found!!'))
    }
}

const saveNotes = (notes) => {
    const data = JSON.stringify(notes)
    fs.writeFileSync('notes.json', data)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}