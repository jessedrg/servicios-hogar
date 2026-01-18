-- Add dynamic pricing columns to leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_price INTEGER DEFAULT 20;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS estimated_job_min INTEGER DEFAULT 80;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS estimated_job_max INTEGER DEFAULT 200;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS urgency TEXT DEFAULT 'normal';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS complexity TEXT DEFAULT 'medio';

-- Update partners to use euro balance instead of credits
-- 1 credit old = 20€ new
ALTER TABLE partners ADD COLUMN IF NOT EXISTS balance_euros INTEGER DEFAULT 0;

-- Migrate existing credits to euros (1 credit = 20€)
UPDATE partners SET balance_euros = credits * 20 WHERE balance_euros = 0 OR balance_euros IS NULL;

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_lead_price ON leads(lead_price);
CREATE INDEX IF NOT EXISTS idx_partners_balance ON partners(balance_euros);
