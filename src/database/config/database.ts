import { Dialect } from "sequelize";

const dbConfig = {
  dialect: "postgres" as Dialect,
  host: "192.168.0.26",
  username: "portaldbett",
  password: "Ett@2024",
  database: "portaldbett",
  logging: false,
  define: {
    timestamps: false,
    underscored: false,
  },
};
export default dbConfig;

// # Banco de Dados Ubuntu-Server
// host: "192.168.0.26",
// #
// # Banco de Dados Local (Docker)
// host: "127.0.0.1",
