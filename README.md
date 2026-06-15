# 🚀 AulaMestra — Deploy na Vercel (igual ao Gamma.app)

## Em 5 minutos, seu app estará em: `https://aulamestra.vercel.app`

---

## PASSO 1 — Suba para o GitHub

1. Crie uma conta em **github.com** (se não tiver)
2. Clique em **New repository** → nome: `aulamestra`
3. Arraste os 4 arquivos desta pasta para o repositório:
   - `index.html`
   - `api/gerar.js`
   - `vercel.json`
   - `package.json`
4. Clique em **Commit changes**

---

## PASSO 2 — Deploy na Vercel

1. Acesse **vercel.com** → faça login com GitHub
2. Clique em **Add New → Project**
3. Selecione o repositório `aulamestra`
4. Clique em **Deploy** (sem mudar nada)

---

## PASSO 3 — Adicionar a API Key (obrigatório)

1. No painel da Vercel, vá em **Settings → Environment Variables**
2. Adicione:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-...` (pegue em console.anthropic.com → API Keys)
3. Clique em **Save**
4. Vá em **Deployments → Redeploy** (para a variável entrar em vigor)

---

## Pronto! 🎉

Seu AulaMestra estará disponível em:
```
https://aulamestra-XXXXX.vercel.app
```
Compartilhe com quem quiser — funciona em qualquer navegador, em qualquer dispositivo.

---

## Estrutura do projeto
```
aulamestra/
├── index.html      ← Frontend completo (UI premium)
├── api/
│   └── gerar.js    ← Serverless Function (chama a API Anthropic)
├── vercel.json     ← Configuração de rotas
└── package.json    ← Metadados Node.js
```

## Custo
- **Vercel:** gratuito (plano Hobby)
- **Anthropic API:** ~$0.01 por aula gerada (Claude Sonnet 4.6)
