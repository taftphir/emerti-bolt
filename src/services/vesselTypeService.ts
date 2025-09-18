import { supabase } from '../lib/supabase';
import { UnitType, VesselTypeDB, ApiResponse } from '../types/database';

// Database configuration from environment variables
const DB_CONFIG = {
  host: import.meta.env.VITE_DB_HOST,
  port: parseInt(import.meta.env.VITE_DB_PORT || '5432'),
  user: import.meta.env.VITE_DB_USER,
  password: import.meta.env.VITE_DB_PASSWORD,
  database: import.meta.env.VITE_DB_NAME,
  table: import.meta.env.VITE_DB_TABLE || 'unit_type'
};

class VesselTypeService {
  // Get all vessel types from PostgreSQL
  async getAllVesselTypes(): Promise<ApiResponse<UnitType[]>> {
    try {
      // Call Supabase Edge Function to query PostgreSQL
      const { data, error } = await supabase.functions.invoke('vessel-types', {
        body: {
          action: 'getAll',
          config: DB_CONFIG
        }
      });

      if (error) {
        console.error('Error fetching vessel types:', error);
        return {
          success: false,
          error: error.message || 'Failed to fetch vessel types'
        };
      }

      return {
        success: true,
        data: data.vessel_types || []
      };
    } catch (error) {
      console.error('Service error:', error);
      return {
        success: false,
        error: 'Network error occurred'
      };
    }
  }

  // Create new vessel type
  async createVesselType(vesselType: Omit<UnitType, 'id'>): Promise<ApiResponse<UnitType>> {
    try {
      const { data, error } = await supabase.functions.invoke('vessel-types', {
        body: {
          action: 'create',
          config: DB_CONFIG,
          data: vesselType
        }
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Failed to create vessel type'
        };
      }

      return {
        success: true,
        data: data.vessel_type
      };
    } catch (error) {
      console.error('Service error:', error);
      return {
        success: false,
        error: 'Network error occurred'
      };
    }
  }

  // Update vessel type
  async updateVesselType(id: number, vesselType: Partial<UnitType>): Promise<ApiResponse<UnitType>> {
    try {
      const { data, error } = await supabase.functions.invoke('vessel-types', {
        body: {
          action: 'update',
          config: DB_CONFIG,
          id,
          data: vesselType
        }
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Failed to update vessel type'
        };
      }

      return {
        success: true,
        data: data.vessel_type
      };
    } catch (error) {
      console.error('Service error:', error);
      return {
        success: false,
        error: 'Network error occurred'
      };
    }
  }

  // Delete vessel type
  async deleteVesselType(id: number): Promise<ApiResponse<boolean>> {
    try {
      const { data, error } = await supabase.functions.invoke('vessel-types', {
        body: {
          action: 'delete',
          config: DB_CONFIG,
          id
        }
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Failed to delete vessel type'
        };
      }

      return {
        success: true,
        data: true
      };
    } catch (error) {
      console.error('Service error:', error);
      return {
        success: false,
        error: 'Network error occurred'
      };
    }
  }
}

export const vesselTypeService = new VesselTypeService();