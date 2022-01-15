import { gql } from 'apollo-server';

const typeDefs = gql`
  "Entry point into the rest of the Schema, fetch all needed data from here, think multiple endpoints"
  type Query{
    "Query to get specific Hero Profile"
    heroProfile: {
      hero: Hero!
      latestActivities: [Activity]!
      latestBattles: [Battle]!
    }
  }

  "A Hero complete with currently equipped items"
  type Hero {
    id: ID!
    owner: String!
    userId: Number!
    createdAt: String!
    updatedAt: String!
    name: String!
    character: String!
    hasBeenUpgraded: Boolean!
    status: String!
    statusFade: Number!
    goToBattle: Boolean!
    power: Float!
    health: Float!
    maxHealth: Number!
    fire: Float!
    earth: Float!
    air: Float!
    water: Float!
    aether: Float!
    armor: Float!
    recovery: Number!
    qp: Number!
    activityXP: Number!
    battleXP: Number!
    photonTokens: Number!
    battleWins: Number!
    battleLosses: Number!
    battleDraws: Number!
    battleDkos: Number!
    qpPower: Number!
    qpHealth: Number!
    qpFire: Number!
    qpEarth: Number!
    qpAir: Number!
    qpWater: Number!
    qpAether: Number!
    qpArmor: Number!
    qpRecovery: Number!
  }

  "An Exercise Activity in which a user has completed"
  type Activity {
    id: ID!
    user: String!
    createdAt: String!
    updatedAt: String!
    activityDate: String!
    activityId: Number!
    type: String!
    source: String!
    duration: Number!
    distance: Number
    averageSpeed: Number
    maxSpeed: Number
    elevationGain: Number
  }

  "A Battle in which a Hero has been in"
  type Battle {
    id: ID!
    avatarId: Number!
    avatarName: String!
    owner: String!
    seenReport: Boolean!
    foeType: String!
    outcome: String!
    createdAt: String!
    updatedAt: String!
    aStatus: String!
    xpGain: Number!
    ptGain: Number
    scenario: Number!
    effects: [String!]
    effectProcs: [EffectProc!]
    postBattleActions: [String!]
    roundBreakdown: [RoundBreakdown!]
    avatar: BattleHero!
    foe: BattleFoe!
    BRA: BattleHero
    BRF: BattleFoe
  }

  "The resulting effect that happened during battle"
  type EffectProc {
    effect: String!
    heroStatsEffected: [String]
  }

  "Hero that gets queued for a battle, and BRA"
  type BattleHero{
    id: Int!
    owner: String!
    name: String!
    character: String!
    status: String!
    statusFade: Int!
    battleXP: Int!
    activityXP: Int!
    battleDkos: Int!
    battleDraws: Int!
    battleLosses: Int!
    battleWins: Int!
    equipped: [EquippedOnHero]!
    power: Float!
    health: Float!
    maxHealth: Int!
    earth: Float!
    armor: Float!
    aether: Float!
    air: Float!
    fire: Float!
    water: Float!
    photonTokens: Int!
    qp: Int!
  }

  "The Equipped item on a hero"
  type EquippedOnHero {
    id: Int!
    name: String!
    type: String!
    action: String!
    effects: [ItemEffect]!

  }

  "Effect of an item"
  type ItemEffect {
    description: String!
    name: String!
    type: String!
  }

  "The foeWithStats saved on goToBattle, and BRF"
  type BattleFoe {
    type: String!
    name: String!
    ability: FoeAbility!
    class: String!
    difficulty: Float!
    difficultyLevel: String!
    power: Float!
    health: Float!
    air: Float!
    armor: Float!
    earth: Float!
    fire: Float!
    water: Float!
    ptBounty: Int!
    xpBounty: Int!
  }

  "Ability of a foe"
  type FoeAbility {
    effect: String!
    name: String!
    type: String!
  }

  type RoundBreakdown {
    aggressor: String!
    aggressorHealthLeft: Int!
    defender: String!
    defenderHealthLeft: Int!
    elementalDamageDealt: ElementalDamageDealt!
    elementalProcs: ElementalProcs!
    elementalReduction: ElementalReduction!
    physicalDamageDealt: Int!
    physicalReduction: Int!
    turn: Int!
  }

  "Damage Dealt & Reduction in Battle Rounds"
  type ElementalDamageDealt {
    total: Int!
    air: Int
    earth: Int
    fire: Int
    water: Int
  }
  type ElementalReduction {
    total: Int!
    air: Int
    earth: Int
    fire: Int
    water: Int
  }

  "Elemental Procs in Battle Rounds"
  type ElementalProcs {
    air: Air!
    earth: Earth!
    fire: Fire!
    water: Water!
  }
  type Air {
    evaded: Boolean!
  }
  type Earth {
    thornsDamageToAttacker: Int!
    thornsFactor: Float!
  }
  type Fire {
    critChance: Float!
    critDamage: Int!
  }
  type Water {
    amountHealed: Int!
    healingFactor: Float!
  }


`;

export default typeDefs