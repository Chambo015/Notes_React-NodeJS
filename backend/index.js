import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';

import { noteValidator } from './middleware/validations.js';
import * as NoteController from './controllers/noteController.js';

mongoose
  .connect(process.env.MONGO_URL)
  .then((conn) => console.log('MongoDB connected', conn.connection.host))
  .catch((err) => console.log('MongoDB Error: ', err));

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app
  .route('/api/notes')
  .post(noteValidator, NoteController.create)
  .get(NoteController.getAll);
app
  .route('/api/notes/:id')
  .get(NoteController.getOne)
  .patch(NoteController.update)
  .delete(NoteController.remove);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'))
  );
} else {
  app.get('/', (req, res) => res.send('Установите режим production'))
}

app.listen(port, (err) => {
  if (err) {
    console.log('Error server: ', err);
  }
  console.log('Server ok, port listen ', port);
});
