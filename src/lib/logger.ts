const DEBUG = true;

class Logger {
  log(message: any) {
    if (DEBUG) console.log(message)
  }

  error(message: any) {
    console.error(message)
  }

  debug(message: any) {
    if (DEBUG) console.debug(message)
  }

  setDebug(value: boolean) {
    (DEBUG as any) = value;
  }

  getDebug(): boolean {
    return DEBUG;
  }
}

const logger = new Logger()

export default logger
