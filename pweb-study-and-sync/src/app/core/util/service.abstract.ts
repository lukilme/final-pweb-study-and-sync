import { Observable } from "rxjs";
import { ServiceInterface } from "../interfaces/service.interface";
import { HttpClient } from "@angular/common/http";

interface loginData{
  email: string,
  password: string
}

export abstract class ServiceAbstract<T>{

  URL_TARGET: string = "";


  protected constructor(protected httpClient: HttpClient) {}


  read(key: string): Observable<T> {
    return this.httpClient.get<T>(`${this.URL_TARGET}/${key}`);
  }

  update(newObj: T, key: string): Observable<T> {
    return this.httpClient.put<T>(`${this.URL_TARGET}/${key}`, newObj);
  }

  delete(key: string): Observable<Object> {
    return this.httpClient.delete(`${this.URL_TARGET}/${key}`);
  }
  readAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.URL_TARGET);
  }

  create(newT: T, URL: string = this.URL_TARGET): Observable<T> {
    console.log(newT)
    return this.httpClient.post<T>(URL, newT);
  }

  readBy(key: string, value: string, URL: string = this.URL_TARGET): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.URL_TARGET}?${key}=${value}`);
  }


  pagination(limit: number, page: number, sortField?: string): Observable<Object> {
    const sortParam = sortField ? `&_sort=${sortField}` : '';
    return this.httpClient.get<Object>(
      `${this.URL_TARGET}?_page=${page}&_per_page=${limit}${sortParam}&_order=asc`
    )}
}
