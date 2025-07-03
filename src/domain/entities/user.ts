export interface User {
    id: string;
    full_name: string;
    email: string;
    password:string;
    phone_number?: string | null; // Optional field, can be undefined
    username?: string; // Optional field for username
    fingerprints?: any; // Optional field for fingerprints
    created_at?: Date; // Optional field for creation timestamp
    updated_at?: Date; // Optional field for last update timestamp
}