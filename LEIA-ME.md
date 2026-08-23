# Meu Financeiro — PWA

App de controle financeiro pessoal. Roda offline, dados salvos no próprio aparelho.

## Arquivos

```
index.html              app inteiro (interface + lógica)
manifest.json           nome, ícone e modo tela cheia
sw.js                   service worker — cache offline
icon-180.png            ícone da tela de início (iOS)
icon-192/512.png        ícones Android / PWA
icon-512-maskable.png   ícone adaptativo Android
```

## Publicar no GitHub Pages

1. Crie um repositório novo (ex.: `financeiro`).
2. Envie os 7 arquivos na **raiz** do repositório.
3. `Settings` → `Pages` → Source: `Deploy from a branch` → Branch: `main` / `(root)` → Save.
4. Em 1–2 minutos a URL fica no ar: `https://SEU-USUARIO.github.io/financeiro/`

O service worker só funciona em HTTPS — o GitHub Pages já entrega HTTPS por padrão.

## Instalar no iPhone

1. Abra a URL **no Safari** (não funciona pelo Chrome no iOS).
2. Botão compartilhar → **Adicionar à Tela de Início**.
3. Abra pelo ícone. Ele roda em tela cheia, sem barra do navegador, e funciona sem internet.

## Onde ficam os dados

No `localStorage` do próprio iPhone. Não sobem para servidor nenhum.

**Você perde os dados se:** remover o ícone da tela de início, trocar de aparelho,
ou limpar os dados de sites no Safari.

Por isso: **Ajustes → Backup → Exportar meus dados**. Gera um `.json` que você salva
no Arquivos ou iCloud Drive. Restaure pelo mesmo menu. O app avisa quando passa
7 dias sem backup.

## Atualizar o app depois

Suba o `index.html` novo e incremente a versão do cache em `sw.js`
(`const CACHE='financeiro-v2'`). Sem isso o iPhone continua servindo a versão antiga
do cache. Atualizar o app **não** apaga seus lançamentos.
