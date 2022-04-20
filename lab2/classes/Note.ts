import { randomUUID } from 'crypto';
import Tag from './Tag';

class Note {
    title: string;
    content: string;
    createDate?: Date;
    tags?: Tag[];
    id?: string;

    constructor(note: Note) {
        this.title = note.title;
        this.content = note.content;
        this.createDate = note.createDate || new Date();
        this.tags = note.tags || undefined;
        this.id = note.id || randomUUID();
    }
}

export default Note;