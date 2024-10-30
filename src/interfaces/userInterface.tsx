export interface UserDTO {
  name: string;
  lastName: string;
  username: string;
  email: string;
}

export interface UserData {
  token: string;
  userDTO: UserDTO;
}