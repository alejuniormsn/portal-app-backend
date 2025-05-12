import { ModelStatic } from "sequelize";
import resp from "../shared/messages/resp";
import Vehicle from "../database/models/vehicle/Vehicle";
import {
  CustomError,
  handleDatabaseError,
} from "../shared/error/handleDatabaseError";

export interface IVehicle {
  id?: number;
  car: number;
  disabled?: boolean;
  created_at: Date;
  updated_at?: Date | null;
}

class VehicleService {
  private model: ModelStatic<Vehicle> = Vehicle;

  async getAllVehicles() {
    try {
      const vehicles = await this.model.findAll({ order: [["car", "ASC"]] });
      if (!vehicles.length) {
        throw {
          status: 404,
          message: "Vehicles not found",
        } as unknown as CustomError;
      }
      return resp(200, vehicles);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async getVehicle(id: number) {
    try {
      const vehicle = await this.model.findOne({
        where: { id: id },
      });
      if (!vehicle) {
        throw {
          status: 404,
          message: "Vehicle not found",
        } as unknown as CustomError;
      }
      return resp(200, vehicle);
    } catch (error) {
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async deleteVehicle(id: number) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const deletedCount = await this.model.destroy({
        where: { id },
        transaction: t,
      });
      if (deletedCount === 0) {
        throw resp(400, `Vehicle with ID ${id} not found`);
      }
      await t.commit();
      return resp(200, { success: "Vehicle successfully deleted" });
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async createVehicle(vehicles: IVehicle[]) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const vehicleList = vehicles.map((e) => ({
        car: e.car,
        created_at: e.created_at,
        disabled: e.disabled,
      }));
      const createdVehicles = await this.model.bulkCreate(vehicleList, {
        transaction: t,
      });
      await t.commit();
      return resp(201, createdVehicles);
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }

  async updateVehicle(id: number, vehicle: IVehicle) {
    if (!this.model.sequelize) {
      throw new Error("Sequelize error");
    }
    const t = await this.model.sequelize.transaction();
    try {
      const [affectedCount] = await this.model.update(
        { ...vehicle },
        { where: { id }, transaction: t }
      );
      if (affectedCount === 0) {
        throw resp(
          400,
          `Changes to Vehicle with ID ${id} not implemented, check the data`
        );
      }
      await t.commit();
      return resp(200, { success: "Vehicle successfully upgraded" });
    } catch (error: any) {
      await t.rollback();
      const erro = handleDatabaseError(error);
      throw resp(erro.status, erro.message);
    }
  }
}

export default VehicleService;
