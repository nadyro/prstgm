import {Schema} from 'mongoose';

export function generateSchema<T>(objectClass: T): Schema {
  const objToSchema = {};
  // @ts-ignore
  const newObject = new objectClass();
  const objKeys = Object.getOwnPropertyNames(newObject);
  objKeys.forEach(keys => {
    if (keys !== '_id') {
      const ob = {
        [keys]: typeof newObject[keys]
      };
      // @ts-ignore
      objToSchema[keys] = ob[keys];
    }
  });
  return new Schema(objToSchema);
}
