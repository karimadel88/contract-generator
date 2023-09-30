Prerequisites
Before you begin, ensure you meet the following requirements:

Node.js and npm (Node Package Manager): You'll need Node.js and npm installed on your development machine. Follow these steps to set them up:
Installing Node.js and npm
For macOS and Linux:
Open your terminal.

Install Node Version Manager (nvm), which allows you to manage Node.js versions:

# Install nvm using curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

or using wget:

# Install nvm using wget
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

Make sure to replace v0.39.1 with the latest version if necessary.

Close and reopen your terminal, or run the following command to apply changes:

source ~/.bashrc  # Or source ~/.zshrc for Zsh users

Install Node.js and npm using nvm:
nvm install node

Verify that Node.js and npm were successfully installed:

node -v
npm -v


#For Windows:

Visit the official Node.js website.

Download the latest LTS (Long Term Support) version for Windows (64-bit).

#Run the installer and follow the installation instructions.

Note: If you prefer using Yarn over npm, you can install Yarn globally using npm with this command:

npm install -g yarn

Ensure that you've completed these steps to install Node.js and npm (or Yarn) on your development machine before proceeding with the project setup.

Step 2: Start the Server
Navigate to the back-end directory of your project and initiate the server:

bash
Copy code
# Navigate to the back-end directory
cd server

# Start the server using Yarn
yarn start
Your server is now up and running.

Step 3: Start the Front-end
Open a new terminal window, navigate to the front-end directory of your project, and launch the front-end development server:

bash
Copy code
# In a new terminal window, navigate to the front-end directory
cd client

# Start the front-end development server using Yarn
yarn dev
The front-end development server is now running.

Step 4: Access the Application
You can access the application in your web browser by opening http://localhost:5173.

Please keep in mind that these instructions assume your project structure and setup are correctly configured. If you encounter any issues during installation or startup, review your project's configuration and dependencies.
