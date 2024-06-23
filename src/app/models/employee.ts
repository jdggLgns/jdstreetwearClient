export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface Employee {
  id: number;
  user: User;
  phone: string;
  job: string;
}
