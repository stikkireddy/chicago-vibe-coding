---
layout: two-cols
layoutClass: gap-16
---

# Database Choices

<v-clicks>

- **Databricks Lakehouse** → unified OLAP + OLTP (used in our app)
- **Delta Tables / Row Ingest** → real-time device data streaming
- **Drizzle ORM** → type-safe database operations (@app/src/db)

</v-clicks>

<div v-click class="mt-4 p-3 bg-gray-800 text-white rounded">
<strong>Why this stack:</strong> Databricks handles both analytics + real-time ingestion, Drizzle provides AI-friendly schema definitions with full TypeScript support
</div>

::right::

<div v-click class="mt-8">

```typescript
// From our @app/src/db/schema.ts
export const devices = pgTable('devices', {
  deviceId: varchar('device_id').primaryKey(),
  timestamp: timestamp('timestamp').defaultNow(),
}, (table) => ({
  schema: 'app'
}));

// Server actions for device operations
const newDevice = await db.insert(devices).values({
  deviceId: generateId(),
  timestamp: new Date()
});

// AI easily generates CRUD operations
const deviceList = await db.select().from(devices);
```

</div>