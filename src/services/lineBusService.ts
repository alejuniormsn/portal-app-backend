import { ModelStatic } from "sequelize";
import resp from "../shared/messages/resp";
import BusLine from "../database/models/vehicle/BusLine";
import {
  CustomError,
  handleDatabaseError,
} from "../shared/error/handleDatabaseError";

export interface ILineBus {
  id?: number;
  name: number;
  description?: string;
}

class LineBusService {
  private model: ModelStatic<BusLine> = BusLine;

  async getAllLineBus() {
    const lineBus = await this.model.findAll({ order: [["name", "ASC"]] });
    if (!lineBus.length) {
      throw {
        status: 404,
        message: "LineBus not found",
      } as unknown as CustomError;
    }
    return resp(200, lineBus);
  }
  catch(error: any) {
    const erro = handleDatabaseError(error);
    throw resp(erro.status, erro.message);
  }
}

export default LineBusService;
