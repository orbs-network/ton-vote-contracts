import { serve } from '.';
import { parseArgs } from './cli-args';
import * as Logger from './logger';

process.on('uncaughtException', function (err) {
  Logger.log('Uncaught exception on process, shutting down:');
  Logger.error(err.stack);
  process.exit(1);
});

try {
  Logger.log('Management service started.');
  const config = parseArgs(process.argv);

  Logger.log(`Input config: '${JSON.stringify(config)}'.`);
  const server = serve(config);

  process.on('SIGINT', function () {
    Logger.log('Received SIGINT, shutting down.');
    if (server) {
      server.close(function (err: any) {
        if (err) {
          Logger.error(err.stack || err.toString());
        }
        process.exit();
      });
    }
  });
} catch (err) {
  Logger.log('Exception thrown from main, shutting down:');
  Logger.error(err.stack);
  process.exit(128);
}
