'use client'

import { useEffect, useState, useRef } from 'react'
import { getScopedToken, getDatabricksConfig } from '@/app/actions'
import { DatabricksDashboard } from '@databricks/aibi-client'

interface DatabricksConfig {
  instanceUrl: string;
  workspaceId: string;
  dashboardId: string;
}

export function DatabricksDashboardMount() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dashboardRef = useRef<any>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [config, setConfig] = useState<DatabricksConfig | null>(null)
  const [configLoaded, setConfigLoaded] = useState(false)

  // Effect to load configuration
  useEffect(() => {
    const loadConfig = async () => {
      try {
        console.log("Loading Databricks configuration...")
        const configResult = await getDatabricksConfig()
        
        if (!configResult.success || !configResult.data) {
          throw new Error(configResult.error || 'Failed to get Databricks configuration')
        }

        console.log("Configuration loaded:", configResult.data)
        setConfig(configResult.data)
        setConfigLoaded(true)
      } catch (err) {
        console.error("Failed to load configuration:", err)
        setError(err instanceof Error ? err.message : 'Failed to load configuration')
      }
    }

    loadConfig()
  }, [])

  useEffect(() => {
    if (!configLoaded || !config) {
      return // Wait for config to load
    }

    const setupDashboard = async () => {
      console.log("Setting up dashboard...")
      
      try {
        console.log("Checking container ref...")
        if (!containerRef.current) {
          console.log("Container ref not ready, will retry in 1s")
          return
        }

        // Only create dashboard once
        if (!dashboardRef.current) {
          console.log("Fetching token...")
          const tokenResult = await getScopedToken()
          
          console.log("tokenResult", tokenResult)
          if (!tokenResult.success || !tokenResult.token) {
            throw new Error(tokenResult.error || 'Failed to get token')
          }

          console.log("Token received, creating dashboard...")
          dashboardRef.current = new DatabricksDashboard({
            instanceUrl: config.instanceUrl,
            workspaceId: config.workspaceId,
            dashboardId: config.dashboardId,
            token: tokenResult.token,
            container: containerRef.current,
            colorScheme: 'light',
          })
        }


        console.log("Running dashboard.initialize()...")
        dashboardRef.current.initialize()
        console.log("Dashboard initialized successfully!")
        
        // Stop the interval once dashboard is initialized
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
          console.log("Stopped interval - dashboard ready!")
        }
        
      } catch (err) {
        console.error("Dashboard initialization failed:", err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
        
        // Stop interval on error too
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    }

    intervalRef.current = setInterval(setupDashboard, 1000)
    
    // Also run immediately
    setupDashboard()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [configLoaded, config])

  if (error) {
    return (
      <div className="w-full max-w-6xl">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Dashboard Error:</h3>
          <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (!configLoaded || !config) {
    return (
      <div className="w-full h-full">
        <div className="w-full h-full border rounded-lg shadow-sm bg-white dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Loading dashboard configuration...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <div 
        ref={containerRef}
        id="dashboard-container"
        className="w-full h-full border rounded-lg shadow-sm bg-white dark:bg-gray-900"
      />
    </div>
  )
}