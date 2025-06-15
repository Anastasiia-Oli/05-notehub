// import { useState } from 'react'
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
// import { fetchNotes, createNote, deleteNote } from "../../services/noteService";

function App() {
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        <button className={css.button}>Create note +</button>
      </header>
      <NoteList />
    </div>
  );
}

export default App;
