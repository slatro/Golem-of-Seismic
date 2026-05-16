# Seismic Golem - MVP Feature Plan

## Goal
Build a vertical slice that proves Seismic Golem is fun, readable, and scalable. The MVP should deliver one complete run with the exact golem hero, the exact pink chest Core, a small set of enemies, meaningful upgrade choices, and one biome boss.

## MVP Definition
The MVP is successful when a player can:
- start a run
- move and fight as Seismic Golem
- clear a sequence of rooms
- choose upgrades that create two distinct build directions
- defeat a boss or die trying
- spend earned currency on simple permanent upgrades

## Core Features
### 1. Playable Character
- Exact golem silhouette implemented in-game.
- Exact pink faceted chest Core implemented in-game.
- Idle, move, hit, hurt, death, and Core overload states.

### 2. Combat Kit
- Light combo
- Heavy attack
- Dash
- Core Pulse active skill
- Overload ultimate

### 3. Build System
Launch with two build paths only:
- Magma
- Pure Energy

Needed support systems:
- mutation selection screen
- relic pickup system
- simple synergy hooks

### 4. Dungeon Run Structure
- room-to-room progression
- weighted room selection
- combat, elite, shrine, forge, merchant, boss rooms
- reward selection after room clear

### 5. Enemies
- 3 standard enemies
- 1 elite enemy
- 1 miniboss or elite gate encounter
- 1 full biome boss

### 6. Meta Progression
- end-of-run resource payout
- simple upgrade screen
- 5-8 permanent unlocks

### 7. Presentation
- temporary but coherent UI
- combat VFX for stone impact and Core power
- placeholder music and high-value SFX

## Production Priorities
1. Feel of movement and hits.
2. Room flow and encounter pacing.
3. Upgrade choices that noticeably change play.
4. Boss fight quality.
5. Visual identity and polish.

## Milestones
### Milestone 1 - Combat Prototype
Deliverables:
- player controller
- camera
- one test room
- one dummy enemy
- light/heavy/dash loop
- hit feedback pass

Exit check:
- hitting enemies already feels satisfying

### Milestone 2 - Run Structure Prototype
Deliverables:
- room transition flow
- combat room completion logic
- reward choice screen
- first pass UI
- first three enemy archetypes

Exit check:
- player can complete a short 5-room prototype run

### Milestone 3 - Build Identity
Deliverables:
- Magma path
- Pure Energy path
- 8-12 mutations
- 6-8 relics
- visible Core and body feedback on upgrades

Exit check:
- two runs play differently enough to be replayable

### Milestone 4 - Boss Vertical Slice
Deliverables:
- one miniboss or elite gate
- Quarry Keeper boss
- biome-end structure
- death and reward loop
- first meta progression layer

Exit check:
- player can complete a 15-20 minute run from start to boss

### Milestone 5 - Polish Pass
Deliverables:
- VFX polish
- impact audio
- readability tuning
- onboarding text
- balance tuning

Exit check:
- external player understands the game without explanation

## Feature Backlog by Discipline
### Design
- define combat timings
- define enemy behavior matrix
- define mutation pool
- define relic pool
- define biome reward pacing
- define economy and meta costs

### Engineering
- character controller
- combat state machine
- damage and status system
- skill cooldown system
- room manager
- procedural room sequencing
- reward selection system
- save data for meta progression
- boss state machine

### Art
- final hero model integration
- chest Core integration and emissive setup
- enemy blockouts
- biome blockout kit
- impact VFX
- Core mutation VFX variants
- UI frames and icons

### Animation
- locomotion
- combo chain
- heavy attack
- dash
- hurt and death
- Core overload state
- enemy attack sets
- boss telegraphs

### Audio
- footstep layers
- punch and slam layers
- Core hum and pulse layers
- enemy attack cues
- boss phase cues
- UI feedback sounds

## First Sprint Recommendation
Week 1 focus:
- lock player scale and camera angle
- implement movement and one attack
- test golem feel in a graybox room
- integrate temporary chest Core visual

Week 2 focus:
- finish base combat kit
- add first enemy
- add room completion flow
- test first reward choice

Week 3 focus:
- add Magma and Energy branches
- add relic data structure
- create 5-room run

Week 4 focus:
- add miniboss and boss prototype
- add end-of-run and meta loop
- run first balance pass

## Non-Negotiables
- The hero must remain the same golem identity throughout all builds.
- The pink chest Core must remain visible and recognizable at all times.
- Combat feel matters more than content volume.
- Do not expand to more than two build paths before the first playable vertical slice works.

## Kill List
Features to avoid in MVP:
- online co-op
- full open-world exploration
- too many biomes
- more than one boss biome at launch slice
- advanced crafting
- cinematic story scenes
- endless procedural complexity without room quality

## Immediate Next Tasks
1. Write the combat spec for the base move set.
2. Define the first 12 upgrade choices.
3. Define the first enemy roster and Quarry Keeper behavior.
4. Choose engine and project structure.
5. Build the graybox combat prototype.
