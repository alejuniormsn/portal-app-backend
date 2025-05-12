import { ModelStatic } from "sequelize";
import resp from "../shared/messages/resp";
import City from "../database/models/shared/City";
import {
  CustomError,
  handleDatabaseError,
} from "../shared/error/handleDatabaseError";

export interface ICity {
  id?: number;
  car: number;
  created_at: Date;
  updated_at?: Date;
}

class CityService {
  private model: ModelStatic<City> = City;

  async getAllCities() {
    try {
      const cities = await this.model.findAll({ order: [["name", "ASC"]] });
      if (!cities.length) {
        throw {
          status: 404,
          message: "Cities not found",
        } as unknown as CustomError;
      }
      return resp(200, cities);
    } catch (error: any) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getCity(id: number) {
    try {
      const city = await this.model.findOne({
        where: { id: id },
      });
      if (!city) {
        throw {
          status: 404,
          message: "City not found",
        } as unknown as CustomError;
      }
      return resp(200, city);
    } catch (error: any) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }
}

export default CityService;
