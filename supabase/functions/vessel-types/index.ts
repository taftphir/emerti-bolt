import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
}

interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  table: string;
}

interface VesselTypeRequest {
  action: 'getAll' | 'create' | 'update' | 'delete';
  config: DatabaseConfig;
  id?: number;
  data?: any;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const requestBody = await req.json()
    const { action, config, id, data }: VesselTypeRequest = requestBody

    // Validate required fields
    if (!action || !config) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: action and config' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create PostgreSQL client
    const client = new Client({
      user: config.user,
      database: config.database,
      hostname: config.host,
      port: config.port,
      password: config.password,
      tls: {
        enforce: false
      }
    })

    try {
      await client.connect()
    } catch (connectError) {
      console.error('Database connection failed:', connectError)
      return new Response(
        JSON.stringify({ 
          error: 'Database connection failed',
          details: connectError.message 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    let result;

    switch (action) {
      case 'getAll':
        result = await client.queryArray(
          `SELECT id, name, description, max_speed, fuel_capacity, engine_count, color, created_at, updated_at 
           FROM ${config.table} 
           ORDER BY id`
        )
        
        const vesselTypes = result.rows.map(row => ({
          id: row[0],
          name: row[1],
          description: row[2],
          max_speed: row[3],
          fuel_capacity: row[4],
          engine_count: row[5],
          color: row[6] || '#3b82f6',
          created_at: row[7],
          updated_at: row[8]
        }))

        await client.end()
        return new Response(
          JSON.stringify({ vessel_types: vesselTypes }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'create':
        const insertResult = await client.queryArray(
          `INSERT INTO ${config.table} (name, description, max_speed, fuel_capacity, engine_count, color, created_at, updated_at) 
           VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) 
           RETURNING id, name, description, max_speed, fuel_capacity, engine_count, color, created_at, updated_at`,
          [
            data.name,
            data.description,
            data.max_speed || data.maxSpeed,
            data.fuel_capacity || data.fuelCapacity,
            data.engine_count || data.engineCount,
            data.color
          ]
        )

        const newVesselType = {
          id: insertResult.rows[0][0],
          name: insertResult.rows[0][1],
          description: insertResult.rows[0][2],
          max_speed: insertResult.rows[0][3],
          fuel_capacity: insertResult.rows[0][4],
          engine_count: insertResult.rows[0][5],
          color: insertResult.rows[0][6],
          created_at: insertResult.rows[0][7],
          updated_at: insertResult.rows[0][8]
        }

        await client.end()
        return new Response(
          JSON.stringify({ vessel_type: newVesselType }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'update':
        const updateResult = await client.queryArray(
          `UPDATE ${config.table} 
           SET name = $1, description = $2, max_speed = $3, fuel_capacity = $4, engine_count = $5, color = $6, updated_at = NOW()
           WHERE id = $7 
           RETURNING id, name, description, max_speed, fuel_capacity, engine_count, color, created_at, updated_at`,
          [
            data.name,
            data.description,
            data.max_speed || data.maxSpeed,
            data.fuel_capacity || data.fuelCapacity,
            data.engine_count || data.engineCount,
            data.color,
            id
          ]
        )

        if (updateResult.rows.length === 0) {
          await client.end()
          return new Response(
            JSON.stringify({ error: 'Vessel type not found' }),
            { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        const updatedVesselType = {
          id: updateResult.rows[0][0],
          name: updateResult.rows[0][1],
          description: updateResult.rows[0][2],
          max_speed: updateResult.rows[0][3],
          fuel_capacity: updateResult.rows[0][4],
          engine_count: updateResult.rows[0][5],
          color: updateResult.rows[0][6],
          created_at: updateResult.rows[0][7],
          updated_at: updateResult.rows[0][8]
        }

        await client.end()
        return new Response(
          JSON.stringify({ vessel_type: updatedVesselType }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'delete':
        const deleteResult = await client.queryArray(
          `DELETE FROM ${config.table} WHERE id = $1 RETURNING id`,
          [id]
        )

        if (deleteResult.rows.length === 0) {
          await client.end()
          return new Response(
            JSON.stringify({ error: 'Vessel type not found' }),
            { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        await client.end()
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      default:
        await client.end()
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

  } catch (error) {
    console.error('Database error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Database connection failed',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})