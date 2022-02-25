import * as SQLite from 'expo-sqlite'

interface Query {
    sql: string
    args?: (string | number)[]
}

export class Database {
    static getConnection() {
        return SQLite.openDatabase("database.db")
    }

    static async initDb(syncDb?: boolean) {
        const db = this.getConnection()

        console.log(db)
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, (err, data) => {
            console.log('Foreign keys ON')
        })

        if (syncDb) {
            await this.dropDb()
            await this.createDb()
        }

    }

    private static async dropDb() {
        const queries = [
            'DROP TABLE IF EXISTS contact;'
        ]

        await this.runQueries(queries.map(sql => ({ sql })))
    }

    private static async createDb() {
        const queries = [
            `CREATE TABLE IF NOT EXISTS contact (
                id integer primary key autoincrement,
                name text,
                email text,
                natural text
            );`
        ]

        await this.runQueries(queries.map(sql => ({ sql })))
    }

    private static async runQueries(queries: Query[]) {
        const db = this.getConnection()

        return new Promise<void>((resolve, reject) => {
            db.transaction(transaction => {
                for (const query of queries) {
                    transaction.executeSql(query.sql, query.args)
                }
            }, error => {
                console.error(`Error in transaction.`, error)
                reject(error)
            }, /* success */() => {
                console.log(`Transaction completed`)
                resolve()
            })
        })
    }

    
    static async runQuery(sql: Query['sql'], args?: Query['args']) {
        const db = this.getConnection()

        return new Promise<SQLite.SQLResultSet>((resolve, reject) => {
            db.transaction(transaction => {
                transaction.executeSql(sql, args, (tx, result) => {
                    resolve(result)
                }, (tx, error) => {
                    reject(error)
                    return true
                })
            }, error => {
                console.error(`Error in transaction.`, error)
                reject(error)
            }, /* success */() => {
                console.log(`Transaction completed`)
            })
        })
    }
}
