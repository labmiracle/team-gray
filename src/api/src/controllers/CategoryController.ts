import { Action, ApiController, Controller } from "@miracledevs/paradigm-express-webapi";
import { ICategory } from "../models/categories/Category.interface";
import { GET, POST, Path, Security } from "typescript-rest";
import { Response, Tags } from "typescript-rest-swagger";
import { AdminFilter } from "../filters/Admin.filter";
import { AdminService } from "../service/Admin.service";
import { CategoryService } from "../service/Category.service";

@Path("/api/categories")
@Controller({ route: "/api/categories" })
export class CategoryController extends ApiController {
    constructor(private readonly service: AdminService, private readonly categoryService: CategoryService) {
        super();
    }

    /**
     * * This endpoint returns all categories added by an administrator.
     * @returns
     */

    @GET
    @Tags("Categories")
    @Path("/")
    @Response<ICategory[]>(200, "Success")
    @Response<string>(404, "There are not categories")
    @Response<string>(500, "Server error")
    @Action({ route: "/" })
    async get(): Promise<ICategory[]> {
        const response = await this.categoryService.getAllCategories();

        if (!response) this.httpContext.response.status(404).send("There are not categories");

        return response;
    }

    /**
     *
     * @param category
     *  * This endpoint is implemented to add categories by an authenticated administrator. 
        For now, for testing purposes, you can generate the token in jwt.io by passing the jwt.secret from 
        the .env file in the signature.

     *  Example:
     *   
            "name": "Cerrajero"

     * @returns
     */

    @POST
    @Security("x-auth")
    @Tags("Admin")
    @Path("/")
    @Response<string>(201, "Created category")
    @Response<string>(400, "Bad request")
    @Response<string>(409, "The category is already exists")
    @Response<string>(500, "Server error")
    @Action({ route: "/", fromBody: true, filters: [AdminFilter] })
    async post(category: ICategory) {
        const response = await this.service.addCategory(category);

        if (response.error) {
            this.httpContext.response.status(response.code).send(response.message);
            return;
        } else {
            this.httpContext.response.status(response.code).send(response.message);
            return;
        }
    }
}
