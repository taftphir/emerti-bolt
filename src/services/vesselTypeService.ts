import { supabase } from '../lib/supabase';
import { UnitType, VesselTypeDB, ApiResponse } from '../types/database';

// Database configuration from environment variables
const DB_CONFIG = {
  host: import.meta.env.VITE_DB_HOST || '103.94.238.6',
  port: parseInt(import.meta.env.VITE_DB_PORT || '5432'),
  user: import.meta.env.VITE_DB_USER || 'odoo16',
  password: import.meta.env.VITE_DB_PASSWORD || 'p3r3str01k4',
  database: import.meta.env.VITE_DB_NAME || 'hcml_backup',
  table: import.meta.env.VITE_DB_TABLE || 'unit_type'
};

// Transform VesselType to UnitType
const transformToUnitType = (vesselType: Partial<VesselType>): Omit<UnitType, 'id'> => ({
  name: vesselType.name || '',
  description: vesselType.description,
  max_speed: vesselType.maxSpeed || 0,
  fuel_capacity: vesselType.fuelCapacity || 0,
  engine_count: vesselType.engineCount || 1,
  color: vesselType.color
});

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