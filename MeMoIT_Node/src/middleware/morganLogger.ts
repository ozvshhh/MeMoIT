import morgan from "morgan";
import fs from "fs";
import path from "path";

const logStream = fs.createWriteStream(path.join("logs","access.log"),{flags:"a"})

export const requestLogger = morgan("combined", {stream: logStream});
export const consoleLogger = morgan("dev");
