# Seismic Golem - Enemy Roster V1

## Roster Goal
This roster supports the MVP vertical slice. Enemies are designed to test positioning, timing, and commitment without overwhelming production scope. Each enemy should pressure a different part of Seismic Golem's combat loop.

## Encounter Design Rules
- Enemies must be readable from an isometric camera.
- Their silhouettes should stay distinct from the player golem.
- Attack telegraphs must be clear before damage tuning gets fancy.
- Each enemy should encourage one specific player response.
- Swarm pressure should come from composition, not chaos.

## Standard Enemy 1 - Shard Mite
Role:
- fast swarm unit
- pressure and distraction

Visual direction:
- small crystal-infested crawler
- sharp silhouette, low health, quick twitch movement

Behavior:
- circles briefly, then lunges
- attacks in small groups
- retreats slightly after a failed lunge

Player test:
- spacing
- combo control
- Core Pulse timing

Weakness:
- dies quickly to radial damage and combo finisher shockwaves

Design note:
- this enemy teaches the player that area control matters

## Standard Enemy 2 - Tunnel Brute
Role:
- melee bruiser
- front-line threat

Visual direction:
- heavy stone miner creature or corrupted guardian
- broad shoulders, clear attack windups

Behavior:
- slowly approaches the player
- uses short combo swings and a charged slam
- resistant to light stagger

Player test:
- heavy attack timing
- dash discipline
- commitment windows

Weakness:
- vulnerable after big slam recovery

Design note:
- this enemy teaches that not every target should be mashed down with light attacks

## Standard Enemy 3 - Vein Caster
Role:
- ranged pressure
- positioning disruptor

Visual direction:
- thin mineral growth creature or floating shard priest
- glowing crystal hands or core node

Behavior:
- keeps distance
- fires crystal bolts in bursts
- channels a line or cone attack if ignored too long

Player test:
- target priority
- approach timing
- dash usage

Weakness:
- weak at close range
- easily interrupted by direct pressure

Design note:
- this enemy prevents passive corner play and forces action

## Standard Enemy 4 - Toxic Burrower
Role:
- ambush and area denial

Visual direction:
- low tunneling creature with ore sacs or toxic crystal veins

Behavior:
- disappears underground
- erupts under or near the player
- leaves a temporary hazard pool

Player test:
- movement reading
- repositioning
- not standing still after attacking

Weakness:
- exposed briefly after surfacing

Design note:
- this enemy punishes static play and overcommitment

## Elite Enemy - Obsidian Sentinel
Role:
- elite guard
- room anchor threat

Visual direction:
- tall obsidian-armored construct
- shielded front profile
- glowing cracks around joints

Behavior:
- advances slowly
- blocks frontal light attacks
- retaliates with shield bash, stomp, or ground fracture
- may protect nearby weaker enemies by body placement

Player test:
- flanking
- heavy attack use
- Core Pulse timing to create openings

Weakness:
- back and side vulnerability
- punishable after shield slam

Design note:
- this is the first enemy that should feel like a mini event inside a room

## Encounter Compositions
### Early Rooms
- 3-5 Shard Mites
- 1 Tunnel Brute + 2 Shard Mites
- 2 Vein Casters + 2 Shard Mites

### Mid Rooms
- 1 Tunnel Brute + 1 Vein Caster + 3 Shard Mites
- 2 Tunnel Brutes + 1 Toxic Burrower
- 1 Vein Caster + 2 Toxic Burrowers + 2 Shard Mites

### Elite Rooms
- 1 Obsidian Sentinel + 2 Vein Casters
- 1 Obsidian Sentinel + 1 Tunnel Brute + 3 Shard Mites

## Status Interactions
### Magma Path
- excels at clearing Shard Mites
- strong against grouped mid-size enemies
- hazard overlap creates room control

### Energy Path
- excels at chain damage between spread targets
- punishes caster-heavy rooms
- better burst on clustered backlines

## Production Order
1. Shard Mite
2. Tunnel Brute
3. Vein Caster
4. Obsidian Sentinel
5. Toxic Burrower

Reason:
- this order gives immediate combat coverage with minimum implementation risk

## MVP Success Check
The enemy roster is working if:
- the player changes attack timing based on enemy type
- elite rooms feel dangerous without feeling unfair
- Magma and Energy runs each feel advantaged in different room compositions
