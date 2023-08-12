import { Action, ApiController, Controller } from "@miracledevs/paradigm-express-webapi";
import { ProfessionalUser } from "../models/users/ProfessionalUser";
import { AuthService } from "../service/AuthUser.service";
import { POST, Path } from "typescript-rest";
import { Response, Tags } from "typescript-rest-swagger";
import path from "path";

@Path("/api/auth")
@Tags("AuthUser")
@Controller({ route: "/api/auth" })
export class AuthController extends ApiController {
    constructor(private service: AuthService) {
        super();
    }

    @POST
    @Path("/signup")
    @Response<string>(201, "Professional User created")
    @Response<string>(400, "Bad request")
    @Response<string>(500, "Error server")
    @Action({ route: "/signup", fromBody: true })
    async post(professionalUser: ProfessionalUser): Promise<any> {
        console.log(professionalUser);
        try {
            const insert = await this.service.register(professionalUser);

            if (insert) {
                this.httpContext.response.status(201);
            }
        } catch (error) {
            console.log(error);
        }
    }
}
