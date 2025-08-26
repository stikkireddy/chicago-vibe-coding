import { getDashboardTokens } from '@/lib/dashboard'

export async function ScopedTokenDisplay() {
  try {
    const tokens = await getDashboardTokens()
    
    return (
      <div className="w-full max-w-4xl">
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
    )
  } catch (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 w-full max-w-4xl">
        <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Error:</h3>
        <p className="text-red-700 dark:text-red-300 text-sm">
          {error instanceof Error ? error.message : 'Failed to generate dashboard tokens'}
        </p>
      </div>
    )
  }
}