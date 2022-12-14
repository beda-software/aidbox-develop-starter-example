export interface User {
  readonly resourceType: "User";
  id?: string;
  email: string;
  password: string;
  data?: any;
  emailConfirmed?: boolean;
  meta?: any;
}
