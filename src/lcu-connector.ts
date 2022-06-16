import fs from "fs";

export type LcuCredentials = {
  process: string;
  PID: number;
  port: number;
  password: string;
  protocol: string;
  address: string;
  full: string;
};

const GetLCUCredentials = (lockfilePath: string): LcuCredentials | null => {
  lockfilePath += "/lockfile";
  if (!fs.existsSync(lockfilePath)) {
    return null;
  }

  const parts = fs.readFileSync(lockfilePath, "utf8").split(":");

  const lcuObj: LcuCredentials = {
    process: parts[0],
    PID: Number(parts[1]),
    port: Number(parts[2]),
    password: parts[3],
    protocol: parts[4],
    address: "127.0.0.1",
    full: "",
  };

  lcuObj.full = `${lcuObj.protocol}://${lcuObj.address}:${lcuObj.port}/`;

  return lcuObj;
};

export default GetLCUCredentials;
