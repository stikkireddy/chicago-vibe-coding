import { uuid, timestamp, pgSchema } from 'drizzle-orm/pg-core';

const appSchema = pgSchema('app');

export const devices = appSchema.table('devices', {
  deviceId: uuid('device_id').primaryKey().defaultRandom(),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
});