const mysql = require("mysql2/promise");
const fs = require("fs");
const csv = require("csv-parser");
require("dotenv").config();

// MySQL connection
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

// Create table (if not exists)
async function createTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS ug_programs (
            id INT PRIMARY KEY AUTO_INCREMENT,
            program_name VARCHAR(255),
            total_offers INT,
            total_registered INT,
            percentage DECIMAL(5,2),
            min_salary DECIMAL(10,2),
            max_salary DECIMAL(10,2),
            avg_salary DECIMAL(10,2)
        );
    `;

    try {
        await pool.query(query);
        console.log("Table created successfully!");
    } catch (error) {
        console.error("Error creating table:", error);
    }
}

// Import CSV data into MySQL
async function importData(filePath) {
    return new Promise((resolve, reject) => {
        const queries = []; // Store all insert queries

        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                const programNameKey = Object.keys(row).find(key => key.trim() === "UG Program Details");
            
                const queryPromise = pool.query(
                    "INSERT INTO ug_programs (program_name, total_offers, total_registered, percentage, min_salary, max_salary, avg_salary) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    [
                        row[programNameKey]?.trim() || "Unknown", // Get value dynamically
                        parseInt(row["Total offers"], 10) || 0,
                        parseInt(row["Total Registered **"], 10) || 0,
                        parseFloat(row["Percentage"]) || 0.0,
                        parseFloat(row["Min Salary"]) || 0.0,
                        parseFloat(row["Max Salary"]) || 0.0,
                        parseFloat(row["Avg. Salary"]) || 0.0,
                    ]
                ).catch(error => console.error("Error inserting data:", error));
            
                queries.push(queryPromise);
            })
            
            .on("end", async () => {
                try {
                    await Promise.all(queries); // Wait for all queries to finish
                    console.log("Data import completed!");
                    await pool.end(); // Now close the connection safely
                    resolve();
                } catch (error) {
                    reject(error);
                }
            })
            .on("error", reject);
    });
}

// Run the script
async function main() {
    await createTable();
    await importData("data/Book2.csv");
}

main().catch(console.error);
