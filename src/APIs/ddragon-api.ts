import { ChampionsDataDTO } from "./ddragon-types";

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

  const GetLatestVersion = async () => (await GetVersions())[0];

  return {
    GetLatestVersion,
    GetVersions,
    GetChampionData,
    GetChampionDataByKey,
  };
};

export default DDragonApi;
