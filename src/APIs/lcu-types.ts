export type SummonerDTO = {
  accountId: number;
  displayName: string;
  internalName: string;
  nameChangeFlag: boolean;
  percentCompleteForNextLevel: number;
  privacy: string;
  profileIconId: number;
  puuid: string;
  rerollPoints: {
    currentPoints: number;
    maxRolls: number;
    numberOfRolls: number;
    pointsCostToRoll: number;
    pointsToReroll: number;
  };
  summonerId: number;
  summonerLevel: number;
  unnamed: boolean;
  xpSinceLastLevel: number;
  xpUntilNextLevel: number;
};

export type ChestEligibilityDTO = {
  earnableChests: number;
  maximumChests: number;
  nextChestRechargeTime: number;
};

export type ChampionMasteryDTO = {
  championId: number;
  championLevel: number;
  championPoints: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
  chestGranted: boolean;
  formattedChampionPoints: string;
  formattedMasteryGoal: string;
  highestGrade: string;
  lastPlayTime: number;
  playerId: number;
  tokensEarned: number;
};

export interface ChampSelectSessionActionActor {
  actorCellId: number;
  championId: number;
  completed: boolean;
  id: number;
  isAllyAction: boolean;
  isInProgress: boolean;
  pickTurn: number;
  type: string;
}

export interface ChampSelectSessionBans {
  myTeamBans: number[];
  numBans: number;
  theirTeamBans: number[];
}

export interface ChampSelectSessionChatDetails {
  chatRoomName: string;
  chatRoomPassword: string;
}

export interface ChampSelectSessionEntitledFeatureState {
  additionalRerolls: number;
  unlockedSkinIds: number[];
}

export interface ChampSelectSessionMyTeam {
  assignedPosition: string;
  cellId: number;
  championId: number;
  championPickIntent: number;
  entitledFeatureType: string;
  selectedSkinId: number;
  spell1Id: number;
  spell2Id: number;
  summonerId: number;
  team: number;
  wardSkinId: number;
}

export interface ChampSelectSessionTheirTeam {
  assignedPosition: string;
  cellId: number;
  championId: number;
  championPickIntent: number;
  entitledFeatureType: string;
  selectedSkinId: number;
  spell1Id: number;
  spell2Id: number;
  summonerId: number;
  team: number;
  wardSkinId: number;
}

export interface ChampSelectSessionTimer {
  adjustedTimeLeftInPhase: number;
  internalNowInEpochMs: number;
  isInfinite: boolean;
  phase: string;
  totalTimeInPhase: number;
}

export interface ChampSelectSessionTrade {
  cellId: number;
  id: number;
  state: string;
}

export interface BenchChampData {
  championId: number;
  priority: boolean;
}

export interface ChampSelectSession {
  actions: ChampSelectSessionActionActor[][];
  allowBattleBoost: boolean;
  allowDuplicatePicks: boolean;
  allowLockedEvents: boolean;
  allowRerolling: boolean;
  allowSkinSelection: boolean;
  bans: ChampSelectSessionBans;
  benchChampions: BenchChampData[];
  benchEnabled: boolean;
  boostableSkinCount: number;
  chatDetails: ChampSelectSessionChatDetails;
  counter: number;
  entitledFeatureState: ChampSelectSessionEntitledFeatureState;
  gameId: number;
  hasSimultaneousBans: boolean;
  hasSimultaneousPicks: boolean;
  isCustomGame: boolean;
  isSpectating: boolean;
  localPlayerCellId: number;
  lockedEventIndex: number;
  myTeam: ChampSelectSessionMyTeam[];
  recoveryCounter: number;
  rerollsRemaining: number;
  skipChampionSelect: boolean;
  theirTeam: ChampSelectSessionTheirTeam[];
  timer: ChampSelectSessionTimer;
  trades: ChampSelectSessionTrade[];
}

export type ChampSelectSessionFunction = (data: ChampSelectSession) => void;

export interface ChampionMinimalDTORental {
  endDate: number;
  purchaseDate: number;
  rented: boolean;
  winCountRemaining: number;
}

export interface ChampionMinimalDTOOwnership {
  freeToPlayReward: boolean;
  owned: boolean;
  rental: ChampionMinimalDTORental;
}

export interface ChampionMinimalDTO {
  active: boolean;
  alias: string;
  banVoPath: string;
  baseLoadScreenPath: string;
  baseSplashPath: string;
  botEnabled: boolean;
  chooseVoPath: string;
  disabledQueues: string[];
  freeToPlay: boolean;
  id: number;
  name: string;
  ownership: ChampionMinimalDTOOwnership;
  purchased: number;
  rankedPlayEnabled: boolean;
  roles: string[];
  squarePortraitPath: string;
  stingerSfxPath: string;
  title: string;
}

export type LcuApi = {
  GetChestEligibility: () => Promise<ChestEligibilityDTO>;
  GetCurrentSummoner: () => Promise<SummonerDTO>;
  GetChampionMastery: (summonerId: number) => Promise<ChampionMasteryDTO[]>;
  SetChampSelectSessionCallback: (callback: ChampSelectSessionFunction) => void;
  SwapWithChampion: (cahmpionId: number) => void;
};

export type LcuApiCreator = (pathToLeagueOfLegends: string) => LcuApi;
