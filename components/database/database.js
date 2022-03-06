import mysql2 from "mysql2";

const connection = mysql2.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DB,
    password: process.env.USER_PASS
});

async function createPeopleTable() {
    const sql = `CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        height INT NOT NULL,
        age INT NOT NULL
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

    await connection.promise().query(sql);
    console.log("Created People Table");
};

export default {createPeopleTable};