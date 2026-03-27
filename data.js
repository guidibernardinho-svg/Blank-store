// =============================================
//  3DS eShop — Game Database (data.js)
//  Edite este arquivo para adicionar seus próprios
//  jogos, links e informações.
// =============================================

const GAMES = [
  // ─── CIA (3DS) ───────────────────────────────
  {
    id: 1,
    title: "Pokémon X",
    category: "cia",
    platform: "3ds",
    emoji: "🐉",
    bg: "#1a2a4a",
    genre: "RPG",
    size: "1.7 GB",
    region: "EUR",
    stars: 5,
    desc: "Embarque numa nova aventura Pokémon na região de Kalos. Explore em 3D pela primeira vez na série principal.",
    link: "#" // ← substitua pelo link real
  },
  {
    id: 2,
    title: "Pokémon Y",
    category: "cia",
    platform: "3ds",
    emoji: "🦋",
    bg: "#2a1a4a",
    genre: "RPG",
    size: "1.7 GB",
    region: "EUR",
    stars: 5,
    desc: "A versão Y do par de Kalos — captura o lendário Yveltal e expanda seu Pokédex.",
    link: "#"
  },
  {
    id: 3,
    title: "The Legend of Zelda: A Link Between Worlds",
    category: "cia",
    platform: "3ds",
    emoji: "⚔️",
    bg: "#1a3a1a",
    genre: "Aventura",
    size: "976 MB",
    region: "USA",
    stars: 5,
    desc: "Sequência espiritual de A Link to the Past. Link pode se fundir com as paredes para resolver puzzles únicos.",
    link: "#"
  },
  {
    id: 4,
    title: "Super Mario 3D Land",
    category: "cia",
    platform: "3ds",
    emoji: "🍄",
    bg: "#3a1a1a",
    genre: "Plataforma",
    size: "821 MB",
    region: "USA",
    stars: 4,
    desc: "Mario em 3D pensado especialmente para o 3DS, com fases curtas e mecânicas clássicas.",
    link: "#"
  },
  {
    id: 5,
    title: "Fire Emblem: Awakening",
    category: "cia",
    platform: "3ds",
    emoji: "🔥",
    bg: "#3a1a0a",
    genre: "TRPG",
    size: "1.2 GB",
    region: "USA",
    stars: 5,
    desc: "RPG de estratégia com casamento entre personagens e permadeath. Um dos melhores jogos do 3DS.",
    link: "#"
  },
  {
    id: 6,
    title: "Animal Crossing: New Leaf",
    category: "cia",
    platform: "3ds",
    emoji: "🌿",
    bg: "#0a2a1a",
    genre: "Simulação",
    size: "1.0 GB",
    region: "BRA",
    stars: 5,
    desc: "Torne-se o prefeito da sua própria vila! Construa, decora e socialize com os moradores.",
    link: "#"
  },

  // ─── HACK ROMs ────────────────────────────────
  {
    id: 7,
    title: "Pokémon Unbound",
    category: "hackrom",
    platform: "gba",
    emoji: "💎",
    bg: "#1a1a3a",
    genre: "RPG / Hack",
    size: "32 MB",
    region: "GBA",
    stars: 5,
    desc: "Hack avançada de FireRed com história original, dificuldade customizável, missões e Pokémon de todas as gerações.",
    link: "#"
  },
  {
    id: 8,
    title: "Pokémon Radical Red",
    category: "hackrom",
    platform: "gba",
    emoji: "🔴",
    bg: "#3a0a0a",
    genre: "RPG / Hack",
    size: "28 MB",
    region: "GBA",
    stars: 5,
    desc: "A hack mais difícil de FireRed — movesets atualizados, Horde Encounters e sistema de dificuldade absurdo.",
    link: "#"
  },
  {
    id: 9,
    title: "Pokémon Clover",
    category: "hackrom",
    platform: "gba",
    emoji: "🍀",
    bg: "#0a2a0a",
    genre: "RPG / Hack",
    size: "30 MB",
    region: "GBA",
    stars: 4,
    desc: "Hack de FireRed com 386 Fakemon criados pela comunidade, humor irreverente e novas regiões.",
    link: "#"
  },
  {
    id: 10,
    title: "Pokémon Glazed",
    category: "hackrom",
    platform: "gba",
    emoji: "🌊",
    bg: "#0a1a3a",
    genre: "RPG / Hack",
    size: "25 MB",
    region: "GBA",
    stars: 4,
    desc: "Hack de Emerald com nova região, starters de várias gens e enredo original interessante.",
    link: "#"
  },
  {
    id: 11,
    title: "Pokémon Ultra Sun Randomizer",
    category: "hackrom",
    platform: "3ds",
    emoji: "☀️",
    bg: "#3a2a0a",
    genre: "RPG / Hack",
    size: "3.5 GB",
    region: "3DS",
    stars: 4,
    desc: "Ultra Sun com randomizer de encounters, itens, movimentos e trainers para uma experiência única a cada jogo.",
    link: "#"
  },
  {
    id: 12,
    title: "Mario Kart DS ROM Hack Pack",
    category: "hackrom",
    platform: "ds",
    emoji: "🏎️",
    bg: "#2a0a2a",
    genre: "Corrida / Hack",
    size: "256 MB",
    region: "DS",
    stars: 4,
    desc: "Coleção de custom tracks para Mario Kart DS — pistas novas, bots melhorados e mais.",
    link: "#"
  },

  // ─── DLC ─────────────────────────────────────
  {
    id: 13,
    title: "Fire Emblem Fates — DLC Pack",
    category: "dlc",
    platform: "3ds",
    emoji: "⚡",
    bg: "#2a1a0a",
    genre: "TRPG",
    size: "180 MB",
    region: "USA",
    stars: 4,
    desc: "Pacote completo com todos os mapas DLC de Fire Emblem Fates, incluindo missões de recrutamento.",
    link: "#"
  },
  {
    id: 14,
    title: "Pokémon ORAS — DLC Events",
    category: "dlc",
    platform: "3ds",
    emoji: "✨",
    bg: "#1a1a2a",
    genre: "RPG",
    size: "45 MB",
    region: "USA",
    stars: 5,
    desc: "Eventos injetáveis para Omega Ruby/Alpha Sapphire — Mythicals como Diancie, Hoopa e Volcanion.",
    link: "#"
  },
  {
    id: 15,
    title: "Monster Hunter 4U — DLC Quests",
    category: "dlc",
    platform: "3ds",
    emoji: "🗡️",
    bg: "#2a1a1a",
    genre: "Ação",
    size: "220 MB",
    region: "USA",
    stars: 4,
    desc: "Missões DLC exclusivas para MH4 Ultimate com armaduras especiais e colabs.",
    link: "#"
  },

  // ─── UPDATES ─────────────────────────────────
  {
    id: 16,
    title: "Pokémon Sun — Update v1.2",
    category: "update",
    platform: "3ds",
    emoji: "🔄",
    bg: "#1a2a2a",
    genre: "Update",
    size: "90 MB",
    region: "USA",
    stars: 4,
    desc: "Update oficial do Pokémon Sun que corrige bugs, melhora o Battle Tree e adiciona suporte a eventos.",
    link: "#"
  },
  {
    id: 17,
    title: "Smash Bros. 3DS — Update v1.1.7",
    category: "update",
    platform: "3ds",
    emoji: "👊",
    bg: "#2a2a1a",
    genre: "Luta",
    size: "110 MB",
    region: "USA",
    stars: 5,
    desc: "Última atualização oficial do Smash 3DS com balanceamento de personagens e correção de bugs online.",
    link: "#"
  }
];

// Categorias de navegação
const TABS = {
  home:    { label: "Início",    filter: null },
  cia:     { label: "CIA",       filter: "cia" },
  hackrom: { label: "Hack ROMs", filter: "hackrom" },
  dlc:     { label: "DLC",       filter: "dlc" },
  updates: { label: "Updates",   filter: "update" },
  search:  { label: "Buscar",    filter: null }
};
