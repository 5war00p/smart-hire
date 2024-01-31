import { DataTypes } from "sequelize";
import sequelize from "../app/_clients/sequelize";

const Skills = sequelize.define(
  "Skills",
  {
    skillId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    skillName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    skillValue: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "Skills",
    timestamps: false,
  }
);

export default Skills;
