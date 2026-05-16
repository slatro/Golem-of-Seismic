# Seismic Golem - Run Flow and Reward Progression

## Goal
This document defines how a single run should feel from start to finish in the MVP. The structure must be easy to implement, easy to read, and strong enough to make build decisions matter.

## Run Length Target
- MVP target: 15-20 minutes
- Early prototype target: 8-10 minutes

The player should feel a clear escalation from "basic stone guardian" to "unstable evolved Core-powered force" within one run.

## High-Level Run Flow
1. Start in the surface descent chamber.
2. Enter the first sequence of combat rooms.
3. Choose early Body mutation.
4. Face mixed encounters and one first-risk decision.
5. Choose Core mutation or relic.
6. Reach elite or miniboss checkpoint.
7. Enter final prep room.
8. Fight Quarry Keeper.
9. Earn meta currency and unlock progress.

## Room Count Target
Recommended MVP run structure:
- 1 intro room
- 4 standard combat rooms
- 1 event or risk room
- 1 elite room
- 1 merchant or forge room
- 1 pre-boss reward room
- 1 boss room

Total:
- 9 to 10 rooms depending on branch path

## Room Types
### Intro Room
Purpose:
- teach controls safely
- introduce first small enemy group

Reward:
- none or guaranteed small resource

### Combat Room
Purpose:
- standard pacing room
- teaches enemy combinations

Reward:
- one of Body mutation, Core mutation, relic, or currency

### Elite Room
Purpose:
- higher pressure combat check
- tests understanding of build and movement

Reward:
- higher rarity upgrade
- guaranteed relic or stronger mutation

### Risk Room
Purpose:
- give player a meaningful gamble

Examples:
- lose health for stronger reward
- choose one curse-like modifier for extra upgrade quality

Reward:
- stronger-than-normal pick

### Stone Forge
Purpose:
- body-oriented upgrade room
- focuses on melee and defense shaping

Reward:
- Body mutation choice
- reroll or reinforce existing Body trait

### Core Shrine
Purpose:
- chest Core evolution room
- focuses on active skill and energy identity

Reward:
- Core mutation choice
- Core Pulse enhancement

### Merchant
Purpose:
- pacing break
- recovery and rerouting

Reward options:
- buy heal
- buy relic
- buy reroll
- remove one weak upgrade from reward pool if system supports it later

### Pre-Boss Reward Room
Purpose:
- let player make one final strategic choice

Reward:
- pick one focused power upgrade
- heal or power tradeoff

### Boss Room
Purpose:
- close the run with a skill and build check

Reward:
- run result
- meta currency payout

## Reward Categories
### Body Mutations
Used for:
- melee damage shape
- mobility weight
- durability and stagger identity

### Core Mutations
Used for:
- Core Pulse behavior
- chain effects
- overload effects

### Relics
Used for:
- flexible rule changes
- hybrid synergies
- economy or utility boosts

### Currency
Used for:
- shop purchases in-run
- meta progression after death or victory

## MVP Reward Curve
The first run should not bury the player in complexity. Rewards should be staged.

### Early Run
Rooms 1-3:
- mostly simple, identity-establishing upgrades
- teach player the difference between Body and Core

Examples:
- Magma Fists
- Basalt Frame
- Arc Core

### Mid Run
Rooms 4-7:
- start adding synergy and decision tension
- allow hybrid paths

Examples:
- Conductive Veins
- Ember Core
- Facet Echo

### Late Run
Rooms 8+:
- high-value relics
- large effect mutations
- pre-boss power choice

Examples:
- Prism Overload
- Seismic Vent
- elite relics or reinforced traits

## Reward Selection Format
Recommended MVP format:
- player sees 3 choices after major reward rooms
- each choice is clearly labeled as Body, Core, or Relic
- each option shows short effect text and simple icon

Design rules:
- no wall of text
- avoid hidden math in early versions
- category clarity matters more than rarity complexity

## Reward Pacing Rules
- first meaningful upgrade should happen within 2 rooms
- player should see one Core-focused upgrade before mid-run
- player should reach boss with 5-7 meaningful power pickups
- at least one reward should strongly reinforce the chosen build path

## Example MVP Run Path
1. Intro Room
Fight:
- small Shard Mite group

2. Combat Room
Fight:
- Tunnel Brute + Shard Mites

Reward:
- choose 1 Body mutation

3. Combat Room
Fight:
- Vein Caster + Shard Mites

Reward:
- currency or small passive

4. Core Shrine
Reward:
- choose 1 Core mutation

5. Combat Room
Fight:
- mixed enemy pack

Reward:
- relic or Body mutation

6. Risk Room
Choice:
- lose health for stronger reward

7. Elite Room
Fight:
- Obsidian Sentinel encounter

Reward:
- high-value relic or mutation

8. Merchant or Forge
Choice:
- heal, buy, reroll, or reinforce current route

9. Pre-Boss Room
Reward:
- final upgrade choice

10. Boss Room
Fight:
- Quarry Keeper

## Meta Progression Payout
At the end of the run, the player earns:
- base currency from rooms completed
- bonus currency from elite clear
- bonus currency from boss victory
- optional style bonus later, not needed for MVP

## Failure Handling
On death:
- show summary of chosen build
- show depth reached
- show currency earned
- return player to upgrade hub quickly

The return loop should be fast. Dying should feel like momentum for the next run, not punishment.

## MVP Success Check
The run flow is working if:
- players understand the difference between room types quickly
- rewards arrive often enough to feel exciting
- boss attempts feel meaningfully different depending on choices made
- the player wants to immediately start another run
