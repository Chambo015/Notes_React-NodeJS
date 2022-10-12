import { Suspense, useCallback, useEffect, useState } from 'react';
import AddNote from '../../components/add-note/AddNote';
import Header from '../../components/header/Header';
import NoteCard from '../../components/note-card/NoteCard';
import { request } from '../../notesService';
import './notes-page.scss';
const bgImage =
  'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';

export default function NotesPage() {
  const [isAddNote, setAddNote] = useState(false);
  const [notes, setNotes] = useState([]);

  const loadNotes = useCallback(async () => {
    const data = await request('/notes', 'GET');
    setNotes(data);
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return (
    <div className="notes_page">
      <Header title="Мои Записи" bgImage={bgImage} />
      <main className="container">
        <button className="item_btn" onClick={() => setAddNote(!isAddNote)}>
          Новая запись
        </button>
        {isAddNote && <AddNote setOpen={setAddNote} loadNotes={loadNotes} />}

        <section className="cards_block">
          {notes.map((note) => {
            return <NoteCard {...note} key={note._id} loadNotes={loadNotes} />;
          })}
        </section>
      </main>
    </div>
  );
}
