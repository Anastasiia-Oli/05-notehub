import axios from "axios";
import type { Note } from "../types/note";

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api/notes";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  query: string,
  page: number
): Promise<FetchNotesResponse> {
  const response = await axios.get<FetchNotesResponse>(BASE_URL, {
    params: {
      search: query,
      page: page,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
}

export async function createNote(params: Note) {
  const response = await axios.post(BASE_URL, {
    params,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
}

export async function deleteNote(id: number) {
  const response = await axios.delete(BASE_URL, {
    params: {
      id: id,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
}
