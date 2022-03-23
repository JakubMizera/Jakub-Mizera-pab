// const express = require('express');
// const app = express();

import express from 'express';
import e, {Request, Response} from "express";
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
    constructor(note: Note){
            this.title = note.title;
            this.content = note.content;
            this.createDate = note.createDate || new Date();
            this.tags = note.tags || undefined;
            this.id = Date.now();
        }

}

let notes: Note[] = [];

notes.push(new Note({title:"test", content:"testcontent"}))


app.get('/notes', (req: Request, res: Response) => {
    res.send(notes) //js object => json object
})


app.post('/note', (req: Request, res: Response) => {
    //console.log(req.body.note)
    let note = new Note(req.body.note)
    notes.push(note)
    
    res
        .sendStatus(200)
        .send('Notatka została dodana')
})

app.get('/note/:id', (req: Request, res: Response) => {
    let findNote = notes.find(note => note.id === Number(req.params.id))    
    
})
app.listen(3000);