import { DataTypes, UUID } from "sequelize";
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

console.log(Skills === sequelize.models.Skills); // true
Skills.findAll().then((skills) => {
  console.log(skills.every((skill) => skill instanceof Skills)); // true
  console.log("All skills:", JSON.stringify(skills, null, 2));
});
