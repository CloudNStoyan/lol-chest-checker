import GetLCUCredentials from "./lcu-connector";
import WebSocket from "ws";
import {
  ChampionMasteryDTO,
  ChampSelectSession,
  ChampSelectSessionFunction,
  ChestEligibilityDTO,
  ConnectedLcuApi,
  LcuApiCreator,
  NotConnectedLcuApi,
  SummonerDTO,
} from "./lcu-types";

const LcuApi: LcuApiCreator = (pathToLeagueOfLegends: string) => {
  const credentials = GetLCUCredentials(pathToLeagueOfLegends);

  if (credentials === null) {
    const notConnectedLcuApi: NotConnectedLcuApi = { clientIsNotOpen: true };
    return notConnectedLcuApi;
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

  async function fetchRiot<T>(
    url: string,
    method = "GET",
    parseResponse = true
  ) {
    const headers = new Headers();
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

  const GetChestEligibility = async () => {
    return await fetchRiot<ChestEligibilityDTO>(
      "lol-collections/v1/inventories/chest-eligibility"
    );
  };

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

  const SwapWithChampion = async (championId: number) => {
    await fetchRiot(
      `lol-champ-select/v1/session/bench/swap/${championId}`,
      "POST",
      false
    );
  };

  const connectedLcuApi: ConnectedLcuApi = {
    GetChestEligibility,
    GetCurrentSummoner,
    GetChampionMastery,
    SetChampSelectSessionCallback,
    SwapWithChampion,
    clientIsNotOpen: false,
  };

  return connectedLcuApi;
};

export default LcuApi;
