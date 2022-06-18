import { LcuCredentials } from "./lcu-connector";

import WebSocket from "ws";
import {
  ChampionMasteryDTO,
  ChampSelectSession,
  ChampSelectSessionFunction,
  LcuApiCreator,
  SummonerDTO,
} from "./lcu-types";

const LcuApi: LcuApiCreator = (credentials: LcuCredentials | null) => {
  if (credentials === null) {
    return null;
  }

  const wsUrl = `wss://riot:${credentials.password}@127.0.0.1:${credentials.port}`;

  const websocket = new WebSocket(wsUrl);
  websocket.on("open", () => {
    websocket.send(JSON.stringify([5, "OnJsonApiEvent"]));
  });

  let champSelectSessionFunction: ChampSelectSessionFunction | undefined;

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

    if (champSelectSessionFunction) {
      champSelectSessionFunction(sessionData);
    }
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

  const SetChampSelectSessionCallback = (
    callback: ChampSelectSessionFunction
  ) => {
    champSelectSessionFunction = callback;
  };

  return {
    GetCurrentSummoner,
    GetChampionMastery,
    SetChampSelectSessionCallback,
  };
};

export default LcuApi;
