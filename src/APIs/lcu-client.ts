import { LcuCredentials } from "./lcu-connector";
import WebSocket from "ws";
import {
  ChampionMasteryDTO,
  ChampionMinimalDTO,
  ChampSelectSession,
  ChampSelectSessionFunction,
  ChestEligibilityDTO,
  SummonerDTO,
} from "./lcu-types";

async function fetchRiot<T>(url: string, method = "GET", parseResponse = true) {
  const headers = new Headers();
  const buff = Buffer.from("riot:" + credentials.password);
  const authorization = "Basic " + buff.toString("base64");
  headers.append("Authorization", authorization);

  const requestOptions = {
    method: method,
    headers,
  };

  const resp = await fetch(`${credentials.full}${url}`, requestOptions);

  if (parseResponse) {
    const json: T = await resp.json();

    return json;
  }
}

let credentials: LcuCredentials = null;

export const SetCredentials = (cred: LcuCredentials) => {
  credentials = cred;
};

export const GetChestEligibility = async () => {
  return await fetchRiot<ChestEligibilityDTO>(
    "lol-collections/v1/inventories/chest-eligibility"
  );
};

export const GetCurrentSummoner = async () => {
  return await fetchRiot<SummonerDTO>("lol-summoner/v1/current-summoner");
};

export const GetChampionsMinimal = async () => {
  return await fetchRiot<ChampionMinimalDTO[]>(
    "lol-champions/v1/owned-champions-minimal"
  );
};

export const GetChampionMastery = async (summonerId: number) => {
  return await fetchRiot<ChampionMasteryDTO[]>(
    `lol-collections/v1/inventories/${summonerId}/champion-mastery`
  );
};

export const SwapWithChampion = async (championId: number) => {
  await fetchRiot(
    `lol-champ-select/v1/session/bench/swap/${championId}`,
    "POST",
    false
  );
};

export const OnChampSelect = async (callback: ChampSelectSessionFunction) => {
  const wsUrl = `wss://riot:${credentials.password}@127.0.0.1:${credentials.port}`;

  const websocket = new WebSocket(wsUrl);
  websocket.on("open", () => {
    websocket.send(JSON.stringify([5, "OnJsonApiEvent"]));
  });

  websocket.on("message", (raw) => {
    const json = raw.toString();

    if (json.trim().length === 0) {
      return;
    }

    const socketEvent = JSON.parse(json);

    const data = socketEvent[2];

    if (data.uri !== "/lol-champ-select/v1/session") {
      return;
    }

    const sessionData: ChampSelectSession = data.data;

    callback(sessionData);
  });
};
