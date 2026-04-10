-- Tabela para armazenar as cotações/leads de veículos vindos do Stage Motors
CREATE TABLE public.leads_veiculos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Dados do Cliente
    nome TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    
    -- Códigos da Tabela FIPE (referência)
    marca_codigo TEXT NOT NULL,
    modelo_codigo TEXT NOT NULL,
    ano_codigo TEXT NOT NULL,
    
    -- Nomes e dados do Veículo (Enriquecidos)
    marca_nome TEXT,
    modelo_nome TEXT,
    ano_nome TEXT,
    versao TEXT,
    quilometragem TEXT NOT NULL,
    
    -- Preço e Origem
    valor_fipe TEXT,
    origem TEXT DEFAULT 'Stage Motors Formulario',
    
    -- Controle temporal
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Adicionar comentários úteis na tabela
COMMENT ON TABLE public.leads_veiculos IS 'Armazena as solicitações de avaliação de veículos da landing page de Vendas (Stage Motors).';

-- ==========================================
-- Configurações de Segurança (RLS) do Supabase
-- ==========================================

-- 1. Habilitar o modo seguro
ALTER TABLE public.leads_veiculos ENABLE ROW LEVEL SECURITY;

-- 2. Permitir que sistemas e novos usuários enviem dados ("Insert" livre de onde vem o webhook)
-- (Existem casos onde o webhook usa a Service Role/Key que ignora as RLS, mas adicionamos para garantir)
CREATE POLICY "Permitir criação de leads_veiculos para qualquer um (anon/public)" 
    ON public.leads_veiculos 
    FOR INSERT 
    TO public 
    WITH CHECK (true);

-- 3. Permitir leitura dos envios usando a página/dashboard administrativa
CREATE POLICY "Permissao de leitura de leads para administradores" 
    ON public.leads_veiculos 
    FOR SELECT 
    TO authenticated 
    USING (true);
