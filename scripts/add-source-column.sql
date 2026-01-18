-- Add source column to leads table to track where leads come from
ALTER TABLE leads ADD COLUMN IF NOT EXISTS source VARCHAR(50) DEFAULT 'chat';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS session_id VARCHAR(100);

-- Update existing leads to have chat as source
UPDATE leads SET source = 'chat' WHERE source IS NULL;
