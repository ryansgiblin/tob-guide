// Migration: replace all roles with 4 standardized roles per room.
// Run with service role key:
//
//   SUPABASE_URL="https://..." SUPABASE_SERVICE_ROLE_KEY="..." node scripts/migrate-roles.mjs

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const ROLES = [
  { id: 'mfrz',   name: 'Melee Freeze', sort_order: 0 },
  { id: 'sfrz',   name: 'South Freeze', sort_order: 10 },
  { id: 'ranger', name: 'Ranger',        sort_order: 20 },
  { id: 'mdps',   name: 'Melee DPS',    sort_order: 30 },
];

const ROOM_IDS = ['maiden', 'bloat', 'nylos', 'sotetseg', 'xarpus', 'verzik'];

// Maiden steps mapped to new role IDs
// mfrz → mfrz (Melee Freeze), mage → sfrz (South Freeze), rdps → ranger, mdps → mdps
const maidenSteps = {
  mfrz: [
    { text: 'Camp Lightbearer. Switch to Ultor after freezing the 30s. If you are ever late on a freeze, ping your Mage.', tip: '' },
    { text: "Entry Rotation: Accurate TBow → Ralos spec → Accurate TBow → switch to Rapid and continue bowing until proc. If Maiden's defence is still above 60 after your Ralos, Ralos spec again then continue rapid bowing.", tip: 'When freezing 3s, click S3 so your barrage also hits the clump.' },
    { text: '70s Proc: Freeze S1 and N234. TBow until 50s proc.', tip: 'If you are late, your Mage catches 3s — meaning you must catch 4s.' },
    { text: "50s Proc: Freeze S1 and N234. If a crab doesn't spawn, freeze the clump. TBow until Maiden reaches ~38% HP, then ZCB together with Mage to force the 30s proc.", tip: 'If Maiden is ~34% HP after freezing 4s, do NOT ZCB — prepare to freeze instead.' },
    { text: "30s Proc: Freeze S1, N2, and 3s. Your Mage catches 4s. If a crab doesn't spawn, freeze the clump. Swap to Ultor. Scythe until dead. If you have leftover spec, you can ZCB / Claw / Chally.", tip: '' },
  ],
  sfrz: [
    { text: 'Cast SBS before entering the room. Keep Vengeance on cooldown. Stay south of Maiden unless taking a Veng — walk east to facilitate this. Sip Surge pot on entry.', tip: '' },
    { text: 'Entry Rotation: Accurate TBow → Ralos spec → Accurate TBow → switch to Rapid and continue bowing until proc.', tip: '' },
    { text: '70s Proc: Delay 1 tick, then freeze N1. Freeze S2. Because of the 1-tick delay on N1, move 2 tiles closer so your bow projectile stays in sync with scythe hits.', tip: 'If N1 does not spawn, skip and freeze S2. If MFrz is late, catch 3s.' },
    { text: '50s Proc: Freeze N1 and S2. If S2 does not spawn, freeze the clump. If the 70s S1 is still 40+ HP after freezing S2, scythe it once. ZCB Maiden together with MFrz once live HP drops below 38%.', tip: 'If MFrz is late, catch 3s.' },
    { text: '30s Proc: Freeze N1 and S2. Use an ayak fill on Maiden, then freeze 4s to clump. If either S2 or N1 spawns, barrage the clump instead. Scythe until dead.', tip: '' },
  ],
  ranger: [
    { text: 'Entry Rotation: Rapid TBow → Elder Maul spec. Summon Thrall ASAP. Stagger entry by walking 1 tile before the TBow line to position behind MDPS — this ensures they tank the first hit, letting you Maul without risking a drain.', tip: '' },
    { text: "After Maiden's first attack, on your first Scythe: SBS → Death Charge. Scythe Maiden until 70s proc.", tip: '' },
    { text: '70s Proc: Scythe Maiden until 50s proc. Ensure Death Charge has been cast before the 50s proc.', tip: '' },
    { text: '50s Proc: Scythe the 70s S1 once. Sip ranging potion for 112 stats. Throw 3 chins at the pile — stand 4–6 tiles away, use Medium Fuse. ZCB spec Maiden. Scythe until 30s proc.', tip: 'If you do not receive Death Charge from the clump, throw 2 additional chins.' },
    { text: '30s Proc: Scythe until Maiden dies.', tip: '' },
  ],
  mdps: [
    { text: 'Cast SBS before entering the room. Keep Vengeance on cooldown. Flinch properly so your Ranger can take venges.', tip: '' },
    { text: "Entry Rotation: ZCB bolt rag → Scythe. Summon Thrall ASAP. On your first Scythe after Maiden's first attack: SBS → Death Charge. Scythe Maiden until 70s proc.", tip: '' },
    { text: '70s Proc: Scythe Maiden until 50s proc. Ensure Death Charge is active before the 50s proc.', tip: '' },
    { text: '50s Proc: Scythe 70s N1. Dinhs N2. Scythe N1 or N2 if they are >25 HP, otherwise Scythe Maiden. Sip Surge potion and ZCB spec Maiden.', tip: 'Prioritise scything 70s crabs — they will explode soon.' },
    { text: '30s Proc: Scythe Maiden until dead. Keep Vengeance up for your freezers. Heal teammates as needed.', tip: '' },
  ],
};

async function main() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  // 1. Delete all steps first (avoid FK issues), then roles
  console.log('Deleting all steps...');
  const { error: stepsErr } = await supabase.from('steps').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (stepsErr) { console.error('steps delete failed:', stepsErr); process.exit(1); }

  console.log('Deleting all roles...');
  const { error: rolesErr } = await supabase.from('roles').delete().neq('id', '__none__');
  if (rolesErr) { console.error('roles delete failed:', rolesErr); process.exit(1); }

  // 2. Insert 4 standard roles for every room
  for (const roomId of ROOM_IDS) {
    for (const role of ROLES) {
      console.log(`Inserting role ${role.id} for ${roomId}...`);
      const { error } = await supabase.from('roles').insert({
        id: role.id, room_id: roomId,
        name: role.name, summary: '', sort_order: role.sort_order,
      });
      if (error) { console.error(`role insert failed (${roomId}/${role.id}):`, error); process.exit(1); }
    }
  }

  // 3. Seed Maiden steps
  console.log('Seeding Maiden steps...');
  for (const [roleId, steps] of Object.entries(maidenSteps)) {
    for (let i = 0; i < steps.length; i++) {
      const { error } = await supabase.from('steps').insert({
        room_id: 'maiden', role_id: roleId,
        step_number: i + 1, sort_order: i * 10,
        text: steps[i].text, tip: steps[i].tip, video: null,
      });
      if (error) { console.error(`step insert failed (maiden/${roleId}):`, error); process.exit(1); }
    }
  }

  console.log('Migration complete. 24 roles inserted (6 rooms × 4 roles). Maiden steps seeded.');
}

main().catch((e) => { console.error(e); process.exit(1); });
