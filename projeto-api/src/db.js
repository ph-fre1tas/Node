import Database from "better-sqlite3";

const db = new Database('database.db', { verbose: console.log });

// modo Write-Ahead Logging para máxima performance
db.pragma('journal_mode = WAL');