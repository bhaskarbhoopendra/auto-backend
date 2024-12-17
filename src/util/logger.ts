import { createLogger, transports, format } from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const logger = createLogger({
  level: 'info',
  format: format.combine(format.colorize(), format.simple()),
  transports: [new transports.Console()],
});

if (process.env.NODE_ENV?.trim() !== 'production') {
  logger.level = 'info';
}

export default logger;
