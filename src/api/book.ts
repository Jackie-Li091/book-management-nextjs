import { BookQueryType } from "@/types/book";
import request from "@/utils/request";
import qs from "qs";

export async function bookList(params?: BookQueryType) {
  return request.get(`/api/books?${qs.stringify(params)}`);;
}
