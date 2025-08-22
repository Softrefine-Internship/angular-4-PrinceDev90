import { Injectable, signal } from '@angular/core';
import { User } from 'src/app/interfaces/user.model';

@Injectable({
  providedIn: 'root',
})
export class DataTableServiceService {
  constructor() {}
  private users = signal<User[]>([]);
  isLoading = signal<boolean>(true);

  allUsers = this.users.asReadonly();

  async fetchUsers() {
    try {
      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();
      this.isLoading.set(false);

      this.users.set(
        data.users.map((user: User) => {
          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            gender: user.gender,
            phone: user.phone,
            role: user.role,
            username: user.username,
          };
        })
      );
    } catch (err) {
      console.error(err);
    }
  }
}
