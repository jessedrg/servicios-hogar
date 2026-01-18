-- Tabla para tracking de transacciones de créditos
CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID NOT NULL REFERENCES partners(id),
  amount INTEGER NOT NULL, -- Positivo para compras, negativo para uso
  type VARCHAR(50) NOT NULL, -- 'purchase', 'lead_accepted', 'refund'
  stripe_session_id VARCHAR(255),
  lead_id UUID REFERENCES leads(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_credit_transactions_partner ON credit_transactions(partner_id);
CREATE INDEX idx_credit_transactions_created ON credit_transactions(created_at DESC);
