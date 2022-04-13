import express from 'express';
import e, { Request, Response } from "express";
import { randomUUID } from 'crypto';
import fs from 'fs';

const app = express();
app.use(express.json());



class Note {
    title: string;
    content: string;
    createDate?: Date;
    tags?: Tag[];
    id?: string;

    // constructor(title: string, content: string, createDate?: Date, tags?: string[]){
    //     this.title = title;
    //     this.content = content;
    //     this.createDate = createDate || new Date();
    //     this.tags = tags || null;
    //     this.id = Date.now();
    // }
    constructor(note: Note) {
        this.title = note.title;
        this.content = note.content;
        this.createDate = note.createDate || new Date();
        this.tags = note.tags || undefined;
        this.id = note.id || randomUUID();
    }

}

class Tag {
    id?: string;
    name: string;

    constructor(tag: Tag){
        this.name = tag.name;
        this.id = tag.id || randomUUID()
    }
}

const notesPath = './notesJSON.json';
const tagsPath = './tagsJSON.json';

var notesList: Note[] = [] ;
fs.readFile(notesPath, (err, data) => {
    if (err) throw err;
    notesList = JSON.parse(data.toString());
});

let tags: Tag[] = [];
fs.readFile(tagsPath, (err, data) => {
    if (err) throw err;
    tags = JSON.parse(data.toString());
});

//zwroc wszystkie notatki
app.get('/notesList', (req: Request, res: Response) => {
    res.send(notesList) //js object => json object
})

//dodawanie notatki
app.post('/note', (req: Request, res: Response) => {

    let note = new Note(req.body)
    notesList.push(note)
    fs.writeFileSync(notesPath, JSON.stringify(notesList))

    
    // jeśli podanych w notatce tagów nie ma na liście, to automatycznie dodajemy nowe tagi do listy.
    if(note.tags !== undefined) {
        for(let i = 0; i < note.tags.length; i++) {
            if(!tags.includes(note.tags[i])){
                let newTag = new Tag(note.tags[i])
                //zmienna dla nowego tagu (w srodku tag wpisany w notatce)
                tags.push(newTag)
                fs.writeFileSync(tagsPath, JSON.stringify(tags))
            }
        }
    }
   
    
    res.status(200).send('Notatka została dodana')
})

//szukanie notatki po id
app.get('/note/:id', (req: Request, res: Response) => {
    let findNote = notesList.find(note => note.id === req.params.id)
    if (findNote) {
        res.status(200).send(findNote)
    } else {
        res.status(404).send("Nie ma takiej notatki")
    }
})

//edytowanie notatki
app.put('/note/:id', (req: Request, res: Response) => {
    let findNote = notesList.find(note => note.id === req.params.id)
    if (findNote) {
        notesList.push(findNote)
        let findNoteIndex = notesList.findIndex(note => note.id === req.params.id)
        if (findNoteIndex !== -1 && findNoteIndex !== undefined) {
            notesList.splice(findNoteIndex, 1)
            fs.writeFileSync(tagsPath, JSON.stringify(notesList))
        }

        findNote = new Note({ ...findNote, ...req.body })
        fs.writeFileSync(notesPath, JSON.stringify(notesList))
         // jeśli podanych w notatce tagów nie ma na liście, to automatycznie dodajemy nowe tagi do listy.
        if(findNote.tags !== undefined) {
            for(let i = 0; i < findNote.tags.length; i++) {
                if(!tags.includes(findNote.tags[i])){
                    tags.push(findNote.tags[i])
                    fs.writeFileSync(tagsPath, JSON.stringify(tags))
                }
            }
        }
        res.status(200).send("Notatka zedytowana");
    } else {
        res.status(404).send("Nie można edytować notatki")
    }
})

//usuwanie notatki
app.delete('/note/:id', (req: Request, res: Response) => {
    try{
        notesList = notesList.filter(note => note.id !== req.params.id)
        fs.writeFileSync(notesPath, JSON.stringify(notesList))
    }
    catch{
        res.send('Nie można usunąć notatki o id: ' + req.params.id)
    }
})


//zwroc wszystkie tagi
app.get('/tags', (req: Request, res:Response) => {
    res.send(tags).status(200)
})

//dodawanie tagu
app.post('/tag', (req: Request, res: Response) => {
    let newTag = new Tag(req.body)
    
    if(!tags.includes(newTag)) {
        tags.push(newTag)
        fs.writeFileSync(tagsPath, JSON.stringify(tags))
        res.status(200).send("wysłano tag")
    } else res.status(409).send("Tag już istnieje")
    
})

//szukanie tagu po id
app.get('/tag/:id', (req: Request, res: Response) => {
    let findTag = tags.find(tag => tag.id === req.params.id)
    // findTag = lista tagów.find(zwraca pierwszy element(tag) którego id jest równe id z req.params )
    if (findTag) {
        res.status(200).send(findTag)
        
    } else {
        res.status(404).send("Nie ma takigo tagu")
    }
})

//edytowanie tagów po id
app.put('/tag/:id', (req: Request, res: Response) => {
    let findTag = tags.find(tag => tag.id === req.params.id)
    // findTag = lista tagów.find(zwraca pierwszy element(tag) którego id jest równe id z req.params )
    if (findTag) {
        findTag = new Tag({ ...findTag, ...req.body })
        tags.push(findTag)
        let findTagIndex = tags.findIndex(tag => tag.id === req.params.id)
        if (findTagIndex !== -1 && findTag !== undefined) {
            tags.splice(findTagIndex, 1)
            fs.writeFileSync(tagsPath, JSON.stringify(tags))
        }

        fs.writeFileSync(tagsPath, JSON.stringify(tags))
        res.status(200).send("Edytowano tag")
    } else {
        res.status(404).send("Nie można edytować tagu")
    }
})

//usuwanie tagu po id
app.delete('/tag/:id', (req: Request, res: Response) => {
    let findTag = tags.findIndex(tag => tag.id === req.params.id)
    if (findTag !== -1 && findTag !== undefined) {
        tags.splice(findTag, 1)
        fs.writeFileSync(tagsPath, JSON.stringify(tags))
        res.status(204).send("Usunięto tag")
    } else {
        res.status(400).send("Nie można usunąć tagu")
    }
})

app.listen(3000);