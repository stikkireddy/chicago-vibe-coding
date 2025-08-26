'use client'

import { useState } from 'react'
import { generateDashboardTokens } from '@/app/actions'
import { Button } from '@/components/ui/button'

interface TokenInfoResponse {
  authorization_details: unknown;
  [key: string]: unknown;
}

interface DashboardTokens {
  oidcToken: string
  tokenInfo: TokenInfoResponse
  scopedToken: string
}

export function DashboardTokenButton() {
  const [tokens, setTokens] = useState<DashboardTokens | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateTokens = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await generateDashboardTokens()
      
      if (result.success && result.data) {
        setTokens(result.data)
      } else {
        setError(result.error || 'Failed to generate tokens')
      }
    } catch {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleClearTokens = () => {
    setTokens(null)
    setError(null)
  }

  return (
    <div className="w-full max-w-4xl">
      <div className="flex gap-4 mb-6">
        <Button 
          onClick={handleGenerateTokens}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading ? 'Generating...' : 'Generate Dashboard Tokens'}
        </Button>
        
        {tokens && (
          <Button 
            onClick={handleClearTokens}
            variant="outline"
          >
            Clear Results
          </Button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Error:</h3>
          <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
        </div>
      )}

      {tokens && (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">
              ✓ Dashboard Tokens Generated Successfully
            </h3>
            
            <div>
              <h4 className="font-medium mb-2">Scoped Token:</h4>
              <code className="bg-white dark:bg-gray-800 p-3 rounded text-xs break-all block border">
                {tokens.scopedToken}
              </code>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}