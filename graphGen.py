import pandas as pd
import matplotlib.pyplot as plt

# Load data from CSV
df = pd.read_csv("output.csv")

# Ensure the data has exactly two columns for plotting
if len(df.columns) == 2:
    x, y = df.columns  # Extract column names
    plt.figure(figsize=(8, 5))
    plt.bar(df[x], df[y], color="skyblue")
    plt.xlabel(x)
    plt.ylabel(y)
    plt.title(f"{y} by {x}")
    plt.xticks(rotation=45)
    plt.show()
else:
    print("Graph generation requires exactly two columns (X, Y).")
