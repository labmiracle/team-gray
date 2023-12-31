import { DependencyContainer, DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import { MySqlConnection } from "../core/mysql/mysql.connection";
import { EditRepositoryBase } from "../core/repositories/edit.repository";
import { IProfessionalUser } from "../models/users/ProfessionalUser.interface";
import { ProfessionalUser } from "../models/users/ProfessionalUser";

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class ProfessionalUserRepository extends EditRepositoryBase<IProfessionalUser, number> {
    constructor(dependencyContainer: DependencyContainer, connection: MySqlConnection) {
        super(dependencyContainer, connection, ProfessionalUser, "professional_user");
    }

    async getAllProfessionalUser(): Promise<IProfessionalUser[]> {
        const request = await this.find("state = ?", [true]);
        return request;
    }

    async getByCategory(category: number): Promise<IProfessionalUser[]> {
        const request = this.find("category_id = ? AND state = ?", [category, true]);
        return request;
    }

    async getByEmail(email: string): Promise<IProfessionalUser | undefined> {
        const validated = await this.find("email = ?", [email]);

        if (validated.length === 1) return validated[0];

        return undefined;
    }

    async getUserById(id: number): Promise<IProfessionalUser | undefined> {
        const validated = await this.find("id = ? AND state = ?", [id, true]);

        if (validated.length === 1) return validated[0];

        return undefined;
    }
}
