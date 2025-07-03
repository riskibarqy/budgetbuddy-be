// src/application/dtos/UserDTO.ts
export interface CreateUserDTO {
  email: string;
  password: string;
  full_name: string;
  phone_number?: string | null; // Optional field, can be null
  username?: string; // Optional field for username
  fingerprints?: string[]; // Optional field for fingerprints
  created_at?: Date; // Optional field for creation timestamp
  updated_at?: Date; // Optional field for last update timestamp
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  phone_number?: string | null; // Optional field, can be null
  username?: string; // Optional field for username
}
