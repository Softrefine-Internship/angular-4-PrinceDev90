export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  phone: string;
  role: 'admin' | 'moderator' | 'user';
  username: string;
}
