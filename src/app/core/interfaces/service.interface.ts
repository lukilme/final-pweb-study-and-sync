import { Observable } from "rxjs";

export interface ServiceInterface<T>{
   create(newObj : T): Observable<T>;
   read(key: string): Observable<T>;
   update(newObj: T, key:string): Observable<T>;
   delete(key : string): Observable<Object>;
   readAll(): Observable<T[]>;
}