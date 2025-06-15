import { useState } from "react";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes, deleteNote } from "../../services/noteService";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import NoteModal from "../NoteModal/NoteModal";
import SearchBox from "../SearchBox/SearchBox";
import { useDebounce } from "use-debounce";

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

  const handleDelete = async (id: number) => {
    try {
      await deleteNote(id);
      toast.success("City deleted");
      refetch();
    } catch {
      toast.error("Error deleting city");
    }
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
        <ReactPaginate
          pageCount={data.totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {data?.notes.length === 0 && <p>No notes found</p>}
      {data?.notes && <NoteList notes={data.notes} onDelete={handleDelete} />}
      {isModalOpen && (
        <NoteModal onClose={() => setIsModalOpen(false)} refetch={refetch} />
      )}
    </div>
  );
}

export default App;
