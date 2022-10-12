import './note-card.scss';
import { CgPen, CgTrash, CgCloseR, CgCheckR } from 'react-icons/cg';
import TextareaAutosize from 'react-textarea-autosize';
import { useEffect, useRef, useState } from 'react';
import { request } from '../../notesService';

export default function NoteCard({ title, text, _id, loadNotes }) {
  const [editableText, setEditableText] = useState(text);
  const [editableTitle, setEditableTitle] = useState(title);
  const [isEdit, setIsEdit] = useState(false);
  const editWrap = useRef(null);

  const handleSaveEdit = async (e) => {
    if (editableText !== text || editableTitle !== title) {
      await request(
        '/notes/' + _id,
        'PATCH',
        JSON.stringify({ text: editableText, title: editableTitle })
      );
      loadNotes();
    }
    setIsEdit(false);
  };

  const handleDelete = async (e) => { 
    // eslint-disable-next-line no-restricted-globals
    const answer = confirm('Are you sure you want to delete note?')
    if(answer) {
      await request(
        '/notes/' + _id,
        'DELETE'
      );
      loadNotes();
    }
  }

  const handleOutsideClick = (e) => {
    if (editWrap && !editWrap.current.contains(e.target)) {
      setIsEdit(false);
    }
  };

  useEffect(() => {
    if (isEdit) {
      setTimeout(() => {
        // в SetTimeout для того чтобы не сработал клик по иконке "Редактировать"
        document.addEventListener('click', handleOutsideClick);
      }, 0);
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }
  }, [isEdit]);

  return (
    <div className="note_card" ref={editWrap}>
      {isEdit ? (
        <>
          <TextareaAutosize
            className="title_input"
            defaultValue={editableTitle}
            onChange={(e) => {
              setEditableTitle(e.target.value);
            }}
          />
          <TextareaAutosize
            defaultValue={editableText}
            autoFocus
            onFocus={(e) =>
              (e.target.selectionStart = e.target.selectionEnd = text.length)
            }
            onChange={(e) => setEditableText(e.target.value)}
          />
          <div className="action_icons">
            <CgCheckR
              style={{ color: 'rgb(9, 204, 9)' }}
              title="Сохранить"
              onClick={handleSaveEdit}
            />
            <CgCloseR title="Отменить" />
          </div>
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{text}</p>
          <div className="action_icons">
            <CgPen title="Изменить" onClick={() => setIsEdit(true)} />
            <CgTrash title="Удалить" onClick={handleDelete} />
          </div>
        </>
      )}
    </div>
  );
}
