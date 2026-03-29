import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ContactRequest } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // Simulated preload data
  private mockData: ContactRequest = {
    name: '',//'David Tabaka',
    email: '', //'david@example.com',
    message: '', //'Hello, I have a question about your API.'
  };

  getContact(): Observable<ContactRequest> {
    // Simulate network latency
    return of(this.mockData).pipe(delay(500));
  }

  submitContact(request: ContactRequest): Observable<boolean> {
    console.log('Sending to API:', request);
    return of(true).pipe(delay(500));
  }
}

//HTTP version below
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { ContactRequest } from './contact.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class ContactService {

//   private readonly baseUrl = '/api/contact'; 
//   // Adjust to match your APIM route or Minimal API endpoint

//   constructor(private http: HttpClient) {}

//   getContact(): Observable<ContactRequest> {
//     return this.http.get<ContactRequest>(this.baseUrl);
//   }

//   submitContact(request: ContactRequest): Observable<void> {
//     return this.http.post<void>(this.baseUrl, request);
//   }
// }
