import {Users} from "../../../models/Users";
import {generateSchema} from "../../schemas/generateSchema";
import {dbConnect} from "../../tools/db/db.tools";
import {AuthResults} from "../../../models/AuthResults";
import {Credentials} from "../../../models/Credentials";

const mongoose = require("mongoose");
const userSchema = generateSchema(Users);

function sendAuthResults(err: any, data: Users): AuthResults {
  let authResults;
  const credential = new Credentials();
  credential.accessToken = '';
  credential.expiresIn = 0;
  if (err) {
    console.error(err);
    authResults = {
      credentials: credential,
      object: data,
      success: false,
      message: 'Failed to create account.'
    };
    return (authResults);
  } else {
    authResults = {
      credentials: {
        expiresIn: 7200,
        accessToken: '123',
      },
      object: data,
      success: true,
      message: 'Subscription successful !'
    };
    return (authResults);
  }
}

export const saveUser = async (req: any, res: any) => {
  try {
    let authResults;
    const dbConnection = dbConnect('prostagma');
    dbConnection.on('error', (err) => {
      console.error(err);
    });
    dbConnection.once('open', () => {
      const User = mongoose.model('User', userSchema);
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        isAdmin: 1,
        isAdminBool: 1,
        online: 1,
      });
      console.log(newUser);
      newUser.save((err: any, data: any) => {
        console.log(err);
        authResults = sendAuthResults(err, data);
        return res.send(authResults);
      });
    });
  } catch (e) {
    throw Error(e);
  }
};
