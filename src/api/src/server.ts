import { ApiServer } from "@miracledevs/paradigm-express-webapi";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./docs/swagger.json";
import { MySqlConnectionFilter } from "./filters/mysql.filter";
import { HealthController } from "./controllers/HealthController";
import { Configuration } from "./configuration/configuration";
import { CategoryController } from "./controllers/CategoryController";
import { ProfessionalUserController } from "./controllers/ProfessionalUserController";
import { AuthController } from "./controllers/AuthController";

/**
 * Represents the api server application.
 * It contains the main DI container, the router and express application.
 */
export class Server extends ApiServer {
    /**
     * Configures the server before starting.
     */
    protected configureApplication(): void {
        this.logger.debug("Configuring application...");
        const configuration = this.configurationBuilder.build(Configuration);
        const port = configuration.port || process.env.PORT || 5000;

        this.expressApplication
            .disable("etag")
            .set("port", port)
            .use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
            .use(cors({ exposedHeaders: "x-auth" }))
            .use(express.urlencoded({ extended: false }))
            .use(express.json())
            .listen(port, () => this.logger.debug(`Listening on: http://localhost:${port}`));

        this.registerControllers([HealthController, CategoryController, ProfessionalUserController, AuthController]);
        this.routing.ignoreClosedResponseOnFilters();
        this.routing.registerGlobalFilters([MySqlConnectionFilter]);
    }
}

