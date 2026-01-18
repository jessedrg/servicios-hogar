-- Add buyer_telegram_id column to leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS buyer_telegram_id VARCHAR(255);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_leads_buyer_telegram_id ON leads(buyer_telegram_id);
