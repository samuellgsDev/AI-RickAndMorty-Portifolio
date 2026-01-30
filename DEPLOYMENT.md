# Deployment Guide - Google Cloud Run

Este guia explica como fazer deploy da aplicação Rick and Morty Portfolio no Google Cloud Run para habilitar embeds interativos no DEV.to.

## Pré-requisitos

1. **Conta Google Cloud**
   - Crie uma conta em [cloud.google.com](https://cloud.google.com)
   - Habilite o billing (Cloud Run tem free tier generoso)
   - Crie ou selecione um projeto

2. **Google Cloud SDK** (escolha uma opção):

   **Opção A - Cloud Shell (mais fácil):**
   - Acesse [console.cloud.google.com](https://console.cloud.google.com)
   - Clique no ícone do Cloud Shell (terminal no topo direito)
   - Faça upload do código ou clone do GitHub

   **Opção B - Instalação Local:**
   - Windows: Baixe o [instalador](https://cloud.google.com/sdk/docs/install)
   - Execute: `gcloud init` para configurar

3. **Docker** (opcional, apenas para testes locais):
   - Windows: [Docker Desktop](https://www.docker.com/products/docker-desktop)

## Método 1: Deploy Direto (Recomendado)

Este método é o mais simples - o Google Cloud Build cria a imagem automaticamente.

### Passo 1: Autenticar

```bash
gcloud auth login
```

### Passo 2: Configurar Projeto

```bash
# Liste seus projetos
gcloud projects list

# Configure o projeto (substitua PROJECT_ID)
gcloud config set project PROJECT_ID
```

### Passo 3: Deploy

```bash
# No diretório raiz do projeto, execute:
gcloud run deploy rick-morty-portfolio \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --labels dev-tutorial=blog-devcommunity2026
```

**Parâmetros explicados:**

- `rick-morty-portfolio`: Nome do serviço
- `--source .`: Usa o código do diretório atual
- `--region us-central1`: Região do servidor (pode mudar)
- `--allow-unauthenticated`: Permite acesso público (necessário para DEV.to)
- `--labels`: Tag para identificar no DEV.to

### Passo 4: Obter URL

Após o deploy, você receberá uma URL como:

```
https://rick-morty-portfolio-XXXXX-uc.a.run.app
```

## Método 2: Build Local com Docker

Use este método se quiser testar localmente antes do deploy.

### Passo 1: Build da Imagem

```bash
docker build -t rick-morty-portfolio .
```

### Passo 2: Testar Localmente

```bash
docker run -p 8080:8080 rick-morty-portfolio
```

Acesse: http://localhost:8080

### Passo 3: Deploy para Cloud Run

```bash
# Configure o projeto
gcloud config set project PROJECT_ID

# Tag a imagem para Google Container Registry
docker tag rick-morty-portfolio gcr.io/PROJECT_ID/rick-morty-portfolio

# Configure Docker para usar gcloud
gcloud auth configure-docker

# Push da imagem
docker push gcr.io/PROJECT_ID/rick-morty-portfolio

# Deploy no Cloud Run
gcloud run deploy rick-morty-portfolio \
  --image gcr.io/PROJECT_ID/rick-morty-portfolio \
  --region us-central1 \
  --allow-unauthenticated \
  --labels dev-tutorial=blog-devcommunity2026
```

## Configurar Embed no DEV.to

### Passo 1: Copiar URL do Cloud Run

Após o deploy, copie a URL fornecida (exemplo):

```
https://rick-morty-portfolio-abc123-uc.a.run.app
```

### Passo 2: Adicionar Embed no Post

No seu post do DEV.to, use:

```markdown
{% embed https://rick-morty-portfolio-abc123-uc.a.run.app %}
```

### Passo 3: Publicar

Publique ou atualize o post. O embed deve aparecer como um iframe interativo!

## Comandos Úteis

### Ver Logs

```bash
gcloud run services logs read rick-morty-portfolio --region us-central1
```

### Atualizar Deploy

```bash
# Após fazer mudanças no código
gcloud run deploy rick-morty-portfolio \
  --source . \
  --region us-central1
```

### Deletar Serviço

```bash
gcloud run services delete rick-morty-portfolio --region us-central1
```

### Ver Informações do Serviço

```bash
gcloud run services describe rick-morty-portfolio --region us-central1
```

## Troubleshooting

### Erro: "Permission denied"

Execute:

```bash
gcloud auth login
gcloud config set project PROJECT_ID
```

### Erro: "Billing not enabled"

1. Acesse [console.cloud.google.com/billing](https://console.cloud.google.com/billing)
2. Habilite billing para o projeto

### Build Falha

Verifique se:

- `package.json` está correto
- Todas as dependências estão listadas
- `next.config.ts` tem `output: 'standalone'`

### Aplicação não carrega

Verifique os logs:

```bash
gcloud run services logs read rick-morty-portfolio --region us-central1 --limit 50
```

### Embed não funciona no DEV.to

Certifique-se de:

- Usar a URL do Cloud Run (não Vercel)
- Usar a sintaxe correta: `{% embed URL %}`
- A aplicação está com `--allow-unauthenticated`

## Custos

Cloud Run tem um **free tier generoso**:

- 2 milhões de requests/mês
- 360,000 GB-segundos de memória
- 180,000 vCPU-segundos

Para um portfólio pessoal, provavelmente ficará no free tier!

## Próximos Passos

1. ✅ Deploy no Cloud Run
2. ✅ Obter URL
3. ✅ Adicionar embed no DEV.to
4. 🎉 Compartilhar seu portfólio interativo!

## Recursos

- [Documentação Cloud Run](https://cloud.google.com/run/docs)
- [Pricing Cloud Run](https://cloud.google.com/run/pricing)
- [DEV.to Cloud Run Embeds](https://dev.to/devteam/you-can-now-embed-your-google-cloud-run-apps-right-in-your-posts-4p0e)
