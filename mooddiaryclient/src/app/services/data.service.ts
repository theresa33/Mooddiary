import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntryListPage } from '../pages/entry-list/entry-list.page';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private API = 'http://localhost:3000';
  public currentEntry;

  constructor(private httpClient: HttpClient) { }

  getAllEntries(): Observable<any> {
    return this.httpClient.get(this.API+'/entries');
  }

  getEntryByID(id: string): Observable<any> {
    return this.httpClient.get(`${this.API}/entries/${id}`);
  }

  insertNewEntry(entry: any): Observable<any> {
    return this.httpClient.post(`${this.API}/entries`,entry);
  }

  insertNewDate(date: any): Observable<any> {
    return this.httpClient.post(`${this.API}/dates`,date)
  }

  getAllDates(): Observable<any> {
    return this.httpClient.get(this.API+'/dates');
  }

  deleteEntrybyID(id: string): Observable<any> {
    return this.httpClient.delete(`${this.API}/entries/${id}`);
  }

  insertNewUser(user: any): Observable<any> {
    return this.httpClient.post(`${this.API}/user/register`,user);
  }

  loginUser(user: any): Observable<any>{
    return this.httpClient.post(`${this.API}/user/login`,user);
  }

}
