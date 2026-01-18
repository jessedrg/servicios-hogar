-- Add telegram_group_id column to leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS telegram_group_id TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS buyer_email TEXT;
