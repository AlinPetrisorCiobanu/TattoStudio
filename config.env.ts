import dotenv from "dotenv"
dotenv.config()
const CONFIDENCE  = {
    URLDB: process.env.DDBB_URL!,
    USERDB: process.env.DDBB_USER!,
    PASSWORDDB: process.env.DDBB_PASSWORD!,
    LOOPDB: process.env.BCRYTP_LOOP,
    SECRETDB: process.env.JWT_SECRET,
    PORTDB: process.env.JWT_PORT,
  };
  
  export = CONFIDENCE;