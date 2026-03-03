// One-time seed script — populates Supabase from static data.
// Run with your service role key:
//
//   SUPABASE_URL="https://..." SUPABASE_SERVICE_ROLE_KEY="..." node scripts/seed.mjs

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const EMPTY_ROLES = [
  { id: 'mfrz',   name: 'Melee Freeze', summary: '', procedure: [] },
  { id: 'sfrz',   name: 'South Freeze', summary: '', procedure: [] },
  { id: 'ranger', name: 'Ranger',        summary: '', procedure: [] },
  { id: 'mdps',   name: 'Melee DPS',    summary: '', procedure: [] },
];

const rooms = [
  {
    id: 'maiden', name: 'Maiden of Sugadinti', shortName: 'Maiden', color: '#c0392b',
    overview: 'The first boss of TOB. Four roles work in tandem: South Freeze and Melee Freeze freeze spawns across three blood procs (70/50/30%), Ranger chins the pile and ZCBs at key HP thresholds, and MDPS scythes while flinching Maiden for Ranger venges. Freeze coordination is critical — if a freezer is late, the other catches the overflow spawns.',
    setup: {
      notes: 'Surge pot usage: South Frz on Maiden, Nylo, P2. MFrz on Bloat, P1. Ranger on Bloat, P1. MDPS on Bloat, P1. Sunlight moth mix or Guthix Rest both viable — moth mix can tick-eat up to 3 players within 2 tiles. Full gear/inventory layouts shown in the setup image.',
      image: '/assets/setup-inventories.png',
      gear: ['Melee Freeze: TBow, Scythe, Ralos, ZCB, Lightbearer → swap to Ultor after 30s', 'South Freeze: TBow, Sanguinesti staff, Lightbearer → swap to Ultor after 30s, ZCB', 'Ranger: TBow, Scythe, Elder Maul (spec), ZCB, chinchompas (medium fuse)', "Melee DPS: ZCB, Scythe, Dinh's Bulwark, Lightbearer → swap to Ultor after 30s"],
      inventory: ['Standard TOB split — brews, restores, prayer pots', 'Surge pot for all roles', 'Ranger: chinchompas in inventory for 50s proc'],
      stats: ['90+ Attack / Strength / Defence recommended', '77 Prayer (Piety / Rigour / Augury)'],
    },
    roles: [
      {
        id: 'mfrz', name: 'Melee Freeze', summary: 'Camps Lightbearer throughout, freezes south-side spawns, swaps to Ultor after the 30s freeze.',
        procedure: [
          { text: 'Camp Lightbearer. Switch to Ultor after freezing the 30s. If you are ever late on a freeze, ping your South Freeze.', tip: '' },
          { text: "Entry Rotation: Accurate TBow → Ralos spec → Accurate TBow → switch to Rapid and continue bowing until proc. If Maiden's defence is still above 60 after your Ralos, Ralos spec again then continue rapid bowing.", tip: 'When freezing 3s, click S3 so your barrage also hits the clump.' },
          { text: '70s Proc: Freeze S1 and N234. TBow until 50s proc.', tip: 'If you are late, South Freeze catches 3s — meaning you must catch 4s.' },
          { text: "50s Proc: Freeze S1 and N234. If a crab doesn't spawn, freeze the clump. TBow until Maiden reaches ~38% HP, then ZCB together with South Freeze to force the 30s proc.", tip: 'If Maiden is ~34% HP after freezing 4s, do NOT ZCB — prepare to freeze instead.' },
          { text: "30s Proc: Freeze S1, N2, and 3s. South Freeze catches 4s. If a crab doesn't spawn, freeze the clump. Swap to Ultor. Scythe until dead. If you have leftover spec, you can ZCB / Claw / Chally.", tip: '' },
        ],
      },
      {
        id: 'sfrz', name: 'South Freeze', summary: 'Freezes north-side spawns. Coordinates freezes with Melee Freeze. ZCBs Maiden with MFrz to force 30s proc.',
        procedure: [
          { text: 'Cast SBS before entering the room. Keep Vengeance on cooldown. Stay south of Maiden unless taking a Veng — walk east to facilitate this. Sip Surge pot on entry.', tip: '' },
          { text: 'Entry Rotation: Accurate TBow → Ralos spec → Accurate TBow → switch to Rapid and continue bowing until proc.', tip: '' },
          { text: '70s Proc: Delay 1 tick, then freeze N1. Freeze S2. Because of the 1-tick delay on N1, move 2 tiles closer so your bow projectile stays in sync with scythe hits.', tip: 'If N1 does not spawn, skip and freeze S2. If MFrz is late, catch 3s.' },
          { text: '50s Proc: Freeze N1 and S2. If S2 does not spawn, freeze the clump. If the 70s S1 is still 40+ HP after freezing S2, scythe it once. ZCB Maiden together with MFrz once live HP drops below 38%.', tip: 'If MFrz is late, catch 3s.' },
          { text: '30s Proc: Freeze N1 and S2. Use an ayak fill on Maiden, then freeze 4s to clump. If either S2 or N1 spawns, barrage the clump instead. Scythe until dead.', tip: '' },
        ],
      },
      {
        id: 'ranger', name: 'Ranger', summary: 'Ranged DPS. Opens with TBow and Elder Maul spec, chins the 50s pile for Death Charge, and ZCBs Maiden at key HP thresholds.',
        procedure: [
          { text: 'Entry Rotation: Rapid TBow → Elder Maul spec. Summon Thrall ASAP. Stagger entry by walking 1 tile before the TBow line to position behind MDPS — this ensures they tank the first hit, letting you Maul without risking a drain.', tip: '' },
          { text: "After Maiden's first attack, on your first Scythe: SBS → Death Charge. Scythe Maiden until 70s proc.", tip: '' },
          { text: '70s Proc: Scythe Maiden until 50s proc. Ensure Death Charge has been cast before the 50s proc.', tip: '' },
          { text: '50s Proc: Scythe the 70s S1 once. Sip ranging potion for 112 stats. Throw 3 chins at the pile — stand 4–6 tiles away, use Medium Fuse. ZCB spec Maiden. Scythe until 30s proc.', tip: 'If you do not receive Death Charge from the clump, throw 2 additional chins.' },
          { text: '30s Proc: Scythe until Maiden dies.', tip: '' },
        ],
      },
      {
        id: 'mdps', name: 'Melee DPS', summary: "Melee DPS. Flinches Maiden to give Ranger venge opportunities. Uses Dinh's to finish north crabs at the 50s proc.",
        procedure: [
          { text: 'Cast SBS before entering the room. Keep Vengeance on cooldown. Flinch properly so your Ranger can take venges.', tip: '' },
          { text: "Entry Rotation: ZCB bolt rag → Scythe. Summon Thrall ASAP. On your first Scythe after Maiden's first attack: SBS → Death Charge. Scythe Maiden until 70s proc.", tip: '' },
          { text: '70s Proc: Scythe Maiden until 50s proc. Ensure Death Charge is active before the 50s proc.', tip: '' },
          { text: '50s Proc: Scythe 70s N1. Dinhs N2. Scythe N1 or N2 if they are >25 HP, otherwise Scythe Maiden. Sip Surge potion and ZCB spec Maiden.', tip: 'Prioritise scything 70s crabs — they will explode soon.' },
          { text: '30s Proc: Scythe Maiden until dead. Keep Vengeance up for your freezers. Heal teammates as needed.', tip: '' },
        ],
      },
    ],
  },
  {
    id: 'bloat', name: 'Pestilent Bloat', shortName: 'Bloat', color: '#7d6608',
    overview: 'Bloat walks clockwise around the room. Follow behind it, stop when it stops, and burst DPS during sleep phases. Flies fall from the ceiling during sleep — move off the indicator tiles.',
    setup: { notes: 'No special setup changes needed from Maiden.', image: null, gear: [], inventory: [], stats: [] },
    roles: EMPTY_ROLES,
  },
  {
    id: 'nylos', name: 'Nylocas Vasilias', shortName: 'Nylos', color: '#1a5276',
    overview: 'The most mechanically demanding room. Four lanes of nylo spawns must be handled before boss phase. Wrong-style attacks double nylo HP. Boss phase requires calling prayer switches between melee/range/magic.',
    setup: { notes: 'All three attack styles needed.', image: null, gear: [], inventory: [], stats: [] },
    roles: EMPTY_ROLES,
  },
  {
    id: 'sotetseg', name: 'Sotetseg', shortName: 'Sotetseg', color: '#6c3483',
    overview: 'One player is sent to The Maze (underworld) while three fight Sotetseg topside. Red orbs must be shared. Maze runner clicks tiles to keep topside alive.',
    setup: { notes: 'Pray melee for melee phase, magic for magic phase.', image: null, gear: [], inventory: [], stats: [] },
    roles: EMPTY_ROLES,
  },
  {
    id: 'xarpus', name: 'Xarpus', shortName: 'Xarpus', color: '#1d6a47',
    overview: 'Phase 1: heal all exhumes by walking over them. Phase 2: never let Xarpus face you — attack only when the eye looks away. Phase 3 screech: face away for 1 tick.',
    setup: { notes: 'Ranged optimal in phase 2 for distance.', image: null, gear: [], inventory: [], stats: [] },
    roles: EMPTY_ROLES,
  },
  {
    id: 'verzik', name: 'Verzik Vitur', shortName: 'Verzik', color: '#8e44ad',
    overview: 'Three-phase final boss. P1: tank under Verzik, kill pillars. P2: manage orbs, webs, and crabs while DPS-ing. P3: rapid damage with bouncing nylos, purple bombs, and lightning.',
    setup: { notes: 'Have all three attack styles accessible. P3 is a DPS race.', image: null, gear: [], inventory: [], stats: [] },
    roles: EMPTY_ROLES,
  },
];

const plugins = [
  { id: 'tob-qol', name: 'ToB QoL', category: 'Raids', description: "Essential quality-of-life improvements for Theatre of Blood. Instance Timer for Nylocas and Xarpus is a must — used to enter on the correct tick. Optionally enable for Sotetseg. Also shows Maiden crab HP as a percentage and Verzik Reds health overlay.", hub_link: null, tags: ['essential'], builtin: false, images: [{ src: '/assets/plugin-tob-qol-maiden.png', label: 'Maiden settings' }, { src: '/assets/plugin-tob-qol-nylocas.png', label: 'Nylocas settings (Instance Timer)' }, { src: '/assets/plugin-tob-qol-xarpus.png', label: 'Xarpus settings (Instance Timer)' }, { src: '/assets/plugin-tob-qol-verzik.png', label: 'Verzik settings' }], npc_ids: null },
  { id: 'nyloer', name: 'Nyloer', category: 'Raids', description: "Tracks total waves stalled, which wave you are on, and how many nylos were alive. After Wave 28, avoid killing anything 28 and under to end the room as fast as possible. Configure font settings to colour-code nylo styles.", hub_link: null, tags: ['essential', 'nylos'], builtin: false, images: [{ src: '/assets/plugin-nyloer.png', label: 'Font/colour settings' }], npc_ids: null },
  { id: 'nylo-death-indicators', name: 'Nylo Death Indicators', category: 'Raids', description: "Forces dead crabs to disappear sooner, removing screen clutter so you aren't shooting a dead crab. Sets itself up automatically. Pair with Better NPC Highlight to tag crabs that are about to split.", hub_link: null, tags: ['essential', 'nylos'], builtin: false, images: [{ src: '/assets/plugin-nylo-death-indicators.png', label: 'Plugin enabled' }], npc_ids: null },
  { id: 'better-npc-highlight', name: 'Better NPC Highlight', category: 'Raids', description: "Keeps the tile of a dead Nylo active, showing where a split is about to happen. Use the NPC IDs below to highlight only the relevant crabs. Tile Highlight on, red highlight colour (#FF630004), white fill (#00FFFFFF).", hub_link: null, tags: ['essential', 'nylos'], builtin: false, images: [{ src: '/assets/plugin-better-npc-highlight.png', label: 'Tile config with NPC IDs' }], npc_ids: '8351,8352,8353,8345,8346,8347,10794,10795,10796,10800,10801,10802' },
  { id: 'tob-predicted-hit', name: 'ToB Predicted Hit', category: 'Combat', description: "Shows an accurate percentage of Maiden's HP, which allows Freezers to stay on tick appropriately. Configure Maiden Live HP with a height offset of 30 and text colour #00FF00.", hub_link: null, tags: ['essential', 'maiden'], builtin: false, images: [{ src: '/assets/plugin-tob-predicted-hit.png', label: "Maiden HP settings" }], npc_ids: null },
  { id: 'advanced-raid-tracker', name: 'Advanced Raid Tracker', category: 'Raids', description: "Shows a tick-by-tick graph you can review during or after a raid to study where you lost a tick, or whether you were on tick with your teammates. Most useful in Maiden, Bloat, and Xarpus.", hub_link: null, tags: ['optional'], builtin: false, images: [], npc_ids: null },
];

async function seedRooms() {
  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    console.log(`Seeding room: ${room.id}`);

    await supabase.from('rooms').upsert({
      id: room.id, name: room.name, short_name: room.shortName,
      color: room.color, overview: room.overview, sort_order: i * 10,
    });

    await supabase.from('room_setup').upsert({
      room_id: room.id, notes: room.setup.notes ?? '',
      image: room.setup.image ?? null,
      gear: room.setup.gear ?? [], inventory: room.setup.inventory ?? [], stats: room.setup.stats ?? [],
    });

    for (let j = 0; j < room.roles.length; j++) {
      const role = room.roles[j];
      await supabase.from('roles').upsert({
        id: role.id, room_id: room.id, name: role.name,
        summary: role.summary ?? '', sort_order: j * 10,
      });

      for (let k = 0; k < role.procedure.length; k++) {
        const step = role.procedure[k];
        await supabase.from('steps').insert({
          room_id: room.id, role_id: role.id,
          step_number: k + 1, sort_order: k * 10,
          text: step.text, tip: step.tip ?? '', video: null,
        });
      }
    }
  }
  console.log('Rooms seeded.');
}

async function seedPlugins() {
  for (let i = 0; i < plugins.length; i++) {
    const p = plugins[i];
    console.log(`Seeding plugin: ${p.id}`);
    await supabase.from('plugins').upsert({
      id: p.id, name: p.name, category: p.category,
      description: p.description, hub_link: p.hub_link,
      tags: p.tags, builtin: p.builtin,
      images: p.images, npc_ids: p.npc_ids,
      sort_order: i * 10,
    });
  }
  console.log('Plugins seeded.');
}

async function main() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.');
    process.exit(1);
  }
  await seedRooms();
  await seedPlugins();
  console.log('Seed complete.');
}

main().catch((e) => { console.error(e); process.exit(1); });
