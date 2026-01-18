-- Tabla de partners con sistema de créditos
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  telegram_chat_id VARCHAR(100) UNIQUE NOT NULL,
  services TEXT[] NOT NULL, -- Array de servicios: ['desatascos', 'electricista', etc]
  cities TEXT[] NOT NULL, -- Array de ciudades donde opera
  credits INTEGER DEFAULT 0, -- Créditos disponibles
  total_leads_received INTEGER DEFAULT 0,
  total_leads_accepted INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de leads con estado y tracking
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service VARCHAR(100) NOT NULL,
  problem TEXT NOT NULL,
  phone VARCHAR(20) NOT NULL, -- Teléfono encriptado
  city VARCHAR(100) NOT NULL,
  name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending', -- pending, accepted, rejected, expired
  partner_id UUID REFERENCES partners(id),
  telegram_message_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  accepted_at TIMESTAMP,
  CONSTRAINT fk_partner FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE SET NULL
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_partners_telegram ON partners(telegram_chat_id);
CREATE INDEX idx_partners_active ON partners(active) WHERE active = true;
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
