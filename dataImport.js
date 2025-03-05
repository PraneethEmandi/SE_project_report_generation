const mysql = require("mysql2");
const fs = require("fs");
const csv = require("csv-parser");
require("dotenv").config();

// Fix: Specify the database explicitly
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "SE_workingdata",  // ✅ FIXED: Ensuring database selection
    multipleStatements: true
}).promise();

// Function to create the database and tables
async function setupDatabase() {
  const createDBQuery = `
    CREATE DATABASE IF NOT EXISTS SE_workingdata;
  `;

  try {
    await pool.query(createDBQuery);
    console.log("Database created successfully!");

    // ✅ Reconnect to ensure DB selection
    await pool.query("USE SE_workingdata;");

    const createTablesQuery = `
      CREATE TABLE IF NOT EXISTS companies (
          id INT PRIMARY KEY AUTO_INCREMENT,
          company_name VARCHAR(255),
          offers INT
      );

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

      CREATE TABLE IF NOT EXISTS pg_programs (
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
    await pool.query(createTablesQuery);
    console.log("Tables created successfully!");
  } catch (error) {
    console.error("Error setting up database:", error);
  }
}

// Function to insert data into companies table
async function importCompanies(filePath) {
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", async (row) => {
      const companyName = row["Placed Company"];
      const offers = parseInt(row["Offers"], 10) || 0;

      if (companyName) {
        await pool.query("INSERT INTO companies (company_name, offers) VALUES (?, ?)", [companyName, offers]);
      }
    })
    .on("end", () => console.log("Companies data imported successfully!"));
}

// Function to insert data into UG programs table
async function importUGPrograms(filePath) {
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", async (row) => {
      await pool.query(
        "INSERT INTO ug_programs (program_name, total_offers, total_registered, percentage, min_salary, max_salary, avg_salary) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          row["UG Program Details"],
          parseInt(row["Total offers"], 10) || 0,
          parseInt(row["Total Registered **"], 10) || 0,
          parseFloat(row["Percentage"]) || 0.0,
          parseFloat(row["Min Salary"]) || 0.0,
          parseFloat(row["Max Salary"]) || 0.0,
          parseFloat(row["Avg. Salary"]) || 0.0,
        ]
      );
    })
    .on("end", () => console.log("UG Programs data imported successfully!"));
}

// Function to insert data into PG programs table
async function importPGPrograms(filePath) {
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", async (row) => {
      await pool.query(
        "INSERT INTO pg_programs (program_name, total_offers, total_registered, percentage, min_salary, max_salary, avg_salary) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          row["PG Program Details"],
          parseInt(row["Total offers"], 10) || 0,
          parseInt(row["Total Registered* *"], 10) || 0,
          parseFloat(row["Percentage"]) || 0.0,
          parseFloat(row["Min Salary"]) || 0.0,
          parseFloat(row["Max Salary"]) || 0.0,
          parseFloat(row["Avg. Salary"]) || 0.0,
        ]
      );
    })
    .on("end", () => console.log("PG Programs data imported successfully!"));
}

// Main function to run all imports
async function main() {
  await setupDatabase();
  await importCompanies("data/Book1.csv");
  await importUGPrograms("data/Book2.csv");
  await importPGPrograms("data/Book3.csv");

  setTimeout(() => {
    pool.end();
    console.log("Database connection closed.");
  }, 5000); // Give some time for all inserts to complete
}

main();
