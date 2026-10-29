import Database from "better-sqlite3";

const db = new Database('database.db', { verbose: console.log });

// modo Write-Ahead Logging para máxima performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
        CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50) NOT NULL,
        description VARCHAR (150)
        );
        CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INT NOT NULL,
        title VARCHAR(50) NOT NULL,
        status TEXT NOT NULL CHECK(
            status IN ('pendente', 'em andamento', 'concluída')
        ),
        FOREIGN KEY (project_id) REFERENCES projects(id)
        );
    `);

const project = db.prepare(`
    INSERT INTO projects (name, description) VALUES
    (?, ?);
    `).run('Biblioteca virtual', 'Biblioteca virtual para alunos da faculdade');

db.prepare(`
    INSERT INTO tasks (project_id, title, status) VALUES 
    (?, ?, ?);
    `).run(project.lastInsertRowid, 'Ligar API', 'em andamento');

db.prepare(`
    INSERT INTO tasks (project_id, title, status) VALUES
    (?, ?, ?);
    `).run(project.lastInsertRowid, 'Criar Login', 'pendente');