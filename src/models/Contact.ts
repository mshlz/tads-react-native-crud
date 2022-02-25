export class Contact {
    id: number
    name: string
    email: string
    natural: string
    
    constructor(obj?: Partial<Contact>) {
        if (obj) {
            this.id = obj.id
            this.name = obj.name
            this.email = obj.email
            this.natural = obj.natural
        }
    }

    toString() {
        const fields = Object.values(this).join(', ')
        return `Contact [${fields}]`
    }
}