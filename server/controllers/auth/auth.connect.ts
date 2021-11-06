import {Users} from "../../../models/Users";
import {dbConnect} from "../../tools/db/db.tools";
import {AuthResults} from "../../../models/AuthResults";
import {ErrorsText} from "../../tools/errors/errorCodes";
import {ErrorCodes} from "../../tools/errors/errorCodes";

const ObjectId = require('mongodb').ObjectID;

function sendAuthResults(docs: Users, password: string): AuthResults {
  let authResults;
  if (docs) {
    if (docs.password === password) {
      console.log("Login Successful");
      authResults = {
        credentials: {
          expiresIn: 7200,
          accessToken: '123',
        },
        object: docs,
        success: true,
        message: 'Login successful !'
      };
      return (authResults);
    } else {
      authResults = {
        credentials: null,
        object: null,
        success: false,
        message: 'Email or password incorrect.'
      };
      return (authResults);
    }
  } else {
    console.log("This email doesn't exist in our database.");
    authResults = {
      credentials: null,
      object: null,
      success: false,
      message: 'This email doesn\'t exist in our database.'
    };
    return (authResults);
  }
}

export const userConnectionWithLS = async (req: any, res: any) => {
  let authResults;
  try {
    const dbConnection = dbConnect('prostagma');
    console.log('Attempting to log in...');
    dbConnection.on('error', (err: any) => {
      console.error(err);
    });
    dbConnection.once('open', () => {
      const collection = dbConnection.collection('users');
      collection.findOne({email: req.body.email}, (err: any, doc: Users) => {
        authResults = sendAuthResults(doc, doc.password);
        dbConnection.close();
        return res.send(authResults);
      });
    });
  } catch (e) {
    throw Error(e);
  }
};

export const updateUserSocketId = async (req: any, res: any) => {
  try {
    const dbConnection = dbConnect('prostagma');
    console.log('Attempting to log in');
    dbConnection.on('error', (err: any) => {
      console.error(err);
    });
    dbConnection.once('open', () => {
      const collection = dbConnection.collection('users');
      collection.findOneAndUpdate({
        _id: ObjectId(req.query.userId)
      }, {
        $set: {
          socketId: req.query.socketId,
        }
      }, {
        returnOriginal: false
      }, (err: any, doc: any) => {
        return res.send(doc.value);
      });
    });
  } catch (e) {
    throw Error(e);
  }
};

export const getUserBySocketId = async (req: any, res: any) => {
  try {
    const dbConnection = dbConnect('prostagma');
    dbConnection.on('error', (err: any) => {
      console.error(err);
    });
    dbConnection.once('open', () => {
      const collection = dbConnection.collection('users');
      collection.find({socketId: {$in: req.query.socketIds}})
        .toArray((err: any, doc: Users[]) => {
          if (doc.length > 0) {
            return res.send(doc);
          } else
            return res.send(ErrorCodes.NO_CONTENT);
        });
    });
  } catch (e) {
    throw Error(e);
  }
};
export const signOutUser = async (req: any, res: any) => {
  try {
    let id;
    const dbConnection = dbConnect('prostagma');
    dbConnection.on('error', (err: any) => {
      console.error(err);
    });
    if (req.query.userID)
      id = req.query.userID;
    else
      id = req.body.userID;
    if (id) {
      dbConnection.once('open', () => {
        const collection = dbConnection.collection('users');
        collection.findOneAndUpdate({
          _id: ObjectId(id)
        }, {
          $set: {
            online: 0,
          }
        }, {
          returnOriginal: false
        }, (err: any, doc: any) => {
          console.log(doc.value);
          return res.send(doc);
        });
      });
    }
  } catch (e) {
    throw Error(e);
  }
};
export const userConnection = async (req: any, res: any) => {
  let authResults;
  try {
    const dbConnection = dbConnect('prostagma');
    console.log('Attempting to log in...');
    console.log('TA GRNAD MERE')
    dbConnection.on('error', (err) => {
      console.error(err);
    });
    dbConnection.once('open', () => {
      const collection = dbConnection.collection('users');
      collection.findOne({email: req.body.email}, ((err: any, docs: any) => {
        authResults = sendAuthResults(docs, req.body.password);
        if (authResults.success === true) {
          collection.findOneAndUpdate({
            _id: ObjectId(docs._id)
          }, {
            $set: {
              online: 1,
            }
          }, {
            returnOriginal: false
          }, (e: any, doc: any) => {
          });
        }
        dbConnection.close();
        return res.send(authResults);
      }));
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};
