# Seismic Golem - Boss Design: Quarry Keeper

## Boss Purpose
Quarry Keeper is the first major boss of Seismic Golem. It should validate the core fantasy of the game: heavy melee commitment, telegraph reading, and chest Core-powered payoff. The fight must feel like battling an ancient excavation guardian built from the same geological world as the player.

## Boss Fantasy
Quarry Keeper is a colossal guardian once built to protect the upper excavation routes. It now attacks anything carrying Core energy. It should feel like a moving landslide with intentional, devastating attacks rather than a fast monster.

## Visual Direction
- gigantic stone-and-ore guardian
- angular carved body with quarry tool motifs
- damaged sections exposing unstable mineral glow
- silhouette should read as broader and more fortress-like than the player

## Arena
Theme:
- broken mining chamber
- circular or semi-circular arena
- fractured stone floor
- edge rubble and old pillar remains

Gameplay goals:
- enough room to read telegraphs and reposition
- some floor fracture moments for visual escalation
- no clutter that blocks readability

## Boss Difficulty Goals
- tests dodge timing
- tests commitment windows
- tests correct use of heavy attacks and Core Pulse
- introduces phase escalation without becoming visually noisy

## Core Fight Structure
- Phase 1: slow pattern recognition
- Phase 2: arena pressure and combo chaining
- Final burn: unstable aggression and punish windows

## Phase 1 - Establishment
Purpose:
- teach the boss language
- give the player readable punish moments

Attacks:
### 1. Quarry Slam
- raises one arm high
- slams the ground in front
- sends a short seismic line forward

Player response:
- sidestep or dash diagonally
- punish after impact

### 2. Double Fist Pound
- both arms lift outward
- boss pounds the floor twice
- second pound creates wider shockwave

Player response:
- avoid early panic dash
- dodge second impact timing

### 3. Boulder Hurl
- tears a rock chunk from ground
- throws at player location

Player response:
- keep moving
- close distance while boss recovers

Phase 1 rule:
- punish windows should be generous

## Phase 2 - Pressure
Transition cue:
- boss roars or emits a deep quarry horn sound
- cracks spread through arena floor
- chest or core cavity glow intensifies

New attacks:
### 4. Fault Step
- stomps and causes a delayed floor rupture in a line

Player response:
- read line placement
- reposition before rupture

### 5. Summon Shard Mites
- boss breaks side rubble
- several Shard Mites enter arena

Player response:
- decide between boss pressure or add clear
- Magma path should shine here

### 6. Guarded Advance
- boss walks forward with arms shielding torso
- contact causes knockback

Player response:
- avoid frontal pressure
- attack after advance ends or hit from angle

Phase 2 rule:
- boss begins overlapping attacks with movement pressure

## Final Burn Phase
Trigger:
- boss reaches low health threshold

Fantasy:
- unstable guardian close to collapse
- more dangerous but easier to punish

Behavior changes:
- attack chains shorten recovery if player is greedy
- some attacks gain extra rock burst or fissure echo
- boss briefly exposes glowing weak points after major whiffs

New attack:
### 7. Cataclysm Pound
- long telegraph
- huge area slam with radial debris burst
- leaves short-lived fractured hazard rings

Player response:
- full reposition commitment
- punish only after debris settles

Final phase rule:
- intensity rises, but clarity must remain intact

## Weak Points and Counterplay
- arms and head can be armored visually, but the design should not require precision aim
- the main counterplay is timing and positioning, not weak-point sniping
- after certain heavy attacks, boss posture should drop enough to invite a heavy punish or Core Pulse use

## Interaction With Player Builds
### Against Magma
- Shard Mite summon phase becomes favorable for the player if controlled well
- close-range punish loops feel strong but risky

### Against Pure Energy
- chain reactions help on add waves
- boss punish windows reward burst-oriented Core timing

## Sound and VFX Priorities
- very deep stone-on-stone impacts
- floor cracking layers before damage lands
- visible dust rings and debris arcs
- distinct sound cue before Cataclysm Pound
- boss must never be louder visually than the player's chest Core moments during punish

## Implementation Notes
MVP implementation order:
1. Quarry Slam
2. Double Fist Pound
3. Boulder Hurl
4. Fault Step
5. Shard Mite summon
6. Cataclysm Pound

This order lets the fight become playable early and expand safely.

## Boss Success Check
The fight is working if:
- first-time players understand why they got hit
- the player feels smart for punishing after big attacks
- Phase 2 feels escalated, not random
- victory feels like surviving a geological disaster through timing and nerve
