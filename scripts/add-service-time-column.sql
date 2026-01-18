-- Add service_time column to leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS service_time VARCHAR(50);
