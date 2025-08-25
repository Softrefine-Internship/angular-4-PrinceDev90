import { USER_TYPOS } from '../enums/user.enum';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  phone: string;
  role: USER_TYPOS.ADMIN | USER_TYPOS.MODERATOR | USER_TYPOS.USER;
  username: string;
}
