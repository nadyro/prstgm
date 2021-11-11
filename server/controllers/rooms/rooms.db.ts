import {generateSchema} from "../../schemas/generateSchema";
import {dbConnect} from "../../tools/db/db.tools";
import {Rooms} from "../../../models/Rooms";
import {ErrorCodes} from "../../tools/errors/errorCodes";
import * as DB_CONST from "../../tools/db/db.constants";

const mongoose = require("mongoose");

const roomSchema = generateSchema(Rooms);

export async function getRoomsByUserId(req: any, res: any) {
  try {
    const dbConnection = dbConnect(DB_CONST.DB_NAME);
    dbConnection.on('error', (err) => {
      console.error(err);
    });
    dbConnection.once('open', () => {
      const collection = dbConnection.collection(DB_CONST.DB_ROOMS);
      collection.find({'users._id': req.query._id}).toArray((err: any, doc: Rooms[] | any) => {
        if (doc) {
          res.send(doc);
        } else {
          res.sendStatus(ErrorCodes.NO_CONTENT);
        }
      });
    });
  } catch (e) {
    throw Error(e);
  }
}

export async function getAndUpdateRoomByChatRequestId(req: any, res: any) {
  try {
    const dbConnection = dbConnect(DB_CONST.DB_NAME);
    dbConnection.on('error', (err) => {
      console.error(err);
    });
    dbConnection.once('open', () => {
      const collection = dbConnection.collection(DB_CONST.DB_ROOMS);
      collection.findOneAndUpdate({chatRequestId: req.query._id}, {
        $set: {
          chatRequest: req.query,
          lastOpenedDate: Date.now()
        }
        // @ts-ignore
      }, {returnOriginal: false}, (err: any, doc: any) => {
        res.send(doc.value);
      })
    });
  } catch (e) {
    throw Error(e);
  }
}

export async function saveRoom(req: any, res: any) {
  try {
    const dbConnection = dbConnect(DB_CONST.DB_NAME);
    dbConnection.on('error', (err: any) => {
      console.error(err);
    });
    dbConnection.once('open', () => {
      const Room = mongoose.model(DB_CONST.MODEL_ROOMS, roomSchema);
      const collection = dbConnection.collection(DB_CONST.DB_ROOMS);
      collection.findOneAndUpdate({userIds: req.query.userIds}, {
        $set: {
          roomId: req.query.roomId,
          users: req.query.users,
          lastOpenedDate: Date.now()
        }
        // @ts-ignore
      }, {returnOriginal: false}, (err: any, doc: any) => {
        let newRoom = doc.value;
        if (newRoom) {
          console.log('Room already exists but we updated it. :)');
          res.send(newRoom);
        } else {
          console.log('New room !');
          newRoom = new Room({
            roomId: req.query.roomId,
            userIds: req.query.userIds,
            users: req.query.users,
            creationDate: Date.now(),
            lastOpenedDate: Date.now()
          });
          newRoom.save((e: any, data: Rooms | any) => {
            if (!e) {
              res.send(data);
            } else {
              return null;
            }
          })
        }
      })
    });
  } catch (e) {
    throw Error(e);
  }
}
