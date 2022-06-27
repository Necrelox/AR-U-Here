import {knex} from 'knex';

export interface ErrorDatabase extends Error {
    code?: string;
    errno?: number;
    sqlState?: string;
    sqlMessage?: string;
    sql?: string;
    stack?: string;
}

export class DatabaseKnex {
    private static instance: any;

    public static initializeDatabasePool() {
        DatabaseKnex.instance = knex({
            client: 'mysql2',
            connection: {
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
            },
            pool: {
                min: 0,
                max: 10,
            },
            acquireConnectionTimeout: 10000,
        })
    }

    public static createBetterSqlMessageError(sqlCode: string, sqlMessage: string) {
        if (sqlCode === 'ER_DUP_ENTRY') {
            const messageSplit = sqlMessage.split('\'');
            const value = messageSplit[1];
            const column = (messageSplit[3]?.split('.')[1])?.split('_')[0];
            return `This ${column} : ${value} is already used.`;
        }
        return sqlMessage;
    }

    public static getInstance() {
        return DatabaseKnex.instance;
    }
}
