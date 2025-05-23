// Base entity with common fields
export interface BaseEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
}

// Timestamp without ID for nested objects
export interface Timestamp {
  created_at: Date;
  updated_at: Date;
}