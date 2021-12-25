# Cheetos

## Boomerang Airline Reservation System 

### Why have we implemented this project?
Boomerang Airline Reservation System was created to make it easier for users to reserve round trips through different options and airlines and be able to choose the best routes or flights according to their preferences.

### Screenshots

### Used Frameworks:
This project was implemented using MERN stack,so for someone to use/edit this project they need a basic understanding of React.js, HTML,& CSS which were used for the frontend and Node.js  which was used for the backend in addition to JavaScript.

### Useful Extra Features:
* The user can email himself/herself their reservation itinerary at any time.
* The reserved seats can be edited at any time even after paying for the flight reservation.
* The departure/return flights can be changed at any time even after paying for the reservation(taking into account that the price difference will have to be paid).
* The users can view all their previous bookings or history at any time using “My bookings”.

### Softwares that need to be downloaded:
* Install VS Code or any similar IDE https://code.visualstudio.com/download 
* Install NodeJs  https://nodejs.org/en/download/ 

### How was our project tested:
There were two ways used for testing. As for testing backend alone,  it was by sending requests using postman. For testing the frontend alone, dummy values were used to make sure that the desired functionalities were executed correctly .When frontend and backend were both ready we connected them and tested the whole system and its functionalities and requirements.


### Step-by-step guide on how to use and run this project:
* Clone the full-stack branch in the repository on your VS Code 
* Create your own .env file which includes: 
    * mongoURI = //your mongoDB URL
    * PORT = //your server port number to run the server
    * PORTA = //your client port number to run the user interface
    * JWT_SECRET = //any string of your choice to use in hashing the users’ passwords
* In your VS Code terminal in order to run the server you’ll run the following commands
    * “cd Cheetos”
    * “cd server”
    * “npm i”
    * “node app.js”
* In your VS Code terminal in order to run the client you’ll run the following commands
    * “cd Cheetos”
    * “cd client”
    * “npm i”
    * “npm start”

### Useful Links and Credits:
* https://dev.to/salarc123/mern-stack-authentication-tutorial-part-1-the-backend-1c57
* https://www.geeksforgeeks.org/node-js-crud-operations-using-mongoose-and-mongodb-atlas/ 
* https://blog.logrocket.com/mern-stack-tutorial/ 
* https://reactjs.org/docs/create-a-new-react-app.html 
* https://nodemailer.com/about/
