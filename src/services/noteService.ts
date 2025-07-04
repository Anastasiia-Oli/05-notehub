import axios from "axios";
import type { Note } from "../types/note";

const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api/notes";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  query: string,
  page: number
): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = {
    page: page,
    perPage: 12,
  };

  if (query.trim() !== "") {
    params.search = query;
  }

  const response = await axios.get<FetchNotesResponse>(BASE_URL, {
    params,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
}

export async function createNote(params: Omit<Note, "id">): Promise<Note> {
  const response = await axios.post<Note>(BASE_URL, params, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
}

export async function deleteNote(id: number): Promise<Note> {
  const response = await axios.delete<Note>(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
}
