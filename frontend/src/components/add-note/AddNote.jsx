import { useState } from 'react';
import { request } from '../../notesService';
import './add-note.scss';

export default function AddNote({ setOpen, loadNotes }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    await request('/notes', 'POST', JSON.stringify({ title, text }));
    loadNotes();
    setOpen(false);
  };
  return (
    <form className="form" onSubmit={handleSubmitForm}>
      <div className="row_btn">
        <button>Сохранить</button>
        <button type="button" onClick={() => setOpen(false)}>
          Закрыть
        </button>
      </div>
      <input
        type="text"
        name="title"
        placeholder="Заголовок..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        name="text"
        id=""
        cols="30"
        rows="10"
        placeholder="Текст записи..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
    </form>
  );
}
