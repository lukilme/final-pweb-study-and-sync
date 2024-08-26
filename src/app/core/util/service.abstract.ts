import { Observable } from "rxjs";
import { ServiceInterface } from "../interfaces/service.interface";
import { HttpClient } from "@angular/common/http";

/**
 * This abstract class defines a base implementation for services that interact with a backend API.
 * It provides methods for CRUD (Create, Read, Update, Delete) operations on a specific data type (T).
 * Subclasses need to implement the `URL_TARGET` property to specify the target API endpoint.
 */
export abstract class ServiceAbstract<T> implements ServiceInterface<T> {
  /**
   * The target URL for the service's API endpoint. This property needs to be implemented by subclasses.
   */
  URL_TARGET: string = "";

  /**
   * Constructor for the abstract service class.
   * @param httpClient: The HttpClient instance used to make HTTP requests.
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Reads a single data object by its key.
   * @param key: The unique identifier of the data object.
   * @returns: An Observable that emits the data object of type T if successful.
   */
  read(key: string): Observable<T> {
    return this.httpClient.get<T>(`${this.URL_TARGET}/${key}`);
  }

  /**
   * Updates an existing data object.
   * @param newObj: The updated data object of type T.
   * @param key: The unique identifier of the data object to update.
   * @returns: An Observable that emits the updated data object of type T if successful.
   */
  update(newObj: T, key: string): Observable<T> {
    return this.httpClient.put<T>(`${this.URL_TARGET}/${key}`, newObj);
  }

  /**
   * Deletes a data object by its key.
   * @param key: The unique identifier of the data object to delete.
   * @returns: An Observable that emits an empty object if successful.
   */
  delete(key: string): Observable<Object> {
    return this.httpClient.delete(`${this.URL_TARGET}/${key}`);
  }

  /**
   * Reads all data objects.
   * @returns: An Observable that emits an array of data objects of type T.
   */
  readAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.URL_TARGET);
  }

  /**
   * Creates a new data object.
   * @param newT: The new data object of type T.
   * @returns: An Observable that emits the newly created data object of type T if successful.
   */
  create(newT: T): Observable<T> {
    return this.httpClient.post<T>(this.URL_TARGET, newT);
  }

  /**
   * Reads data objects based on a specific key-value pair in the query string.
   * @param key: The key to filter by.
   * @param value: The value to match for the key.
   * @returns: An Observable that emits an array of data objects of type T that match the filter criteria.
   */
  readBy(key: string, value: string): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.URL_TARGET}?${key}=${value}`);
  }

  /**
   * Retrieves paginated data from the target URL.
   * @param limit - The number of items per page.
   * @param page - The current page number (1-based).
   * @returns An Observable that emits an array of data objects of type T corresponding to the specified page and limit.
   */
  pagination(limit: number, page: number): Observable<Object> {
    return this.httpClient.get<Object>(
      `${this.URL_TARGET}?_page=${page}&_per_page=${limit}`
    );
  }
}
