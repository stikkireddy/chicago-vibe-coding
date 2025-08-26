'use server'

import { getDashboardTokens } from '@/lib/dashboard'
import { db } from '@/db'
import { devices } from '@/db/schema'
import { desc } from 'drizzle-orm'

export async function generateDashboardTokens() {
  try {
    const tokens = await getDashboardTokens()
    return {
      success: true,
      data: tokens
    }
  } catch (error) {
    console.error('Failed to generate dashboard tokens:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

export async function getScopedToken() {
  try {
    const tokens = await getDashboardTokens()
    return {
      success: true,
      token: tokens.scopedToken
    }
  } catch (error) {
    console.error('Failed to generate scoped token:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

export async function getDatabricksConfig() {
  try {
    const config = {
      instanceUrl: process.env.DATABRICKS_INSTANCE_URL,
      workspaceId: process.env.DATABRICKS_WORKSPACE_ID,
      dashboardId: process.env.DATABRICKS_DASHBOARD_ID
    }

    // Validate that all required environment variables are present
    if (!config.instanceUrl || !config.workspaceId || !config.dashboardId) {
      const missing = []
      if (!config.instanceUrl) missing.push('DATABRICKS_INSTANCE_URL')
      if (!config.workspaceId) missing.push('DATABRICKS_WORKSPACE_ID')
      if (!config.dashboardId) missing.push('DATABRICKS_DASHBOARD_ID')
      
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
    }

    return {
      success: true,
      data: config
    }
  } catch (error) {
    console.error('Failed to get Databricks config:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

// Device types to choose from randomly
const deviceTypes = [
  "iPhone 15 Pro",
  "Samsung Galaxy S24",
  "Google Pixel 8", 
  "OnePlus 12",
  "iPhone 14",
  "Samsung Galaxy A54",
  "Xiaomi 13 Pro",
  "Nothing Phone (2)",
  "Sony Xperia 1 V",
  "Motorola Edge 40"
]

// Random locations
const locations = [
  "Warehouse A - Bay 1",
  "Warehouse A - Bay 2", 
  "Warehouse B - Entry",
  "Production Floor - Line 1",
  "Production Floor - Line 2",
  "Production Floor - Line 3",
  "QC Station 1",
  "QC Station 2",
  "Cold Storage Area",
  "Shipping Dock 1",
  "Shipping Dock 2",
  "Mobile - Warehouse",
  "Office Area - Floor 1",
  "Office Area - Floor 2",
  "Loading Bay A",
  "Loading Bay B"
]

// Function to generate random device data based on deviceId
function generateDeviceData(deviceId: string) {
  // Use deviceId as seed for consistent random data for the same device
  const seed = deviceId.charCodeAt(0) + deviceId.charCodeAt(1) + deviceId.length
  const pseudoRandom = (seed * 9301 + 49297) % 233280
  
  const typeIndex = Math.abs(pseudoRandom) % deviceTypes.length
  const locationIndex = Math.abs(pseudoRandom * 2) % locations.length
  const deviceNumber = Math.abs(pseudoRandom) % 99 + 1
  
  return {
    name: `Phone ${String.fromCharCode(65 + (Math.abs(pseudoRandom) % 26))}${deviceNumber}`,
    type: deviceTypes[typeIndex],
    location: locations[locationIndex],
    status: 'online' as const
  }
}

export async function getDevices() {
  try {
    const result = await db.select().from(devices).orderBy(desc(devices.timestamp))
    
    // Enhance each device with generated data
    const enhancedDevices = result.map(device => ({
      ...device,
      ...generateDeviceData(device.deviceId)
    }))
    
    return {
      success: true,
      data: enhancedDevices
    }
  } catch (error) {
    console.error('Failed to fetch devices:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      data: []
    }
  }
}

export async function createDevice() {
  try {
    const result = await db.insert(devices).values({}).returning()
    
    // Enhance with generated data
    const enhancedDevice = {
      ...result[0],
      ...generateDeviceData(result[0].deviceId)
    }
    
    return {
      success: true,
      data: enhancedDevice
    }
  } catch (error) {
    console.error('Failed to create device:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

// Function to seed some initial data if needed
export async function seedDevices() {
  try {
    const seedData = []
    for (let i = 0; i < 25; i++) {
      seedData.push({}) // Just insert with default values (deviceId and timestamp)
    }

    const result = await db.insert(devices).values(seedData).returning()
    
    // Enhance with generated data
    const enhancedResult = result.map(device => ({
      ...device,
      ...generateDeviceData(device.deviceId)
    }))
    
    return {
      success: true,
      data: enhancedResult,
      count: result.length
    }
  } catch (error) {
    console.error('Failed to seed devices:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}