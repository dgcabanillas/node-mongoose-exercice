import mongoose from 'mongoose';

export const dbConnection = (dbURI: string) => {
  mongoose.connect(dbURI)
    .then(() => console.log('connected'))
    .catch(() => console.log('error on connection'));

  mongoose.connection.on('error', () => console.log('Error on db connection'));
  mongoose.connection.once('connected', () => console.log('db connected'));
}