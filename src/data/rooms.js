// TOB room data — 4s scale
// Videos: { type: 'youtube', id: 'YT_VIDEO_ID', label: '...' }
//          { type: 'gif', src: '/assets/filename.gif', label: '...' }
// Add real YouTube IDs and gif paths as content is gathered.

export const rooms = [
  {
    id: 'maiden',
    name: 'Maiden of Sugadinti',
    shortName: 'Maiden',
    color: '#c0392b',
    overview:
      'The first boss of TOB. Four roles work in tandem: Mage and MFrz freeze spawns across three blood procs (70/50/30%), Rdps chins the pile and ZCBs at key HP thresholds, and MDPS scythes while flinching Maiden for Ranger venges. Freeze coordination is critical — if a freezer is late, the other catches the overflow spawns.',
    setup: {
      notes: 'Surge pot usage: Mage on Maiden, Nylo, P2. MFrz on Bloat, P1. Rdps on Bloat, P1. MDPS on Bloat, P1. Sunlight moth mix or Guthix Rest both viable — moth mix can tick-eat up to 3 players within 2 tiles. Full gear/inventory layouts shown in the setup image.',
      image: '/assets/setup-inventories.png',
      gear: [
        'Mage: TBow, Sanguinesti staff, Lightbearer → swap to Ultor after 30s, ZCB',
        'MFrz: TBow, Scythe, Ralos, ZCB, Lightbearer → swap to Ultor after 30s',
        'Rdps: TBow, Scythe, Elder Maul (spec), ZCB, chinchompas (medium fuse)',
        'MDPS: ZCB, Scythe, Dinh\'s Bulwark, Lightbearer → swap to Ultor after 30s',
      ],
      inventory: [
        'Standard TOB split — brews, restores, prayer pots',
        'Surge pot for all roles',
        'Rdps: chinchompas in inventory for 50s proc',
      ],
      stats: [
        '90+ Attack / Strength / Defence recommended',
        '77 Prayer (Piety / Rigour / Augury)',
      ],
    },
    roles: [
      {
        id: 'mage',
        name: 'Mage',
        summary: 'Freezes north-side spawns. Coordinates freezes with MFrz. ZCBs Maiden with MFrz to force 30s proc.',
        procedure: [
          { step: 1, text: 'Cast SBS before entering the room. Keep Vengeance on cooldown. Stay south of Maiden unless taking a Veng — walk east to facilitate this. Sip Surge pot on entry.' },
          { step: 2, text: 'Entry Rotation: Accurate TBow → Ralos spec → Accurate TBow → switch to Rapid and continue bowing until proc.' },
          { step: 3, text: '70s Proc: Delay 1 tick, then freeze N1. Freeze S2. Because of the 1-tick delay on N1, move 2 tiles closer so your bow projectile stays in sync with scythe hits.', tip: 'If N1 does not spawn, skip and freeze S2. If MFrz is late, catch 3s.' },
          { step: 4, text: '50s Proc: Freeze N1 and S2. If S2 does not spawn, freeze the clump. If the 70s S1 is still 40+ HP after freezing S2, scythe it once. ZCB Maiden together with MFrz once live HP drops below 38%.', tip: 'If MFrz is late, catch 3s.' },
          { step: 5, text: '30s Proc: Freeze N1 and S2. Use an ayak fill on Maiden, then freeze 4s to clump. If either S2 or N1 spawns, barrage the clump instead. Scythe until dead.' },
        ],
        videos: [],
      },
      {
        id: 'mfrz',
        name: 'MFrz',
        summary: 'Melee Freezer. Camps Lightbearer throughout, freezes south-side spawns, swaps to Ultor after the 30s freeze.',
        procedure: [
          { step: 1, text: 'Camp Lightbearer. Switch to Ultor after freezing the 30s. If you are ever late on a freeze, ping your Mage.' },
          { step: 2, text: 'Entry Rotation: Accurate TBow → Ralos spec → Accurate TBow → switch to Rapid and continue bowing until proc. If Maiden\'s defence is still above 60 after your Ralos, Ralos spec again then continue rapid bowing.', tip: 'When freezing 3s, click S3 so your barrage also hits the clump.' },
          { step: 3, text: '70s Proc: Freeze S1 and N234. TBow until 50s proc.', tip: 'If you are late, your Mage catches 3s — meaning you must catch 4s.' },
          { step: 4, text: '50s Proc: Freeze S1 and N234. If a crab doesn\'t spawn, freeze the clump. TBow until Maiden reaches ~38% HP, then ZCB together with Mage to force the 30s proc.', tip: 'If Maiden is ~34% HP after freezing 4s, do NOT ZCB — prepare to freeze instead.' },
          { step: 5, text: '30s Proc: Freeze S1, N2, and 3s. Your Mage catches 4s. If a crab doesn\'t spawn, freeze the clump. Swap to Ultor. Scythe until dead. If you have leftover spec, you can ZCB / Claw / Chally.' },
        ],
        videos: [],
      },
      {
        id: 'rdps',
        name: 'Rdps',
        summary: 'Ranged DPS. Opens with TBow and Elder Maul spec, chins the 50s pile for Death Charge, and ZCBs Maiden at key HP thresholds.',
        procedure: [
          { step: 1, text: 'Entry Rotation: Rapid TBow → Elder Maul spec. Summon Thrall ASAP. Stagger entry by walking 1 tile before the TBow line to position behind MDPS — this ensures they tank the first hit, letting you Maul without risking a drain.' },
          { step: 2, text: 'After Maiden\'s first attack, on your first Scythe: SBS → Death Charge. Scythe Maiden until 70s proc.' },
          { step: 3, text: '70s Proc: Scythe Maiden until 50s proc. Ensure Death Charge has been cast before the 50s proc.' },
          { step: 4, text: '50s Proc: Scythe the 70s S1 once. Sip ranging potion for 112 stats. Throw 3 chins at the pile — stand 4–6 tiles away, use Medium Fuse. ZCB spec Maiden. Scythe until 30s proc.', tip: 'If you do not receive Death Charge from the clump, throw 2 additional chins.' },
          { step: 5, text: '30s Proc: Scythe until Maiden dies.' },
        ],
        videos: [],
      },
      {
        id: 'mdps',
        name: 'MDPS',
        summary: 'Melee DPS. Flinches Maiden to give Ranger venge opportunities. Uses Dinh\'s to finish north crabs at the 50s proc.',
        procedure: [
          { step: 1, text: 'Cast SBS before entering the room. Keep Vengeance on cooldown. Flinch properly so your Ranger can take venges.' },
          { step: 2, text: 'Entry Rotation: ZCB bolt rag → Scythe. Summon Thrall ASAP. On your first Scythe after Maiden\'s first attack: SBS → Death Charge. Scythe Maiden until 70s proc.' },
          { step: 3, text: '70s Proc: Scythe Maiden until 50s proc. Ensure Death Charge is active before the 50s proc.' },
          { step: 4, text: '50s Proc: Scythe 70s N1. Dinhs N2. Scythe N1 or N2 if they are >25 HP, otherwise Scythe Maiden. Sip Surge potion and ZCB spec Maiden.', tip: 'Prioritise scything 70s crabs — they will explode soon.' },
          { step: 5, text: '30s Proc: Scythe Maiden until dead. Keep Vengeance up for your freezers. Heal teammates as needed.' },
        ],
        videos: [],
      },
    ],
  },
  {
    id: 'bloat',
    name: 'Pestilent Bloat',
    shortName: 'Bloat',
    color: '#7d6608',
    overview:
      'Bloat walks clockwise around the room. Follow behind it, stop when it stops, and burst DPS during sleep phases. Flies fall from the ceiling during sleep — move off the indicator tiles.',
    setup: {
      notes: 'No special setup changes needed from Maiden. Have prayer up for the stomps. Bring a spec weapon if you have one for the sleep phase burst.',
      gear: [
        'Same max melee as Maiden',
        'Dragon Warhammer / BGS for spec if available',
      ],
      inventory: [
        'Same standard TOB inventory',
        'Extra food if tanking stomp damage',
      ],
      stats: [],
    },
    roles: [
      {
        id: 'all',
        name: 'All Roles (shared)',
        summary: 'Everyone follows the same procedure. One player acts as caller.',
        procedure: [
          { step: 1, text: 'Enter the room and find Bloat. It will begin walking clockwise.' },
          { step: 2, text: 'Follow directly behind Bloat. Do not run into its feet — stomp AoE damages you.' },
          { step: 3, text: 'When Bloat stops walking, immediately burst DPS on it. Use spec weapons here.', tip: 'Bloat sleeps for a fixed number of ticks — maximise DPS during this window.' },
          { step: 4, text: 'When Bloat wakes and stands back up, flies drop from the ceiling. Move off any yellow-indicator tiles.' },
          { step: 5, text: 'Resume following Bloat clockwise. Repeat until dead.' },
          { step: 6, text: 'Caller should call "walk" when Bloat starts moving and "stop" when it sleeps.', tip: 'Clear communication makes this room significantly smoother.' },
        ],
        videos: [],
      },
    ],
  },
  {
    id: 'nylos',
    name: 'Nylocas Vasilias',
    shortName: 'Nylos',
    color: '#1a5276',
    overview:
      'The most mechanically demanding room. Four lanes of nylo spawns must be handled before boss phase. Wrong-style attacks double nylo HP. Boss phase requires calling prayer switches between melee/range/magic.',
    setup: {
      notes: 'All three attack styles needed. Bring blowpipe, powered staff, and melee. Switch gear quickly between waves.',
      gear: [
        'Melee: Scythe of Vitur or rapier',
        'Ranged: Blowpipe (scales/darts loaded)',
        'Magic: Sanguinesti staff or trident',
        'Keep all three styles in inventory for quick switches',
      ],
      inventory: [
        '3-5 prayer potions (heavy prayer usage)',
        'Brews + restores',
        'Extra food — nylo waves deal a lot of damage',
      ],
      stats: [],
    },
    roles: [
      {
        id: 'west',
        name: 'West',
        summary: 'Covers west lane. Kills all west-side nylos as they spawn.',
        procedure: [
          { step: 1, text: 'Enter and position on the west side near the west entry pillar.' },
          { step: 2, text: 'Identify incoming nylo colour: blue = ranged, purple = magic, grey/white = melee. Use correct style.', tip: 'Wrong style doubles the nylo HP. Always match the colour.' },
          { step: 3, text: 'Priority: small nylos that are close to the pillars. Large nylos split into smalls on death.' },
          { step: 4, text: 'Between waves, clean up any nylos that drift toward the centre.' },
          { step: 5, text: 'When boss spawns, switch to your primary DPS style and burn boss. Follow caller for prayer switches.' },
        ],
        videos: [],
      },
      {
        id: 'east',
        name: 'East',
        summary: 'Covers east lane. Mirror of west role.',
        procedure: [
          { step: 1, text: 'Position on the east side near the east entry pillar.' },
          { step: 2, text: 'Match attack style to nylo colour. Blue = ranged, purple = magic, grey = melee.' },
          { step: 3, text: 'Kill smalls first to prevent stacking. Intercept large nylos before they reach the pillars.' },
          { step: 4, text: 'Clean up strays between waves. Assist west if your lane is clear.' },
          { step: 5, text: 'On boss phase: switch to DPS gear and follow prayer calls.' },
        ],
        videos: [],
      },
      {
        id: 'nw',
        name: 'NW Support',
        summary: 'Supports west lane and helps scythe south pillars during waves.',
        procedure: [
          { step: 1, text: 'Position north-west. Primary job is to assist west lane and kill any NW spawns.' },
          { step: 2, text: 'When west lane is clean, rotate south to help with the south pillar nylos.' },
          { step: 3, text: 'On boss phase: join scythe train on boss. You are typically the caller for this side.' },
        ],
        videos: [],
      },
      {
        id: 'ne',
        name: 'NE / Caller',
        summary: 'Supports east lane. Acts as boss-phase caller for prayer switches.',
        procedure: [
          { step: 1, text: 'Position north-east. Assist east lane and NE spawns.' },
          { step: 2, text: 'Rotate south to help south pillar when east lane is clear.' },
          { step: 3, text: 'On boss phase: watch Vasilias for combat style changes and call them clearly.', tip: '"Melee!" / "Mage!" / "Range!" — call as soon as you see the switch animation.' },
          { step: 4, text: 'Team prays according to your calls while DPS-ing the boss.' },
        ],
        videos: [],
      },
    ],
  },
  {
    id: 'sotetseg',
    name: 'Sotetseg',
    shortName: 'Sotetseg',
    color: '#6c3483',
    overview:
      'One player is sent to The Maze (underworld) while three fight Sotetseg topside. Red orbs must be shared. Maze runner clicks tiles to keep topside alive.',
    setup: {
      notes: 'Pray melee for melee phase, magic for magic phase. No special gear changes needed.',
      gear: [
        'Max melee or your standard TOB kit',
        'Bring a hammer if you have BGS/DWH for spec on topside',
      ],
      inventory: [
        'Standard TOB inventory',
        'Extra prayer pots — Sotetseg drains prayer with magic attacks',
      ],
      stats: [],
    },
    roles: [
      {
        id: 'topside',
        name: 'Topside (Active 3)',
        summary: 'Three players fight Sotetseg above ground. Handle orbs and click maze tiles.',
        procedure: [
          { step: 1, text: 'Enter and begin attacking Sotetseg. Pray melee during his melee phase.' },
          { step: 2, text: 'Red orb: when the orb is launched at a player, a second player must stack on them to split the damage.', tip: 'Untanked orb = ~70+ damage. Always share it.' },
          { step: 3, text: 'When a player is sent to the maze, watch for their maze tiles lighting up on the floor. Click lit tiles to help them.', tip: 'Each unclicked tile = damage to the topside team.' },
          { step: 4, text: 'At 66% and 33% HP, another player is sent to the maze. Pre-agree the rotation (e.g. P1 → P2 → P3).' },
          { step: 5, text: 'Switch prayer between melee and magic as Sotetseg changes attack styles.' },
        ],
        videos: [],
      },
      {
        id: 'maze',
        name: 'Maze Runner',
        summary: 'Sent to the underworld. Must complete the maze by clicking lit tiles before they time out.',
        procedure: [
          { step: 1, text: 'When teleported to the maze, tiles will light up in sequence. Click each one as fast as possible.' },
          { step: 2, text: 'Missing a tile deals damage to topside players. Speed is critical.', tip: 'Pre-zoom out your camera before the maze to see more tiles at once.' },
          { step: 3, text: 'After completing the maze sequence, you return to the fight. Resume attacking Sotetseg.' },
        ],
        videos: [],
      },
    ],
  },
  {
    id: 'xarpus',
    name: 'Xarpus',
    shortName: 'Xarpus',
    color: '#1d6a47',
    overview:
      'Phase 1: heal all exhumes by walking over them. Phase 2: never let Xarpus face you — attack only when the eye looks away. Phase 3 screech: face away for 1 tick.',
    setup: {
      notes: 'No special gear — ranged is optimal in phase 2 for distance. Blowpipe or bow.',
      gear: [
        'Twisted Bow / Blowpipe or Armadyl crossbow for P2 flexibility',
        'Melee fine for P1 exhume healing',
      ],
      inventory: [
        'Standard TOB inventory',
        'Anti-poison or prayer pot (screech deals large damage if you face it)',
      ],
      stats: [],
    },
    roles: [
      {
        id: 'north',
        name: 'North DPS',
        summary: 'Heals north exhumes in P1, then holds north position for P2.',
        procedure: [
          { step: 1, text: 'In P1, walk over the north exhumes (skeleton spots) to heal/activate them. Stay on each tile until the animation completes.' },
          { step: 2, text: 'Once all exhumes on your side are healed, help adjacent players finish theirs.' },
          { step: 3, text: 'P2 begins when all 4 exhumes are healed. Xarpus rises and begins rotating its eye.' },
          { step: 4, text: 'Stand at a safe distance. Attack Xarpus only when its eye is NOT facing you.', tip: 'Eye facing you = screech damage. Only attack when the eye points elsewhere.' },
          { step: 5, text: 'When Xarpus screeches (P3 transition), everyone must face away for exactly 1 tick.' },
        ],
        videos: [],
      },
      {
        id: 'south',
        name: 'South DPS',
        summary: 'Heals south exhumes in P1, holds south position for P2.',
        procedure: [
          { step: 1, text: 'Walk over south exhumes to heal them in P1.' },
          { step: 2, text: 'Help other players finish their exhumes if yours are done early.' },
          { step: 3, text: 'P2: stay south, attack when eye rotates away. Step back from any poison pools.' },
          { step: 4, text: 'Screech: face away immediately when Xarpus rears back.' },
        ],
        videos: [],
      },
      {
        id: 'east',
        name: 'East DPS',
        summary: 'Heals east exhumes. Holds east for P2.',
        procedure: [
          { step: 1, text: 'Heal east exhumes in P1. Call when yours are done.' },
          { step: 2, text: 'P2: east position, attack when safe. Co-ordinate with team to maximise DPS uptime.' },
        ],
        videos: [],
      },
      {
        id: 'west',
        name: 'West DPS',
        summary: 'Heals west exhumes. Holds west for P2.',
        procedure: [
          { step: 1, text: 'Heal west exhumes in P1.' },
          { step: 2, text: 'P2: west position. Attack when eye is not on you.' },
        ],
        videos: [],
      },
    ],
  },
  {
    id: 'verzik',
    name: 'Verzik Vitur',
    shortName: 'Verzik',
    color: '#8e44ad',
    overview:
      'Three-phase final boss. P1: tank under Verzik, kill pillars. P2: manage orbs, webs, and crabs while DPS-ing. P3: rapid damage with bouncing nylos, purple bombs, and lightning.',
    setup: {
      notes: 'Have all three attack styles accessible. Bring spec weapon. P3 is a DPS race — maximise offence.',
      gear: [
        'Scythe for P1 and P3 melee phases',
        'Blowpipe for P2 crab phase and nylos',
        'Twisted Bow for P2/P3 burst if available',
        'BGS / DWH spec for P1 pillars or P2 opener',
      ],
      inventory: [
        '4-6 prayer potions (heavy prayer usage across all 3 phases)',
        'Brews + restores',
        'Karambwans for combo eating in emergencies',
      ],
      stats: [],
    },
    roles: [
      {
        id: 'p1-tank',
        name: 'P1 Tank',
        summary: 'Stands directly under Verzik during P1, absorbs hits while the team kills pillars.',
        procedure: [
          { step: 1, text: 'Enter and immediately run under Verzik (stand on her tile). She targets you exclusively.' },
          { step: 2, text: 'Pray protect from melee. Tick eat as needed — she hits hard.' },
          { step: 3, text: 'Team kills all pillars around the room. Stay under Verzik until all pillars are dead.', tip: 'If the tank moves, Verzik auto-attacks the whole team. Hold position.' },
          { step: 4, text: 'When the last pillar dies, P2 begins. The tank can now move freely.' },
        ],
        videos: [],
      },
      {
        id: 'p1-dps',
        name: 'P1 DPS',
        summary: 'Kills all 4 pillars as fast as possible while the tank holds Verzik.',
        procedure: [
          { step: 1, text: 'Target a pillar immediately. Spec weapon it down (BGS / DWH works well).' },
          { step: 2, text: 'Move to next pillar after each dies. Prioritise speed — faster pillars = shorter P1.' },
          { step: 3, text: 'Do NOT aggro Verzik or walk into her melee range.', tip: 'Verzik will start AoE-ing the whole room if the tank dies — keep tank alive.' },
          { step: 4, text: 'When all pillars are dead, immediately switch to Verzik for P2.' },
        ],
        videos: [],
      },
      {
        id: 'p2-p3',
        name: 'P2 / P3 (All)',
        summary: 'P2: handle orbs, webs, crabs. P3: avoid purple bombs, lightning, and bouncing nylos.',
        procedure: [
          { step: 1, text: 'P2 — Pray magic primarily. Verzik also uses melee/range. Pray according to her attack animation.' },
          { step: 2, text: 'Red orb: share the orb with a teammate (stand adjacent when orb is launched).', tip: 'Orb split rule: whoever has the orb cursor calls out, teammate stacks.' },
          { step: 3, text: 'Web: one player gets webbed — teammates click the web to free them within 3 ticks.' },
          { step: 4, text: 'Crabs: when crab phase starts, kill crabs with blowpipe quickly. Stack them for AoE.' },
          { step: 5, text: 'P3 begins ~roughly 1/3 HP. Switch to your highest DPS setup.' },
          { step: 6, text: 'P3 — bouncing nylos circle the room. Do NOT let them hit you. Move around Verzik to dodge.' },
          { step: 7, text: 'Purple bomb: step away from the targeted tile when you see the purple indicator.' },
          { step: 8, text: 'Lightning: keep moving. Static positions get chain-struck.', tip: 'Last few percent: all-out DPS. Karambwan + brew combo-eat if needed.' },
        ],
        videos: [],
      },
    ],
  },
];
