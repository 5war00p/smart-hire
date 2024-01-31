import { DataTypes } from "sequelize";
import sequelize from "../app/_clients/sequelize";

const PersonalInformation = sequelize.define(
  "PersonalInformation",
  {
    personalInformationId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.JSON,
    },
    email: {
      type: DataTypes.JSON,
    },
    phone: {
      type: DataTypes.JSON,
    },
    resumeId: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: false,
    },
  },
  {
    tableName: "PersonalInformation",
    timestamps: false,
  }
);

export default PersonalInformation;
