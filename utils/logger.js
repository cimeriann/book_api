const winston = require("winston");

const { createLogger, format, transports, addColors } = winston;

const { combine, timestamp, colorize, printf } = format;

addColors({
  error: "bold red",
  warn: "bold yellow",
  info: "bold cyan",
  debug: "bold green",
});

const logFormat = printf(
  ({ timestamp, level, message }) => `${timestamp} ${level} ${message}`
);

const logger = createLogger({
    transports: [
        new transports.File({ filename: "log/error.log", level: 'error'}),
        new transports.File({ filename: "log/combined.log"}),
        new transports.Console({
            format: combine(logFormat, colorize({all: true})),
        }),
    ],
    format: combine(
        timestamp({
            format: "DD-MM-YYYY HH:mm:ss",
        }),
        logFormat,
        colorize({ all: true }),
    )
});

module.exports = logger;