-- Add requested_date column to leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS requested_date VARCHAR(100);

-- Add comment to explain the column
COMMENT ON COLUMN leads.requested_date IS 'When the customer needs the service (e.g., "ahora", "hoy", "mañana")';

-- Add requested_date column to chat_interactions table too
ALTER TABLE chat_interactions ADD COLUMN IF NOT EXISTS requested_date VARCHAR(100);

COMMENT ON COLUMN chat_interactions.requested_date IS 'When the customer needs the service';
