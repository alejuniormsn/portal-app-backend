import { ModelStatic } from "sequelize";
import resp from "../shared/messages/resp";
import Gender from "../database/models/User/Gender";
import {
  CustomError,
  handleDatabaseError,
} from "../shared/error/handleDatabaseError";

export interface IGender {
  id?: number;
  name: number;
}

class GenderService {
  private model: ModelStatic<Gender> = Gender;

  async getAllGender() {
    const gender = await this.model.findAll({ order: [["name", "ASC"]] });
    if (!gender.length) {
      throw {
        status: 404,
        message: "gender not found",
      } as unknown as CustomError;
    }
    return resp(200, gender);
  }
  catch(error: any) {
    const erro = handleDatabaseError(error);
    throw resp(erro.status, erro.message);
  }
}

export default GenderService;
