import { BookQueryType, BookType } from "@/types/book";
import request from "@/utils/request";
import qs from "qs";

export async function bookList(params?: BookQueryType) {
  return request.get(`/api/books?${qs.stringify(params)}`);
}

export async function bookAdd(params: BookType) {
  return request.post("/api/books", params);
}

export async function bookDelete(id: string) {
  return request.delete(`/api/delete/${id}`);
}
