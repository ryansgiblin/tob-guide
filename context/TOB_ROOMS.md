# TOB Rooms Reference — 4s Max Eff

## Room Order
1. Maiden of Sugadinti
2. Pestilent Bloat
3. Nylocas Vasilias
4. Sotetseg
5. Xarpus
6. Verzik Vitur

---

## Maiden of Sugadinti

### Overview
Maiden is the first boss. At 4s the team splits into two: one player handles the north magers/rangers,
one handles the south, and DPS burn the boss. Understanding where to stand for spawns is critical.

### 4s Roles
- **North Tank** — stands NW/NE, pulls north spawns, handles magers
- **South Tank** — stands SW/SE, pulls south spawns
- **DPS 1** — burns maiden, avoids blood spawns
- **DPS 2** — burns maiden, handles any stragglers

### Key Mechanics
- Maiden spawns blood at 70%, 50%, 30% HP
- Nylo-like spawns come from north and south sides — must be killed before reaching maiden
- Magers freeze tanks in place — tank must prayer-flick
- S2 (phase 2) spawns are faster — positioning matters more

---

## Pestilent Bloat

### Overview
Bloat is a straightforward walk boss. The team kites Bloat around the room, stopping each time
it stops walking. DPS it during its "sleep" phases. Critical: do not stand in flies.

### 4s Roles (all similar — no strict split)
- All 4 players walk behind bloat in the same direction
- One player calls "walk" / "stop" (the caller role)
- When bloat stops, everyone burns it
- Flies fall from the ceiling — move out of the yellow indicator tiles

### Key Mechanics
- Bloat walks clockwise (usually) — follow behind
- Stomps deal AoE damage if you're too close to feet
- After each sleep phase, flies spawn — clear the indicator tiles
- No prayer switching needed; just don't get hit by flies

---

## Nylocas Vasilias

### Overview
Nylos is arguably the hardest and most role-dependent room. Four roles split across
four entry lanes. Nylos spawn in waves; wrong-pray explodes deal massive damage to the team.

### 4s Roles
- **West** — kills west lane nylos
- **East** — kills east lane nylos
- **North-West** — supports west + scythes south pillar
- **North-East** — supports east + scythes south pillar
- **Caller** — typically one of the DPS roles; calls boss phase switches

### Key Mechanics
- Nylos come in three styles: ranged (blue), magic (purple), melee (white/grey)
- Each style requires the correct attack style — wrong style doubles their HP
- At boss phase: Vasilias switches between combat styles — caller must call/pray correctly
- Pillars in the room reduce boss max HP when destroyed — try to save pillars for boss phase

---

## Sotetseg

### Overview
Sotetseg is a maze boss. One player gets sent to The Maze (the Underworld) while three others
fight the boss. Both groups must stay coordinated.

### 4s Roles
- **Maze runner** — sent to underworld; must complete the maze while others fight
- **Active 3** — fight Sotetseg topside, avoid red orbs, click maze tiles to help runner

### Key Mechanics
- Red orb: must be shared between two players (stand next to each other to split damage)
- Maze: tiles light up in the underworld — click them quickly or the topside player takes damage
- At 66% and 33%: player rotation for maze (pre-agree who goes which phase)
- Sotetseg attacks with melee and magic — pray melee during melee phase, magic during magic

---

## Xarpus

### Overview
Xarpus is a two-phase boss. Phase 1: heal exhumes (skeletons) with poison. Phase 2: face away
from the eye to avoid screech and hit during non-facing ticks.

### 4s Roles (all similar, positional)
- **East/West DPS** — heal exhumes from their respective side, then burn boss
- **North DPS** — heals north exhumes, positioned for phase 2
- **South DPS** — heals south exhumes, positioned for phase 2

### Key Mechanics
- Phase 1: walk over exhumes to heal them (poison attacks until healed) — 4 exhumes must all be healed
- Phase 2: Xarpus faces a direction — never let it look at you (face away), or you take heavy damage
- Phase 2: attack when Xarpus's eye rotates away from you
- P3 screech: when HP reaches ~50% it screeches — everyone must turn away for 1 tick

---

## Verzik Vitur

### Overview
Verzik is the final boss. Three phases with distinct mechanics. P1 is pillar tanking;
P2 is orb tanking and web phase; P3 is the DPS race with bouncing nylos.

### 4s Roles
- **P1 Tank** — stands under Verzik, takes hits, ticks prayer
- **3 DPS** — hit pillars, avoid running into Verzik range
- **P2/P3 roles** — all burn boss; one player designated for web/orb responsibility

### Key Mechanics
- **P1**: Tank under Verzik. Hit pillars to reduce their HP. Transition at pillar death.
- **P2**: Verzik uses magic/melee/range. Pray according to attack animation.
  - Crab phase: Verzik summons crabs — avoid getting hit by boomerang crabs
  - Orb: red orb bounces between players — must be shared
  - Web: player gets webbed — teammates must click the web to free them
- **P3**: High DPS phase. Small nylos bounce around the room, dealing damage on contact.
  - Verzik does a purple bomb — step out of range
  - Lightning: move constantly in P3 to avoid lightning strikes
  - Final phase: focus burst DPS

---

## Notes for Data Entry
When filling in `src/data/rooms.js`:
- Add real YouTube video IDs when available (e.g. `id: 'dQw4w9WgXcQ'`)
- For gifs, drop files in `public/assets/` and reference `/assets/maiden-north-tank.gif`
- Procedure steps should be concise (1-2 sentences max per step)
- Tips (optional per step) should flag common mistakes or tricky timing
