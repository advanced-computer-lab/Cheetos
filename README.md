# Cheetos

## Boomerang Airline Reservation System 

### Why have we implemented this project?
Boomerang Airline Reservation System was created to make it easier for users to reserve round trips through different options and airlines and be able to choose the best routes or flights according to their preferences.

### Current Build Status of the project:
The project build status now is completed successfully with no current errors.

### Our Coding Style was:
It was the standard one.
* Use 2 spaces for indentation.
* Use double quotes for strings.
* Add a space after keywords.
* Add a space before a function declaration's parentheses.
* For multi-line if statements, use curly braces.
* Always handle the err function parameter.


### Screenshots
This is the Sign In page where the user can enter their username and password.

![WhatsApp Image 2021-12-25 at 8 51 46 PM (2)](https://user-images.githubusercontent.com/89047287/147393310-ee9964b4-e9b4-4070-9c6d-2f4fb9a7c409.jpeg)

This is the Sign Up page where the user can sign up for the website. 

![WhatsApp Image 2021-12-25 at 8 51 47 PM](https://user-images.githubusercontent.com/89047287/147393345-6752077d-49d5-4f5b-bf88-bf5b16a76719.jpeg)

The user can search for flights using search criteria including Departure Airport, Arrival Airport, Departure Date, Arrival Date 

![WhatsApp Image 2021-12-25 at 8 51 46 PM](https://user-images.githubusercontent.com/89047287/147393447-cf04e288-2455-4a24-93ee-3a7bf6ab4a6d.jpeg)

![WhatsApp Image 2021-12-25 at 8 51 46 PM (1)](https://user-images.githubusercontent.com/89047287/147393449-9b630e56-4095-425a-a009-32ea54b16fe8.jpeg)

![WhatsApp Image 2021-12-25 at 8 51 45 PM](https://user-images.githubusercontent.com/89047287/147393455-f12fc2b4-5cf0-4b0f-a09a-c35bda97f432.jpeg)

### Used Frameworks:
This project was implemented using MERN stack,so for someone to use/edit this project they need a basic understanding of React.js, HTML & CSS which were used for the frontend and Node.js  which was used for the backend in addition to JavaScript and Express Js and MongoDB Atlas was used for the database.

### Useful Extra Features:
* The user can email himself/herself their reservation itinerary at any time.
* The departure/return flights can be changed at any time even after paying for the reservation(taking into account that the price difference will have to be paid).
* The users can view all their previous bookings or history at any time using “My bookings”.

### Some Code Examples
Veryfing Token for the user 
```verifyJwT = (req, res, next) => {
  const token = req.headers["x-access-token"]?.split(" ")[1];
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res.json({
          isLoggedIn: false,
          message: "Failed To Authenticate",
        });
      req.user = {};
      req.user._id = decoded.id;
      req.user.UserName = decoded.username;
      next();
    });
  } else {
    res.json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
};
```

### Softwares that need to be downloaded:
* Install VS Code or any similar IDE https://code.visualstudio.com/download 
* Install NodeJs  https://nodejs.org/en/download/ 

### API References that we included are:
* NodeMailer: https://nodemailer.com/about/
* Stripe: https://stripe.com/docs/api 

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

### How can you contribute to the project:
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.
As for pushing guidelines: 
  * Create a separate branch for your modifications if it is your first time to modify, if not commit to your previously created branch.
  * You should always resolve conflicts and make sure that no changes that were made previously are lost. 

### Useful Links and Credits:
* https://dev.to/salarc123/mern-stack-authentication-tutorial-part-1-the-backend-1c57
* https://www.geeksforgeeks.org/node-js-crud-operations-using-mongoose-and-mongodb-atlas/ 
* https://blog.logrocket.com/mern-stack-tutorial/ 
* https://reactjs.org/docs/create-a-new-react-app.html 
* https://nodemailer.com/about/
