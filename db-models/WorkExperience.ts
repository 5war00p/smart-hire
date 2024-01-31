import { DataTypes } from "sequelize";
import sequelize from "../app/_clients/sequelize";

const WorkExperience = sequelize.define(
  "WorkExperience",
  {
    workExperienceId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    company: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: false,
    },
    role: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.STRING,
    },
    endDate: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    locationCity: {
      type: DataTypes.STRING,
    },
    locationCountry: {
      type: DataTypes.STRING,
    },
    resumeId: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: false,
    },
  },
  {
    tableName: "WorkExperience",
    timestamps: false,
  }
);

export default WorkExperience;
