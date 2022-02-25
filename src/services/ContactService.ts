import { Database } from "../db/Database"
import { Contact } from "../models/Contact"

export class ContactService {
    static readonly TABLE = `contact`

    static async create(obj: Contact) {
        const result = await Database.runQuery(`INSERT INTO ${this.TABLE} (name, email, natural) VALUES (?,?,?)`, [
            obj.name.trim(),
            obj.email.trim(),
            obj.natural.trim()
        ])

        obj.id = result.insertId

        return obj
    }

    static async update(obj: Contact) {
        const query = `UPDATE ${this.TABLE} SET name = ?, email = ?, natural = ? WHERE id = ?;`
        const result = await Database.runQuery(query, [
            obj.name.trim(),
            obj.email.trim(),
            obj.natural.trim(),
            obj.id
        ])

        return result.rowsAffected > 0
    }

    static async delete(obj: Contact) {
        const query = `DELETE FROM ${this.TABLE} WHERE id = ?;`
        const result = await Database.runQuery(query, [
            obj.id
        ])

        return result.rowsAffected > 0
    }

    static async deleteById(id: number) {
        const query = `DELETE FROM ${this.TABLE} WHERE id = ?;`
        const result = await Database.runQuery(query, [id])

        return result.rowsAffected > 0
    }

    static async findById(id: number) {
        const query = `SELECT * FROM ${this.TABLE} WHERE id = ?;`
        const result = await Database.runQuery(query, [id])

        if (result.rows.length != 1) {
            throw new Error('Contact not found')
        }

        const raw = result.rows.item(0)
        const obj = new Contact(raw)

        return obj
    }

    static async findAll() {
        const query = `SELECT * FROM ${this.TABLE};`
        const result = await Database.runQuery(query)

        return result.rows._array.map(row => new Contact(row))
    }

}