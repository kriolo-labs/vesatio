# Checklist Pré-Lançamento Vesatio

## ✅ Técnico

### Testes

- [ ] Todos os testes unitários passando (`npm run test`)
- [ ] Todos os testes E2E passando (`npx playwright test`)
- [ ] Lighthouse Score > 90 em todas as categorias

### Performance

- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] TTI < 3.5s

### Segurança

- [ ] RLS policies testadas para todas as tabelas
- [ ] SSL configurado em todos os domínios
- [ ] 2FA funcional
- [ ] Rate limiting ativo
- [ ] Headers de segurança configurados (CSP, HSTS)
- [ ] Variáveis de ambiente de produção verificadas

### Infraestrutura

- [ ] Backups automáticos configurados e testados
- [ ] Monitorização ativa (erros, performance)
- [ ] Edge Functions deployed
- [ ] Storage buckets configurados com permissões corretas
- [ ] CDN ativo para assets estáticos
- [ ] DNS configurado correctamente

### Integrações

- [ ] Emails transacionais testados (Resend)
- [ ] WhatsApp templates aprovados (Twilio)
- [ ] Mapbox token de produção
- [ ] Webhook endpoints verificados

---

## ✅ Dados

### Migração

- [ ] Dados de clientes existentes importados
- [ ] Projetos activos migrados
- [ ] Histórico financeiro importado

### Configuração

- [ ] Utilizadores criados com roles correctos
- [ ] Plano de contas configurado
- [ ] Séries de documentos definidas
- [ ] Templates de documentos (faturas, orçamentos) prontos
- [ ] FAQs e knowledge base do AURA populados

---

## ✅ Negócio

### Equipa

- [ ] Formação realizada para todos os utilizadores
- [ ] Documentação de utilizador disponível
- [ ] Canal de suporte definido

### Comunicação

- [ ] Email de anúncio preparado para clientes (novo portal)
- [ ] FAQ de suporte pronto
- [ ] Equipa de prevenção alertada para primeiras 48h

---

## 🚀 Estratégia de Lançamento

### Soft Launch (Semana 1)

1. Seleccionar 2-3 projectos piloto
2. Convidar clientes específicos para o novo portal
3. Monitorizar de perto (logs, feedback)
4. Corrigir issues críticos
5. Recolher feedback da equipa interna

### Full Launch (Semana 2+)

1. Validar métricas do soft launch
2. Comunicar a todos os clientes
3. Disponibilizar sistema para toda a equipa
4. Monitorização intensiva nas primeiras 48h
5. Equipa de suporte de prevenção activa

---

## 📞 Contactos de Emergência

| Papel            | Nome   | Contacto             |
| ---------------- | ------ | -------------------- |
| Tech Lead        | [Nome] | [Telefone]           |
| Supabase Support | -      | support@supabase.com |
| Vercel Support   | -      | support@vercel.com   |

---

## ⚠️ Rollback Plan

1. Reverter deployment no Vercel (1 click)
2. Notificar equipa via Slack/WhatsApp
3. Comunicar clientes afectados
4. Investigar root cause
5. Corrigir e re-deploy após validação
