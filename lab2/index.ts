// const express = require('express');
// const app = express();

import express from 'express';
import e, { Request, Response } from "express";
const app = express();

app.use(express.json());


class Note {
    title: string;
    content: string;
    createDate?: Date;
    tags?: string[];
    id?: number;

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
        this.id = Date.now();
    }

}

class Tag {
    id?: number;
    name: string;

    constructor(tag: Tag){
        this.name = tag.name;
        this.id = Date.now();
    }
}

let notes: Note[] = [];
let tags: Tag[] = [];

notes.push(new Note({ title: "test", content: "testcontent" }))
tags.push(new Tag({name: "test"}))


app.get('/notes', (req: Request, res: Response) => {
    res.send(notes) //js object => json object
})

app.post('/note', (req: Request, res: Response) => {
    //console.log(req.body.note)
    let note = new Note(req.body.note)
    notes.push(note)

    res.status(200).send('Notatka została dodana')
})

app.get('/note/:id', (req: Request, res: Response) => {
    let findNote = notes.find(note => note.id === Number(req.params.id))
    if (findNote) {
        res
            .sendStatus(200)
            .send(findNote)
    } else {
        res.status(404).send("Nie ma takiej notatki")
    }
})

app.put('/note/:id', (req: Request, res: Response) => {
    let findNote = notes.find(note => note.id === Number(req.params.id))
    if (findNote) {
        findNote = new Note({ ...findNote, ...req.body.note })
        res.status(204);
    } else {
        res.status(404).send("Nie można edytować notatki")
    }
})

app.delete('/note/:id', (req: Request, res: Response) => {
    let findNote = notes.findIndex(note => note.id === Number(req.params.id))
    if (findNote) {
        notes.splice(findNote, 1)
        res.status(204).send("Usunięto notatkę")
    } else {
        res.status(400).send("Nie można usunąć notatki")
    }
})



app.get('/tags', (req: Request, res:Response) => {
    res.send(tags).status(200)
})

app.post('/tag', (req: Request, res: Response) => {
    let newTag = new Tag(req.body.tag)
    tags.push(newTag)
    res.status(200).send("wysłano tag")
})


app.listen(3000);