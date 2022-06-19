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
  private isLoggedIn = false;
  // public userId;

  constructor(private httpClient: HttpClient) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = isLoggedIn ? JSON.parse(isLoggedIn) : false;
  }

  getEntriesByUser(): Observable<any> {
    // const userId = this.getUserId();
    // return this.httpClient.get(`${this.API}/entries/?userId=${userId}`, {withCredentials:true});
    return this.httpClient.get(`${this.API}/entries`);

  }

  getEntryByID(id: string): Observable<any> {
    return this.httpClient.get(`${this.API}/entries/${id}`);
  }

  insertNewEntry(entry: any): Observable<any> {
    return this.httpClient.post(`${this.API}/entries`,entry);
  }

  insertNewDate(date: any): Observable<any> {
    return this.httpClient.post(`${this.API}/dates`,date);
  }

  getDatesByUser(): Observable<any> {
    // return this.httpClient.get(`${this.API}/dates/${user}`);
     return this.httpClient.get(`${this.API}/dates`);
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

  setLoggedIn(loggedIn: boolean){
    this.isLoggedIn = loggedIn;
    localStorage.setItem('isLoggedIn', loggedIn.toString());
    console.log('setLoggedIn' + loggedIn);
  }

  getLoggedIn(): boolean{
    console.log('getLoggedIn' + this.isLoggedIn);
    return this.isLoggedIn;
  }

  // getUserId(): string{
  //   console.log('ca: ' + this.userId);
  //   if(!!this.userId) return this.userId;
  //   const userId = localStorage.getItem('userId');
  //   console.log('ls: ' + userId);
  //   return userId;
  // }

  // setUserId(userId: string ){
  //   localStorage.setItem('userId', userId.toString());
  //   this.userId = userId;
  // }

}
