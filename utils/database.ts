import {createPool} from 'mysql2/promise'
import {config} from "../config/config";

export const database = createPool({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
    decimalNumbers: true,
    namedPlaceholders: true,
});

