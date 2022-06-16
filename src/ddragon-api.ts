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

const DDragonApi = () => {
  async function GenericFetch<T>(url: string) {
    const resp = await fetch(url);
    const json: T = await resp.json();

    return json;
  }

  const GetVersions = async () => {
    return await GenericFetch<string[]>(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );
  };

  const GetChampionData = async (version: string) => {
    return await GenericFetch<ChampionsDataDTO>(
      `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
    );
  };

  const GetChampionDataByKey = async (championKey: number) => {
    const latestVersion = (await GetVersions())[0];
    const championsJson = await GetChampionData(latestVersion);
    const champs = Object.values(championsJson.data);
    return champs.find((c) => c.key === championKey.toString());
  };

  return { GetVersions, GetChampionData, GetChampionDataByKey };
};

export default DDragonApi;
