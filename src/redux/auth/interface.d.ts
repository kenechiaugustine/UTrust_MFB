interface IUser {
  isDeleted: boolean;
  _id: string;
  email: string;
  isEmailVerified: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  isPhoneVerified: boolean;
  authToken: string;
  createdAt: string;
  updatedAt: string;
  accountNumber: string;
  accountBalance: number;
  role: string;
  __v: number;
}
