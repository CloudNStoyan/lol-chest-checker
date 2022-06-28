import { useEffect, useState } from "react";
import {
  SummonerDTO,
  ChampionMasteryDTO,
  ChestEligibilityDTO,
} from "../APIs/lcu-types";
import GetLCUCredentials, { LcuCredentials } from "../APIs/lcu-connector";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setClientIsOpen } from "../store/configSlice";

export type LcuClient = {
  GetChestEligibility: () => Promise<ChestEligibilityDTO>;
  GetCurrentSummoner: () => Promise<SummonerDTO>;
  GetChampionMastery: (summonerId: number) => Promise<ChampionMasteryDTO[]>;
  SwapWithChampion: (cahmpionId: number) => void;
};

const useLcu = (): [LcuClient] => {
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.configReducer.config);
  const [credentials, setCredentials] = useState<LcuCredentials>();
  const [buff, setBuff] = useState<Buffer>();

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
    console.log("mny ass");
    return await fetchRiot<SummonerDTO>("lol-summoner/v1/current-summoner");
  };

  const GetChampionMastery = async (summonerId: number) => {
    return await fetchRiot<ChampionMasteryDTO[]>(
      `lol-collections/v1/inventories/${summonerId}/champion-mastery`
    );
  };

  const SwapWithChampion = async (championId: number) => {
    await fetchRiot(
      `lol-champ-select/v1/session/bench/swap/${championId}`,
      "POST",
      false
    );
  };

  const lcuClient: LcuClient = {
    GetChestEligibility,
    GetCurrentSummoner,
    GetChampionMastery,
    SwapWithChampion,
  };

  useEffect(() => {
    if (!credentials) {
      return;
    }

    setBuff(Buffer.from("riot:" + credentials.password));
    dispatch(setClientIsOpen(true));
  }, [credentials]);

  useEffect(() => {
    const cred = GetLCUCredentials(config.pathToLeagueOfLegends);
    if (!cred) {
      return;
    }

    setCredentials(cred);
  }, [config]);

  return [lcuClient];
};

export default useLcu;
