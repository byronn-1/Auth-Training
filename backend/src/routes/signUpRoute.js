import { getDbconnection } from "../db";

import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* 
Here the route object has a path to route to.
HTTP method.
and a handler (talks to the db)
    1.firstly it gets the email and password that is sen by the frontend.
    2.get a connection to the db
    3.find if a user already exists in the bd using the email
    4.if the user already exists send error message back to the client
    5.encrypt the password
    6.create object to store additional information about the user
    7.create and insert all information including additional info object 
    8.When mongo inserts into the document it assigns an id we can destructure this

    Generate A JWT:
    Objective: generate a JWT with all this info to send back to client so it can be stored and used
    1.use the jwt sign method pass all the data (object) we want to include in the jwt
    2.pass in the secret
    3.pass in how long the JWT should last
    4.callback that will be called when the token is actually read

    NOTE: we have to add -r dotenv/config to the json in the startup script:
            It makes the server set up all the env variables when the server starts up :)
*/
export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const db = getDbConnection("react-auth-db");
    const user = await db.collection("users").findOne({ email });

    if (user) {
      res.sendStatus(409);
    }

    const passwordHash = await bycrypt.hash(password, 10);

    const startingInfo = {
      hairColor: "",
      favouriteFood: "",
      bio: "",
    };

    const result = await db.collection("users").insertOne({
      email,
      passwordHash,
      info: startingInfo,
      isVerified: false,
    });
    const { insertedId } = result;

    jwt.sign(
      {
        id: insertedId,
        email,
        info: startingInfo,
        isVerified: false,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "2d",
      },

      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.staus(200).json({ token });
      }
    );
  },
};
