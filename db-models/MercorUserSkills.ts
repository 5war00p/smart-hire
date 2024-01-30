import { DataTypes, UUID } from "sequelize";
import sequelize from "../app/_clients/sequelize";

const MercorUserSkills = sequelize.define(
  "MercorUserSkills",
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    skillId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    isPrimary: {
      type: DataTypes.TINYINT({ length: 1 }),
      allowNull: false,
      defaultValue: 0,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "MercorUserSkills",
    timestamps: false,
  }
);

console.log(MercorUserSkills === sequelize.models.MercorUserSkills); // true
MercorUserSkills.findAll().then((skills) => {
  console.log(skills.every((skill) => skill instanceof MercorUserSkills)); // true
  console.log("All user skills:", JSON.stringify(skills, null, 2));
});
