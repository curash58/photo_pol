import os

# List of file extensions to create inside each folder
file_types = [".css", ".jsx"]

# Template for the .jsx file content
text = """import React from 'react';

const {file_base_name} = () => {{
  return (
    <div>
      {file_base_name}
    </div>
  );
}}

export default {file_base_name};
"""

def create_folders_with_files(base_path, folder_names):
    # List to keep track of component export statements for index.js
    exports = []

    for folder_name in folder_names:
        # Convert folder name to lowercase with hyphens for folder creation
        folder_path = os.path.join(base_path, folder_name.lower().replace(" ", "-"))
        
        # Create the folder if it doesn't exist
        os.makedirs(folder_path, exist_ok=True)
        
        # Format file base name (PascalCase)
        file_base_name = folder_name.title().replace(" ", "")
        
        # Create files in each folder based on file_types list
        for file_extension in file_types:
            file_path = os.path.join(folder_path, f"{file_base_name}{file_extension}")
            with open(file_path, 'w') as file:
                if file_extension == ".jsx":
                    file.write(text.format(file_base_name=file_base_name))
            print(f"Created file: '{file_path}'")
        
        # Add export statement for the index.js file
        export_statement = f"export {{ default as {file_base_name} }} from './{folder_name.lower().replace(' ', '-')}/{file_base_name}';"
        exports.append(export_statement)
        
        print(f"Finished creating folder '{folder_path}' with necessary files.")

    # Create the index.js file with all exports
    index_file_path = os.path.join(base_path, "index.js")
    with open(index_file_path, 'w') as index_file:
        index_file.write("\n".join(exports))
    
    print(f"Created 'index.js' at '{index_file_path}' with component exports.")

def main():
    # Step 1: Ask if the user wants to create folders in the current directory or choose another
    choice = input("Do you want to create folders in the current directory? (y/n): ").strip().lower()
    if choice == "y":
        base_path = os.getcwd()  # Use the current working directory
    else:
        base_path = input("Enter the path where you want to create folders and files: ").strip()
    
    # Step 2: Get folder and file names from the user
    folder_names_input = input("Enter the folder and file names, separated by commas (e.g., Navbar, Footer, About us): ")
    folder_names = [name.strip() for name in folder_names_input.split(",")]
    
    # Step 3: Create folders and files, and the index.js file
    create_folders_with_files(base_path, folder_names)

if __name__ == "__main__":
    main()
