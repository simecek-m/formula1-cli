import * as winston from "winston";
const { format, createLogger, transports } = winston.default;
const { timestamp: timestamp, printf: printf } = format;

const logFormat = printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level}: ${message}`;
});

export default createLogger({
  level: "info",
  format: format.combine(
    format.colorize(),
    timestamp({ format: "HH:mm:ss" }),
    logFormat
  ),
  transports: [
    new transports.Console()
  ],
});