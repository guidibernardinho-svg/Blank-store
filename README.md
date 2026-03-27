# 🎮 3DS eShop — CIA & Hack ROMs Store

Interface de loja estilo Nintendo eShop para baixar jogos `.CIA`, Hack ROMs e DLCs para o Nintendo 3DS com CFW (Custom Firmware).

## ✨ Funcionalidades

- Interface estilo Switch/eShop escura e estilizada
- Navegação por abas: CIA, Hack ROMs, DLC, Updates
- Filtros por plataforma (3DS, DS, GBA)
- Barra de busca em tempo real
- Modal de download com barra de progresso animada
- Totalmente responsivo para mobile

## 🚀 Como usar

### Hospedar no GitHub Pages

1. Fork ou clone este repositório
2. Vá em **Settings → Pages**
3. Selecione a branch `main` e a pasta `/root`
4. Acesse via `https://seu-usuario.github.io/nome-do-repo`

### Localmente

Basta abrir o `index.html` no navegador — não precisa de servidor.

## 🛠️ Adicionar seus próprios jogos

Edite o arquivo `data.js` e adicione entradas no array `GAMES`:

```js
{
  id: 99,               // ID único
  title: "Nome do Jogo",
  category: "cia",      // "cia" | "hackrom" | "dlc" | "update"
  platform: "3ds",      // "3ds" | "ds" | "gba"
  emoji: "🎮",          // emoji para a arte do card
  bg: "#1a1a2a",        // cor de fundo do card
  genre: "RPG",
  size: "1.2 GB",
  region: "USA",
  stars: 5,             // 1–5
  desc: "Descrição do jogo aqui.",
  link: "https://seu-link-de-download.com/jogo.cia"
}
```

## 📂 Estrutura

```
3ds-store/
├── index.html   — estrutura da página
├── style.css    — todo o visual (tema escuro, cards, modal)
├── data.js      — banco de dados dos jogos (EDITE AQUI)
├── app.js       — lógica de navegação, busca e download
└── README.md
```

## ⚠️ Aviso

Este projeto é um template de interface. Os links de download são placeholders (`#`). Substitua-os por links reais no `data.js`. Use apenas para jogos que você possui legalmente.

## 📄 Licença

MIT — use, modifique e distribua à vontade.
