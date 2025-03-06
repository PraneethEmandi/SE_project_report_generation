import mysql.connector
import pandas as pd
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
# from dotenv import load_dotenv
# import os

# dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
# load_dotenv(dotenv_path)

print('hj')
# Database connection
try:
    conn = mysql.connector.connect(
        host=os.getenv("MYSQL_HOST"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_PASSWORD"),
        database=os.getenv("MYSQL_DATABASE")
    )
    cursor = conn.cursor()
except mysql.connector.Error as err:
    print("Error: ", err)
    exit(1)
print("hi")
# Get user input for SQL query
query = input("Enter your SQL query: ")
cursor.execute(query)

# Fetch data
data = cursor.fetchall()
columns = [desc[0] for desc in cursor.description]  # Get column names
df = pd.DataFrame(data, columns=columns)

# Print DataFrame
print("\nRetrieved Data:")
print(df.to_string(index=False))  # Print without index for cleaner output
df.to_csv("output.csv", index=False)  # Saves data to output.csv
print("\nData saved to output.csv")

# Close connection
cursor.close()
conn.close()
