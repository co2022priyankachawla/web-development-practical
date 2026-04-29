import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts?_limit=10';

  async getItems(): Promise<any[]> {
    const response = await fetch(this.apiUrl);
    return await response.json();
  }
}
