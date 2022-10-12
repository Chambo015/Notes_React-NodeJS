import Note from '../models/Note.js';
import { validationResult } from 'express-validator';

// @desc    Create note
// @route   POST /notes
export const create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.mapped());
    }

    const doc = new Note({
      title: req.body.title,
      text: req.body.text,
      style: { bgColor: req.body.bgColor },
    });

    const note = await doc.save({
      timestamps: { createdAt: true, updatedAt: false },
    });
    res.status(200).json(note);
  } catch (err) {
    console.log(err);
    res.status(500).send('Не удалось создать Запись');
  }
};

// @desc    Read all notes
// @route   GET /notes
export const getAll = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    console.log(err);
    res.status(500).send('Не удалось получить Записи');
  }
};

// @desc    Read note
// @route   GET /notes/:id
export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    Note.findById(id, (err, note) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Не удалось вернуть Запись с БД');
      }
      if (!note) {
        return res.status(404).send('Запись не найдена');
      }
      res.status(200).json(note);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Не удалось получить Запись');
  }
};

// @desc    Update note
// @route   PUT /notes/:id
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    Note.findOneAndUpdate(
      { _id: id },
      {
        title: req.body.title,
        text: req.body.text,
        style: { bgColor: req.body.bgColor },
      },
      { new: true },
      (err, updateNote) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Не удалось вернуть Запись с БД');
        }
        if (!updateNote) {
          return res.status(404).send('Запись не найдена');
        }
        res.status(200).json(updateNote);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('Не удалось обновить Запись');
  }
};

// @desc    Delete note
// @route   DELETE /notes/:id
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    Note.findByIdAndDelete(id, (err, note) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({ message: 'Не удалось вернуть Запись с БД' });
      }
      if (!note) {
        return res.status(404).send({ message: 'Запись не найдена' });
      }
      res.status(200).json({ success: true, id });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Не удалось удалить Запись' });
  }
};
