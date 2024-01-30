import { DataTypes } from "sequelize";
import sequelize from "../app/_clients/sequelize";

const Education = sequelize.define(
  "Education",
  {
    educationId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    degree: {
      type: DataTypes.STRING,
    },
    major: {
      type: DataTypes.STRING,
    },
    school: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: false,
    },
    startDate: {
      type: DataTypes.STRING,
    },
    endDate: {
      type: DataTypes.STRING,
    },
    grade: {
      type: DataTypes.STRING,
    },
    resumeId: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: false,
    },
  },
  {
    tableName: "Education",
    timestamps: false,
  }
);

console.log(Education === sequelize.models.Education); // true
Education.findAll().then((educations) => {
  console.log(educations.every((education) => education instanceof Education)); // true
  console.log("Education's:", JSON.stringify(educations, null, 2));
});
