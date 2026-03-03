// Recommended RuneLite plugins for 4s TOB — sourced from Stability Max Eff guide

export const plugins = [
  {
    id: 'tob-qol',
    name: 'ToB QoL',
    category: 'Raids',
    description: 'Essential quality-of-life improvements for Theatre of Blood. Instance Timer for Nylocas and Xarpus is a must — used to enter on the correct tick. Optionally enable for Sotetseg. Also shows Maiden crab HP as a percentage and Verzik Reds health overlay.',
    hubLink: null,
    tags: ['essential'],
    builtin: false,
    images: [
      { src: '/assets/plugin-tob-qol-maiden.png', label: 'Maiden settings' },
      { src: '/assets/plugin-tob-qol-nylocas.png', label: 'Nylocas settings (Instance Timer)' },
      { src: '/assets/plugin-tob-qol-xarpus.png', label: 'Xarpus settings (Instance Timer)' },
      { src: '/assets/plugin-tob-qol-verzik.png', label: 'Verzik settings' },
    ],
  },
  {
    id: 'nyloer',
    name: 'Nyloer',
    category: 'Raids',
    description: 'Tracks total waves stalled, which wave you are on, and how many nylos were alive. After Wave 28, avoid killing anything 28 and under to end the room as fast as possible. Configure font settings to colour-code nylo styles.',
    hubLink: null,
    tags: ['essential', 'nylos'],
    builtin: false,
    images: [
      { src: '/assets/plugin-nyloer.png', label: 'Font/colour settings' },
    ],
  },
  {
    id: 'nylo-death-indicators',
    name: 'Nylo Death Indicators',
    category: 'Raids',
    description: 'Forces dead crabs to disappear sooner, removing screen clutter so you aren\'t shooting a dead crab. Sets itself up automatically. Pair with Better NPC Highlight to tag crabs that are about to split.',
    hubLink: null,
    tags: ['essential', 'nylos'],
    builtin: false,
    images: [
      { src: '/assets/plugin-nylo-death-indicators.png', label: 'Plugin enabled' },
    ],
  },
  {
    id: 'better-npc-highlight',
    name: 'Better NPC Highlight',
    category: 'Raids',
    description: 'Keeps the tile of a dead Nylo active, showing where a split is about to happen. Use the NPC IDs below to highlight only the relevant crabs. Tile Highlight on, red highlight colour (#FF630004), white fill (#00FFFFFF).',
    hubLink: null,
    tags: ['essential', 'nylos'],
    builtin: false,
    npcIds: '8351,8352,8353,8345,8346,8347,10794,10795,10796,10800,10801,10802',
    images: [
      { src: '/assets/plugin-better-npc-highlight.png', label: 'Tile config with NPC IDs' },
    ],
  },
  {
    id: 'tob-predicted-hit',
    name: 'ToB Predicted Hit',
    category: 'Combat',
    description: 'Shows an accurate percentage of Maiden\'s HP, which allows Freezers to stay on tick appropriately. Configure Maiden Live HP with a height offset of 30 and text colour #00FF00.',
    hubLink: null,
    tags: ['essential', 'maiden'],
    builtin: false,
    images: [
      { src: '/assets/plugin-tob-predicted-hit.png', label: 'Maiden HP settings' },
    ],
  },
  {
    id: 'advanced-raid-tracker',
    name: 'Advanced Raid Tracker',
    category: 'Raids',
    description: 'Shows a tick-by-tick graph you can review during or after a raid to study where you lost a tick, or whether you were on tick with your teammates. Most useful in Maiden, Bloat, and Xarpus.',
    hubLink: null,
    tags: ['optional'],
    builtin: false,
    images: [],
  },
];
