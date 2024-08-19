import { Observable } from "rxjs";

export interface Service<T>{
   create(newObj : T): Observable<T>;
   read(key: string): Observable<T>;
   update(newObj: T): Observable<T>;
   delete(key : string): Observable<Object>;
   readAll(): Observable<T[]>;
}