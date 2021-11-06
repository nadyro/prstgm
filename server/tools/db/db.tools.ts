import * as mongoose from 'mongoose';


export function dbConnect(database: string): mongoose.Connection {
  mongoose.connect('mongodb://localhost/' + database, {useNewUrlParser: true});
  const db = mongoose.connection;
  return db;
}
