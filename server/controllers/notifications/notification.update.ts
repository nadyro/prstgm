import {Notifications} from "../../../models/Notifications";
import {dbConnect} from "../../tools/db/db.tools";
import {ChatRequests} from "../../../models/ChatRequests";

export const updateChatRequestNotifications = async function (req) {
  try {
    const dbConnection = dbConnect('prostagma');
    dbConnection.on('error', function (err) {
      console.error(err);
    });
    dbConnection.once('open', () => {
      const collection = dbConnection.collection('notifications');
    });
  } catch (e) {
    throw (e);
  }
};
