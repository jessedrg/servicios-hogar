-- Add credit_cost column to leads table for dynamic pricing
ALTER TABLE leads ADD COLUMN IF NOT EXISTS credit_cost INTEGER DEFAULT 1;

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_partner_status ON leads(partner_id, status);

-- Update existing leads to have default credit cost
UPDATE leads SET credit_cost = 1 WHERE credit_cost IS NULL;
