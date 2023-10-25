// logger
import log from "./libraries/winston.library";
log.info("starting up the project");

// env
import env from "./libraries/dotenv.library";
env.init();

// database
import Database from "./libraries/mongoose.library";
Database.init();

// web application
import ExpressApplication from "./bin/www";

ExpressApplication.initStandardMiddlewares();
ExpressApplication.initSecurityMiddlewares();
ExpressApplication.initMiddlewares();

ExpressApplication.initRoutes();

ExpressApplication.initErrorHandler();

ExpressApplication.startExpressApplication();