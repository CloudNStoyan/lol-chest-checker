import { LcuCredentials } from "./lcu-connector";

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

import WebSocket from "ws";

const LcuApi = (credentials: LcuCredentials | null) => {
  if (credentials === null) {
    return null;
  }

  const wsUrl = `wss://riot:${credentials.password}@127.0.0.1:${credentials.port}`;

  const websocket = new WebSocket(wsUrl);

  console.log(websocket);
  websocket.on("open", () => {
    websocket.send(JSON.stringify([5, "OnJsonApiEvent"]));
  });

  websocket.on("message", (data) => {
    console.log(data);
  });
  const buff = Buffer.from("riot:" + credentials.password);

  async function fetchRiot<T>(url: string) {
    const headers = new Headers();
    const authorization = "Basic " + buff.toString("base64");
    headers.append("Authorization", authorization);

    const requestOptions = {
      method: "GET",
      headers,
    };

    const resp = await fetch(`${credentials.full}${url}`, requestOptions);
    const json: T = await resp.json();

    return json;
  }

  const GetCurrentSummoner = async () => {
    return await fetchRiot<SummonerDTO>("lol-summoner/v1/current-summoner");
  };

  const GetChampionMastery = async (summonerId: number) => {
    return await fetchRiot<ChampionMasteryDTO[]>(
      `lol-collections/v1/inventories/${summonerId}/champion-mastery`
    );
  };

  const GetHextechChampions = async (summonerId: number) => {
    return await GetChampionMastery(summonerId);
  };

  const GetChampSelectSession = async () => {
    return await fetchRiot<object>("lol-champ-select/v1/session");
  };

  const OnChampSelect = (updaterFn) => {
    const checkIfInChampSelectIntervalId = setInterval(async () => {
      const session = await GetChampSelectSession();
      if (session.hasOwnProperty("errorCode")) {
        return;
      }

      const inChampSelectInterval = setInterval(async () => {
        const session = await GetChampSelectSession();
        if (session.hasOwnProperty("errorCode")) {
          clearInterval(inChampSelectInterval);
          return;
        }
        updaterFn(session);
      }, 100);
    }, 5000);
  };

  return {
    GetCurrentSummoner,
    GetChampionMastery,
    GetHextechChampions,
    GetChampSelectSession,
    OnChampSelect,
  };
};

export default LcuApi;
