# Seismic Golem - Prototype Scene Plan

## Goal
This plan defines the first playable graybox scene for Seismic Golem. The purpose is to validate feel, not content breadth. The first scene should answer one question clearly: is controlling this golem fun?

## Prototype Success Criteria
- movement feels weighty but responsive
- light combo and heavy attack feel satisfying
- Core Pulse already sells the pink chest Core fantasy
- one enemy encounter is fun enough to repeat
- room restart flow is fast

## Scene Name
`Prototype_CombatArena`

## Scene Purpose
This is not a final biome room. It is a controlled graybox arena where player movement, attacks, enemy reactions, and camera tuning can be iterated quickly.

## Layout
Recommended structure:
- one medium arena in the center
- one enemy spawn lane on each side
- one safe debug platform or control panel area
- one visible chest Core showcase light source for presentation testing

Arena rules:
- simple collision
- no clutter
- enough space for dash testing
- readable edges

## Scene Contents
### Player Spawn
- fixed spawn point
- camera starts already framed

### Enemy Spawn Points
- 4 simple spawn markers around arena
- enable wave testing from multiple angles

### Debug Reward Trigger
- interactable trigger or UI button
- grants one chosen upgrade for test flow

### Boss Gate Trigger
- optional portal or debug button
- instantly swaps encounter profile to Quarry Keeper test setup later

## Prototype Encounter Order
### Test 1 - Single Target
Enemy:
- 1 Tunnel Brute

Purpose:
- validate melee rhythm and dodge timing

### Test 2 - Swarm Check
Enemies:
- 4-5 Shard Mites

Purpose:
- validate combo finisher and Core Pulse usefulness

### Test 3 - Mixed Pressure
Enemies:
- 1 Vein Caster
- 1 Tunnel Brute
- 2 Shard Mites

Purpose:
- validate target priority and approach decisions

### Test 4 - Elite Check
Enemy:
- 1 Obsidian Sentinel

Purpose:
- validate heavy attack and punish loop

## Prototype UI
Need only essential widgets:
- HP bar
- Core meter
- current build tags
- debug encounter buttons
- debug upgrade buttons

Nice to have:
- damage log text
- current room label

## Visual Style for Graybox
- dark stone floor
- simple pillars or rock chunks only where needed for scale
- placeholder emissive Core lighting
- basic dust hit effect

Do not spend time on:
- final props
- set dressing
- cinematic lighting polish

## Core Interaction Checklist
Before expanding scope, confirm:
- dash cancel timing feels correct
- combo finisher has enough payoff
- heavy attack is worth using
- Core Pulse is not redundant
- hit feedback is understandable without damage numbers

## Recommended Prototype Script Set
- PlayerRoot
- PlayerMotor
- PlayerCombat
- PlayerStats
- EnemyRoot
- EnemyBrain
- EncounterManager
- DebugCombatPanel
- CameraFollowRig

## Daily Iteration Loop
1. Load Prototype_CombatArena
2. Spawn enemy test set
3. Tune one mechanic only
4. Restart instantly
5. Repeat until that mechanic feels right

Do not test room generation and boss scripting in the same iteration session as base attack feel unless needed.

## First 5 Build Steps
1. Create arena scene and camera angle
2. Drop in golem placeholder or first-pass hero mesh
3. Implement move, face, light combo
4. Add Tunnel Brute and damage reaction
5. Add Core Pulse and Shard Mite swarm test

## Exit Condition
Move to room-flow prototype only when:
- the player kit already feels fun in a blank room
- at least two enemy types create different decisions
- the Core reads as the identity center of the hero

## Nice Follow-Up Scene
After this scene works, create:
`Prototype_RunSlice`

Purpose:
- connect several small rooms
- test rewards and encounter pacing
- prepare the transition toward the real MVP vertical slice
