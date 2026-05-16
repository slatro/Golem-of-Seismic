# Seismic Golem - Unity Technical Architecture

## Goal
This document defines a clean Unity architecture for Seismic Golem's MVP vertical slice. The structure should support fast iteration, readable ownership, and painless expansion from prototype to production.

## Engine Recommendation
- Engine: Unity
- Rendering: URP
- Target camera: isometric or high-angle top-down 3D
- Input: Unity Input System
- Data approach: ScriptableObject-driven content definitions

Why this stack:
- fast iteration for combat-heavy prototypes
- simple support for stylized 3D workflows
- scalable content pipeline for mutations, relics, enemies, and rooms

## Technical Principles
- Keep gameplay logic data-driven where possible.
- Separate runtime state from content definitions.
- Build the MVP in systems that can expand without rewrite.
- Prefer composition over giant inheritance chains.
- Optimize for iteration speed first, polish second.

## Project Layers
### 1. Core Systems
Responsibilities:
- game bootstrap
- scene loading
- save data
- event bus
- game state flow

### 2. Combat Systems
Responsibilities:
- player attacks
- enemy attacks
- damage resolution
- hit reactions
- status effects
- stagger and knockback

### 3. Run Systems
Responsibilities:
- room sequencing
- reward generation
- run seed or encounter progression
- elite and boss gating

### 4. Progression Systems
Responsibilities:
- in-run upgrades
- relic handling
- meta currency payout
- permanent unlocks

### 5. Presentation Systems
Responsibilities:
- camera
- UI
- VFX
- audio triggers
- animation state handling

## Recommended Folder Structure
```text
Assets/
  Art/
    Characters/
    Enemies/
    Environments/
    FX/
    UI/
  Audio/
    Music/
    SFX/
  Materials/
  Prefabs/
    Characters/
    Enemies/
    Rooms/
    UI/
    Props/
  Scenes/
    Bootstrap/
    Hub/
    Prototype/
    Biomes/
  Scripts/
    Core/
    Combat/
    Characters/
    Enemies/
    Rooms/
    Run/
    Progression/
    UI/
    Camera/
    Audio/
    Utils/
  ScriptableObjects/
    Characters/
    Enemies/
    Rooms/
    Upgrades/
    Relics/
    Encounters/
    StatusEffects/
  Animations/
    Player/
    Enemies/
    Boss/
  UI Toolkit/
  Resources/
  Settings/
```

## Scene Structure
### Bootstrap Scene
Purpose:
- initialize persistent systems
- load hub or prototype scene

Contents:
- GameBootstrap
- SaveManager
- AudioManager
- SceneFlowController

### Hub Scene
Purpose:
- meta progression and run start

Contents:
- upgrade altar or chamber
- run start trigger
- unlock and currency UI

### Prototype Scene
Purpose:
- fast iteration on combat and room flow

Contents:
- player spawn
- test arena
- enemy spawn points
- debug UI
- reward test terminal or trigger

### Biome Scene or Room Prefab Flow
Purpose:
- final vertical slice run content

Approach:
- keep rooms as prefabs
- load and connect through a room manager rather than making one giant handcrafted level

## Runtime Architecture
### GameFlowController
Handles:
- title or hub to run transition
- run start
- death flow
- victory flow
- return to hub

### RunManager
Handles:
- current room index
- room pool and reward schedule
- elite and boss progression
- current run data

### RoomManager
Handles:
- spawn active room
- open and close doors
- completion checks
- room cleanup

### EncounterManager
Handles:
- enemy wave composition
- spawn timing
- room clear detection

### UpgradeManager
Handles:
- presenting reward choices
- applying mutations and relics
- tracking active build state

### MetaProgressionManager
Handles:
- currency gain
- permanent unlocks
- hub progression data

## Player Architecture
Recommended breakdown:

### PlayerRoot
Owns:
- references to movement, combat, health, animation, and VFX modules

### PlayerMotor
Owns:
- movement
- facing
- dash motion
- collision-aware locomotion

### PlayerCombat
Owns:
- combo input buffer
- heavy attack
- Core Pulse
- Overload activation

### PlayerStats
Owns:
- health
- attack modifiers
- defense modifiers
- current status multipliers

### PlayerBuildState
Owns:
- active Body mutations
- active Core mutations
- relics
- derived build tags

### PlayerPresentation
Owns:
- animation hooks
- material and glow changes
- crack light intensity
- Core emissive behavior

## Enemy Architecture
Recommended enemy prefab stack:

### EnemyRoot
Owns:
- shared health
- navigation
- state machine
- combat hooks

### EnemyBrain
Owns:
- idle
- chase
- attack choice
- recovery
- special behavior

### EnemyCombat
Owns:
- hitboxes
- cooldowns
- damage payloads

### EnemyPresentation
Owns:
- telegraph VFX
- hurt flash
- death effects

Use a light shared framework with per-enemy config data rather than building every enemy from scratch.

## Data Model Direction
Use ScriptableObjects for authoring data.

### CharacterData
- base health
- move speed
- combo timing
- dash values

### EnemyData
- health
- move speed
- attack list
- stagger resistance

### UpgradeData
- name
- category: Body, Core, Relic
- description
- icon
- rarity
- effect payload or effect reference

### RoomData
- room type
- encounter pool
- reward rules

### EncounterData
- enemy composition
- spawn pattern
- difficulty weight

### StatusEffectData
- effect type
- duration
- stacking rules

## Combat System Notes
Recommended flow:
- attack starts
- hitbox active window opens
- hit detection queries valid targets
- damage package is built
- target resolves damage, stagger, and status
- hit event fires for audio, VFX, and camera response

Avoid putting damage math directly inside animation scripts.

## Upgrade Application Strategy
Keep upgrades modular.

Suggested model:
- UpgradeData defines what the upgrade is
- UpgradeEffect component or processor applies its runtime modification
- PlayerBuildState stores active upgrades
- PlayerCombat or PlayerStats reads derived modifiers at action time

This prevents giant switch statements later.

## Save Data Scope
For MVP save:
- meta currency
- unlocked upgrades or relic pools
- player settings

Do not save in-progress runs in early prototype unless needed.

## Debug Tools
Must-have prototype debug features:
- spawn enemy buttons
- grant upgrade buttons
- toggle god mode
- fast restart run
- jump to boss room
- print current build state

These will save huge amounts of iteration time.

## MVP Technical Risks
- overengineering procedural generation too early
- building too many custom enemy frameworks
- coupling upgrade effects directly into one giant player script
- relying on animation events for all combat timing logic

## Recommended First Implementation Order
1. Bootstrap scene and PlayerRoot shell
2. Player movement and camera
3. Light combo, heavy, dash
4. Damage pipeline and one enemy
5. Core Pulse and Overload shell
6. Room flow and reward screen
7. Upgrade application framework
8. Elite enemy and boss flow

## Success Check
The architecture is good if:
- new upgrades can be added without touching five unrelated systems
- new enemies can reuse shared combat hooks
- room and encounter flow can be tuned mostly through data
- the prototype team can iterate on combat daily without fighting the codebase
