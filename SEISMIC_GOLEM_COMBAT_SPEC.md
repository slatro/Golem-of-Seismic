# Seismic Golem - Base Combat Spec

## Combat Intent
Combat must feel heavy, readable, and rewarding. The player is not a fast swordsman. The player is a compact walking impact machine. Every successful hit should feel like stone colliding with matter under pressure, while the chest Core adds dangerous crystalline force on top.

## Camera and Readability
- Perspective: isometric or high-angle top-down 3D
- Camera goal: always keep the hero body and chest Core readable
- Combat readability priority: telegraphs first, spectacle second
- Screen shake only on heavy actions, elite hits, and boss slams

## Base Stats Direction
- Health: high
- Base move speed: low-medium
- Base attack speed: low-medium
- Stagger resistance: high
- Dash distance: short
- Burst windows: created through timing and Core use, not permanent speed

## Input Kit
### Light Attack
Purpose:
- bread-and-butter combo
- safe short-range pressure

Structure:
- 3-hit chain
- hit 1: quick jab
- hit 2: cross/body hook
- hit 3: overhead smash with mini shockwave

Design rules:
- first two hits can slightly move the golem forward
- third hit should feel committal
- combo should be cancellable into dash after hit 1 or hit 2

### Heavy Attack
Purpose:
- armor break
- crowd interruption
- burst setup

Structure:
- wind-up strike with visible body compression
- strong single-target impact
- small frontal splash

Design rules:
- longer startup than combo finisher
- should break weak enemy guard states
- should be a major trigger point for Body mutations

### Dash
Purpose:
- reposition
- avoid telegraphed hits
- maintain close-range uptime

Structure:
- short stone slide or lunge
- tiny collision pulse at start or end

Design rules:
- this is not a flashy anime dodge
- dash should feel weighty and grounded
- slight invulnerability window allowed, but short

### Core Skill: Core Pulse
Purpose:
- signature chest ability
- build-defining active tool

Base version:
- short-range pulse from chest Core
- deals area damage around the golem
- knocks back lighter enemies

Design rules:
- visual focus is always the pink faceted chest Core
- Body path modifies impact behavior
- Core path modifies energy behavior

### Ultimate: Overload State
Purpose:
- high-drama power spike
- capstone moment in fights

Base version:
- Core enters unstable overcharge state for a short duration
- light attacks hit harder
- heavy creates larger shockwaves
- Core Pulse gains bonus effect

Design rules:
- should feel rare and special
- chest Core glow and sound must intensify sharply
- hero silhouette stays recognizable

## Combat Rhythm
Target rhythm:
- approach
- light combo or heavy
- dodge telegraph
- punish with slam or Core Pulse
- use Overload during pressure peaks

The player should feel strongest when committing at the right time, not when mashing.

## Hit Feel Requirements
- hit-stop on every landed melee hit
- larger freeze frame on heavy and combo finisher
- enemy flash and debris burst
- bass-heavy impact layer
- clear damage numbers optional, but impact readability mandatory

## Enemy Counterplay Rules
- swarm enemies force spacing and combo control
- ranged enemies force approach timing
- armored enemies reward heavy attack use
- burrow or ambush enemies reward dash discipline
- bosses test the full loop of commit, evade, punish, overload

## Status Effects
Initial status set:
- Burn
- Shock

Deferred to later slice:
- Freeze
- Poison

MVP rule:
- Magma uses Burn
- Energy uses Shock

## Build Interaction Rules
### Body Mutations
Body mutations should modify:
- melee range
- impact shape
- armor or stagger behavior
- trail effects and material response

### Core Mutations
Core mutations should modify:
- Core Pulse pattern
- proc logic
- chain reactions
- ultimate side effects

## Launch Combat Package
For the first playable slice, include:
- Light combo
- Heavy attack
- Dash
- Core Pulse
- Overload State
- Burn and Shock statuses

## Tuning Goals
- First room should feel good within 30 seconds
- Heavy attack should be satisfying by feel even before polish
- Core Pulse should immediately sell the pink chest Core fantasy
- The player should understand the difference between Magma and Energy in one run
