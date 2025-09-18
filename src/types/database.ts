// Database types for PostgreSQL integration
export interface UnitType {
  id: number;
  name: string;
  description?: string;
  max_speed?: number;
  fuel_capacity?: number;
  engine_count?: number;
  color?: string;
  created_at?: string;
  updated_at?: string;
}

export interface VesselTypeDB extends UnitType {
  // Additional fields that might exist in the database
  active?: boolean;
  category?: string;
  specifications?: any;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  table: string;
}