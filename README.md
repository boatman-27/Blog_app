# Blog App

Greetings and welcome to my Blog web application!

This platform, crafted with React and Node.js, offers users the ability to register, login, and engage with a community of bloggers. The login credentials are securely stored in a locally hosted PostgreSQL database. Once logged in, users can peruse existing blog posts, contribute their own, and even enrich their posts with relevant tags. A distinctive feature allows users to search for blogs based on these tags, enhancing the overall user experience.

## Installation 
To get started, open two separate terminal interfaces.

First Terminal: Setting up the Server

1. Navigate to the server folder by entering ```cd server```.


2. Run ```npm install``` to seamlessly install the necessary dependencies for the server side.

3. Ensure that your PostgreSQL database is locally hosted and configured appropriately. If not already installed, follow the necessary steps to set up PostgreSQL locally on your machine. Update the database connection details in the server code to reflect your local setup.
Run the server by executing npm start in the terminal.

4. Run ```nodemon index.js``` in the termianl to run the server.

#
Second Terminal: Setting up the Client

1. Navigate to the client folder using ```cd client/blog```.
2. Run ```npm install``` to install the required dependencies for the client side.
3. Run the client by executing ```npm start``` in the terminal.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.
