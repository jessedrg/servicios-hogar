-- Añadir columnas para pricing dinámico

-- Columna para precio del lead en euros
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_price DECIMAL(10,2) DEFAULT 18;

-- Columnas para valor estimado del trabajo
ALTER TABLE leads ADD COLUMN IF NOT EXISTS estimated_job_min INTEGER DEFAULT 80;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS estimated_job_max INTEGER DEFAULT 200;

-- Columna para tipo de trabajo
ALTER TABLE leads ADD COLUMN IF NOT EXISTS work_type VARCHAR(255) DEFAULT 'Trabajo general';

-- Columna para urgencia
ALTER TABLE leads ADD COLUMN IF NOT EXISTS urgency VARCHAR(50) DEFAULT 'normal';

-- Columna para complejidad
ALTER TABLE leads ADD COLUMN IF NOT EXISTS complexity VARCHAR(50) DEFAULT 'medio';

-- Columna para stripe session id (para verificar pagos)
ALTER TABLE leads ADD COLUMN IF NOT EXISTS stripe_session_id VARCHAR(255);

-- Añadir columna de balance en euros a partners si no existe
ALTER TABLE partners ADD COLUMN IF NOT EXISTS balance_euros DECIMAL(10,2) DEFAULT 0;

-- Añadir descripción a transacciones si no existe
ALTER TABLE credit_transactions ADD COLUMN IF NOT EXISTS description TEXT;

-- Índice para búsquedas rápidas por estado
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- Índice para búsquedas por stripe session
CREATE INDEX IF NOT EXISTS idx_leads_stripe_session ON leads(stripe_session_id);
