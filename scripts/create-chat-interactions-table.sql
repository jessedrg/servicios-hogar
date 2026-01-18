-- Create table for tracking ALL chat interactions (even incomplete leads)
CREATE TABLE IF NOT EXISTS chat_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'user', -- 'user' or 'assistant'
    step VARCHAR(50), -- 'initial', 'service', 'problem', 'city', 'phone', 'name'
    service VARCHAR(100),
    city VARCHAR(255),
    phone VARCHAR(50),
    completed BOOLEAN DEFAULT FALSE,
    lead_id UUID REFERENCES leads(id),
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer TEXT,
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_chat_interactions_session ON chat_interactions(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_interactions_created ON chat_interactions(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_interactions_completed ON chat_interactions(completed);
CREATE INDEX IF NOT EXISTS idx_chat_interactions_service ON chat_interactions(service);

-- View for analytics
CREATE OR REPLACE VIEW chat_funnel_stats AS
SELECT 
    DATE(created_at) as date,
    COUNT(DISTINCT session_id) as total_sessions,
    COUNT(DISTINCT CASE WHEN step = 'service' OR service IS NOT NULL THEN session_id END) as selected_service,
    COUNT(DISTINCT CASE WHEN city IS NOT NULL THEN session_id END) as provided_city,
    COUNT(DISTINCT CASE WHEN phone IS NOT NULL THEN session_id END) as provided_phone,
    COUNT(DISTINCT CASE WHEN completed = true THEN session_id END) as completed_leads,
    ROUND(
        COUNT(DISTINCT CASE WHEN completed = true THEN session_id END)::numeric / 
        NULLIF(COUNT(DISTINCT session_id), 0) * 100, 2
    ) as conversion_rate
FROM chat_interactions
GROUP BY DATE(created_at)
ORDER BY date DESC;
