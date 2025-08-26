"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Plus, RefreshCw } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getDevices, seedDevices, createDevice } from "@/app/actions"

interface Device {
  deviceId: string
  name: string
  type: string
  status: string
  location: string
  timestamp: Date
}

// Format timestamp to relative time
function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  } else if (diffMinutes > 0) {
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
  } else {
    return 'Just now'
  }
}

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch devices from database
  const fetchDevices = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await getDevices()
      if (result.success) {
        // Convert timestamp strings to Date objects
        const devicesWithDates = result.data.map(device => ({
          ...device,
          timestamp: new Date(device.timestamp)
        }))
        setDevices(devicesWithDates)
      } else {
        setError(result.error || 'Failed to fetch devices')
      }
    } catch (err) {
      setError('Failed to fetch devices')
    } finally {
      setLoading(false)
    }
  }

  // Seed sample data if needed
  const handleSeedData = async () => {
    setLoading(true)
    try {
      const result = await seedDevices()
      if (result.success) {
        await fetchDevices() // Refresh the list
      } else {
        setError(result.error || 'Failed to seed devices')
      }
    } catch (err) {
      setError('Failed to seed devices')
    }
  }

  // Add a new device
  const handleAddDevice = async () => {
    try {
      const result = await createDevice()
      if (result.success) {
        await fetchDevices() // Refresh the list
      } else {
        setError(result.error || 'Failed to add device')
      }
    } catch (err) {
      setError('Failed to add device')
    }
  }

  useEffect(() => {
    fetchDevices()
  }, [])

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || device.type === typeFilter
    return matchesSearch && matchesType
  })

  const uniqueTypes = Array.from(new Set(devices.map(d => d.type))).sort()

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Devices</h1>
          <p className="text-muted-foreground">
            Manage and monitor your connected devices
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchDevices} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleAddDevice} disabled={loading}>
            <Plus className="mr-2 h-4 w-4" />
            Add Device
          </Button>
          <Button variant="outline" onClick={handleSeedData} disabled={loading}>
            <Plus className="mr-2 h-4 w-4" />
            Seed Data
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/15 text-destructive px-4 py-2 rounded-md">
          Error: {error}
        </div>
      )}

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter by Type
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setTypeFilter("all")}>
              All Types
            </DropdownMenuItem>
            {uniqueTypes.map(type => (
              <DropdownMenuItem key={type} onClick={() => setTypeFilter(type)}>
                {type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Registered</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="flex items-center justify-center">
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Loading devices...
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredDevices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  {devices.length === 0 ? (
                    <div className="flex flex-col items-center gap-2">
                      <span>No devices found in database.</span>
                      <Button onClick={handleSeedData} variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Seed Sample Data
                      </Button>
                    </div>
                  ) : (
                    "No devices match your search criteria."
                  )}
                </TableCell>
              </TableRow>
            ) : (
              filteredDevices.map((device) => (
                <TableRow key={device.deviceId}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{device.name}</span>
                      <span className="text-sm text-muted-foreground">{device.deviceId}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span>{device.type}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                      {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{device.location}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {getTimeAgo(device.timestamp)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Showing {filteredDevices.length} of {devices.length} devices
        </div>
        <div className="flex items-center space-x-2">
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  )
}