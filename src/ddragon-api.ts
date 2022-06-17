import { ChampionMasteryDTO } from "./lcu-api";

export interface ChampionsDataDTO {
  type: string;
  format: string;
  version: string;
  data: { [name: string]: ChampionDTO };
}

export interface Info {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

export interface Image {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Stats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
}

export interface ChampionDTO {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: Info;
  image: Image;
  tags: string[];
  partype: string;
  stats: Stats;
}

export type ChampionMasteryDTOWithData = ChampionMasteryDTO & {
  championData?: ChampionDTO;
};

const DDragonApi = () => {
  let ChampionDataCache: ChampionsDataDTO | undefined = undefined;
  let VersionDataCache: string[] | undefined;

  async function GenericFetch<T>(url: string) {
    const resp = await fetch(url);
    const json: T = await resp.json();

    return json;
  }

  const GetVersions = async () => {
    if (VersionDataCache) {
      return VersionDataCache;
    }

    const data = await GenericFetch<string[]>(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );

    VersionDataCache = data;

    return data;
  };

  const GetChampionData = async (version: string) => {
    if (ChampionDataCache) {
      return ChampionDataCache;
    }

    const data = await GenericFetch<ChampionsDataDTO>(
      `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
    );

    ChampionDataCache = data;

    return data;
  };

  const GetChampionDataByKey = async (championKey: number) => {
    const latestVersion = (await GetVersions())[0];
    const championsJson = await GetChampionData(latestVersion);
    const champs = Object.values(championsJson.data);
    return champs.find((c) => c.key === championKey.toString());
  };

  const PopulateChampData = async (data: ChampionMasteryDTOWithData[]) => {
    const latestVersion = (await GetVersions())[0];
    const championsJson = await GetChampionData(latestVersion);
    const champs = Object.values(championsJson.data);

    data.forEach((x) => {
      x.championData = champs.find((y) => y.key === x.championId.toString());
    });

    return data;
  };

  const GetLatestVersion = async () => (await GetVersions())[0];

  return {
    GetLatestVersion,
    GetVersions,
    GetChampionData,
    GetChampionDataByKey,
    PopulateChampData,
  };
};

export default DDragonApi;
