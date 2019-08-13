import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from 'src/app/_models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
      // ${config.apiUrl}
      return this.http.get<User[]>(`/users`);
  }

  getById(id: number) {
      return this.http.get<User>(`/users/${id}`);
  }

  register(user: User) {
      return this.http.post(`/users/register`, user);
  }

  update(user: User) {
      return this.http.put(`/users/update/${user.id}`, user);
  }

  delete(id: number) {
      return this.http.delete(`/users/${id}`);
  }
}
