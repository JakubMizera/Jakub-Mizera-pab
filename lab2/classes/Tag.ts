import { randomUUID } from 'crypto';

class Tag {
    id?: string;
    name: string;

    constructor(tag: Tag){
        this.name = tag.name;
        this.id = tag.id || randomUUID()
    }
}

export default Tag;