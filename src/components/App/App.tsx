import { useState } from "react";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
// import toast from "react-hot-toast";
import NoteModal from "../NoteModal/NoteModal";
import SearchBox from "../SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import Pagination from "../Pagination/Pagination";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedQuery] = useDebounce(query, 300);

  const { data, refetch } = useQuery({
    queryKey: ["notes", debouncedQuery, page],
    queryFn: () => fetchNotes(debouncedQuery, page),
    // enabled: debouncedQuery !== "",
    placeholderData: keepPreviousData,
  });

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onChange={handleSearch} />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {data && data.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}
      {data?.notes.length === 0 && <p>No notes found</p>}
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <NoteModal onClose={() => setIsModalOpen(false)} refetch={refetch} />
      )}
    </div>
  );
}

export default App;
