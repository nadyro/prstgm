import {generateSchema} from "../../schemas/generateSchema";
import {dbConnect} from "../../tools/db/db.tools";
import {Notifications} from "../../../models/Notifications";
import {ChatRequests} from "../../../models/ChatRequests";
import {Conversation} from "../../../models/Conversation";
import {Message} from "../../../models/Message";

const ObjectId = require('mongodb').ObjectID;

const mongoose = require("mongoose");
const notificationSchema = generateSchema(Notifications);
const chatRequestSchema = generateSchema(ChatRequests);
const conversationSchema = generateSchema(Conversation);

export async function initNewConversation(req: any, res: any) {
  try {
    const dbConnection = dbConnect('prostagma');
    dbConnection.on('error', (err) => {
      console.error(err);
    });
    dbConnection.once('open', () => {
      const ConversationModel = mongoose.model('Conversation', conversationSchema);
      const collection = dbConnection.collection('conversations');
      collection.findOneAndUpdate({chatRequestId: req.query.chatRequestId}, {
        $set: {
          lastOpenedDate: Date.now()
        }
      }, {returnOriginal: false}, (err: any, doc: any) => {
        console.log(doc);
        let newConversation = doc.value;
        if (newConversation) {
          console.log('Conversation already exists. Resume chatting ! :)');
          res.send(newConversation);
        } else {
          console.log('New convo ! Have Fun !');
          newConversation = new ConversationModel({
            chatRequestId: req.query.chatRequestId,
            chatRequest: req.query.chatRequest,
            message: new Message(),
            startingDate: req.query.startingDate,
            lastOpenedDate: req.query.lastOpenedDate,
          });
          newConversation.save((e: any, data: Conversation | any) => {
            if (!e) {
              res.send(data);
            } else {
              return null;
            }
          })
        }
      })
    })
  } catch (e) {
    throw Error(e);
  }
}

export async function initChatRequest(req: any, res: any) {
  try {
    const dbConnection = dbConnect('prostagma');
    dbConnection.on('error', (err) => {
      console.error(err);
    });
    dbConnection.once('open', () => {
      const Notification = mongoose.model('Notification', notificationSchema);
      const ChatRequest = mongoose.model('ChatRequest', chatRequestSchema);
      const collection = dbConnection.collection('chatrequests');
      collection.findOneAndUpdate({
        $and: [
          {roomId: {$regex: ".*" + req.query.requester._id + ".*"}},
          {roomId: {$regex: ".*" + req.query.recipient._id + ".*"}}
        ]
      }, {
        $set: {
          requesterSocketId: req.query.requesterSocketId,
          fulfilled: req.query.fulfilled
        }
      }, {returnOriginal: false}, (error: any, doc: any) => {
        const chatRequest: ChatRequests = doc.value;
        if (chatRequest) {
          const newNotification = new Notification({
            requesterId: req.query.requesterId,
            recipientId: req.query.recipientId,
            dateEmitted: Date.now(),
            objectId: chatRequest._id,
            objectName: req.query.objectName,
            seen: false,
          });
          newNotification.save((err: any, notification: any) => {
            if (err) {
              console.log(err);
            }
            res.send(chatRequest);
          });
        } else {
          const newChatRequest = new ChatRequest({
            recipientSocketId: req.query.recipientSocketId,
            requesterSocketId: req.query.requesterSocketId,
            roomId: req.query.roomId,
            requester: req.query.requester,
            recipient: req.query.recipient,
            creationDate: req.query.creationDate,
            fulfilled: req.query.fulfilled
          });
          newChatRequest.save((er: any, data: ChatRequests | any) => {
            if (!er) {
              const newNotification = new Notification({
                requesterId: req.query.requesterId,
                recipientId: req.query.recipientId,
                dateEmitted: Date.now(),
                objectId: data._id,
                objectName: req.query.objectName,
                seen: false,
              });
              newNotification.save((e: any, notification: any) => {
                if (e) {
                  console.log(e);
                }
                res.send(data);
              });
            } else {
              return null;
            }
          })
        }
      });
    });
  } catch (e) {
    throw (e);
  }
}

export const getAllChatRequests = async (req: any, res: any) => {
  try {
    const dbConnection = dbConnect('prostagma');
    dbConnection.on('error', (err) => {
      console.error(err);
    });
    dbConnection.once('open', () => {
      const collection = dbConnection.collection('chatrequests');
      collection.find({}).toArray((err, chatRequests: ChatRequests[]) => {
        if (chatRequests) {
          console.log('existing');
        } else {
          console.log('not existing');
        }
        res.send(chatRequests);
      });
    })
  } catch (e) {
    throw (e);
  }
};

export const getChatRequests = async (req: any, res: any) => {
  try {
    const chatRequestsToReturn: ChatRequests[] = new Array<ChatRequests>();
    const dbConnection = dbConnect('prostagma');
    dbConnection.on('error', (err) => {
      console.error(err);
    });
    dbConnection.once('open', () => {
      const collection = dbConnection.collection('chatrequests');
      collection.find({}).toArray((err, chatRequest: ChatRequests[]) => {
        chatRequest.forEach(cr => {
          if (cr.recipient._id === req.body.recipientId || cr.requester._id === req.body.recipientId) {
            chatRequestsToReturn.push(cr);
          }
        });
        res.send(chatRequestsToReturn);
      });
    })
  } catch (e) {
    throw (e);
  }
};

export const updateChatRequest = async (req: any, res: any) => {
  try {
    const dbConnection = dbConnect('prostagma');
    dbConnection.on('error', (err) => {
      console.error(err);
    });
    dbConnection.once('open', () => {
      const collection = dbConnection.collection('chatrequests');
      collection.findOneAndUpdate({
        _id: ObjectId(req.query._id)
      }, {
        $set: {
          recipientSocketId: req.query.recipientSocketId,
          fulfilled: req.query.fulfilled
        }
      }, {
        returnOriginal: false
      }, (err: any, doc: any) => {
        res.send(doc.value);
      });
    });
  } catch (e) {
    throw (e);
  }
};

