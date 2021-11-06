import {Users} from "../../../models/Users";
import {dbConnect} from "../../tools/db/db.tools";

const ObjectId = require('mongodb').ObjectID;

export const getUsers = async (req: any, res: any) => {
  try {
    const dbConnection = dbConnect('prostagma');
    dbConnection.on('error', (err) => {
      console.error(err);
    });
    dbConnection.once('open', () => {
      const collection = dbConnection.collection('users');
      collection.find({online: 1}).toArray((err, docs: any) => {
        if (docs) {
          return res.send(docs);
        } else {
          const notFoundUsers = {
            status: 400,
            message: 'No users to fetch.'
          };
          return res.send(notFoundUsers);
        }
      });
    })
  } catch (e) {
    throw Error(e);
  }
};

export const getUserById = async (req: any, res: any) => {
  try {
    let id = '';
    console.log('WEEEEESH');
    const dbConnection = dbConnect('prostagma');
    dbConnection.on('error', (err) => {
      console.error(err);
    });
    if (req.query.id)
      id = req.query.id;
    else
      id = req.body.id;

    console.log('USER' + id);
    dbConnection.once('open', () => {
      const collection = dbConnection.collection('users');
      collection.findOne({_id: ObjectId(id)}, (err, doc: any) => {
        if (doc) {
          if (res) {
            return res.send(doc);
          } else {
            return (doc);
          }
        } else {
          if (err) {
            return ({
              status: 400,
              message: 'Something went wrong',
              error: err
            });
          } else {
            const notFoundUser = {
              status: 400,
              message: 'No user found with id=' + req.query.id,
            };
            return res.send(notFoundUser);
          }
        }
      });
    })
  } catch (e) {
    throw Error(e);
  }
};


export const getUserByEmail = async (req: any, res: any) => {
  try {
    const dbConnection = dbConnect('prostagma');
    dbConnection.on('error', (err) => {
      console.error(err);
    });
    dbConnection.once('open', () => {
      const collection = dbConnection.collection('users');
      collection.findOne({email: req.body.email}, (err, doc: any) => {
        if (doc) {
          return res.send(doc);
        } else {
          const notFoundUser = {
            status: 400,
            message: 'No user found with email=' + req.body.email,
          };
          return res.send(notFoundUser);
        }
      });
    });
  } catch (e) {
    throw Error(e);
  }
};
