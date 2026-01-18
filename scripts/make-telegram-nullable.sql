-- Make telegram_chat_id nullable since partners are now created manually without Telegram
ALTER TABLE partners ALTER COLUMN telegram_chat_id DROP NOT NULL;
