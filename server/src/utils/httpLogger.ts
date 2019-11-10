import { logger } from './logger';

export class HttpLogger {
    write(text: string): void {
        logger.info(text);
    }
}
