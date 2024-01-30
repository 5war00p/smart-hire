import { DataTypes, UUID } from "sequelize";
import sequelize from "../app/_clients/sequelize";

const MercorUsers = sequelize.define(
  "MercorUsers",
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    residence: {
      type: DataTypes.JSON,
    },
    profilePic: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    referralCode: {
      type: DataTypes.STRING,
      unique: true,
      defaultValue: new UUID(),
    },
    isGptEnabled: {
      type: new DataTypes.TINYINT({ length: 1 }),
      unique: true,
      defaultValue: 0,
    },
    preferredRole: {
      type: DataTypes.STRING,
    },
    fullTimeStatus: {
      type: DataTypes.STRING,
    },
    workAvailability: {
      type: DataTypes.STRING,
    },
    fullTimeSalaryCurrency: {
      type: DataTypes.STRING,
    },
    fullTimeSalary: {
      type: DataTypes.STRING,
    },
    partTimeSalaryCurrency: {
      type: DataTypes.STRING,
    },
    partTimeSalary: {
      type: DataTypes.STRING,
    },
    fullTime: {
      type: new DataTypes.TINYINT({ length: 1 }),
      allowNull: false,
      defaultValue: 0,
    },
    fullTimeAvailability: {
      type: new DataTypes.INTEGER(),
    },
    partTime: {
      type: new DataTypes.TINYINT({ length: 1 }),
      allowNull: false,
      defaultValue: 0,
    },
    partTimeAvailability: {
      type: new DataTypes.INTEGER(),
    },
    w8BenUrl: {
      type: DataTypes.JSON,
    },
    tosUrl: {
      type: DataTypes.TEXT,
    },
    policyUrls: {
      type: DataTypes.JSON,
    },
    isPreVetted: {
      type: DataTypes.TINYINT({ length: 1 }),
      allowNull: false,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.TINYINT({ length: 1 }),
      allowNull: false,
      defaultValue: 0,
    },
    isComplete: {
      type: DataTypes.TINYINT({ length: 1 }),
      allowNull: false,
      defaultValue: 0,
    },
    summary: {
      type: DataTypes.TEXT,
    },
    prevettedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "MercorUsers",
    timestamps: false,
  }
);

console.log(MercorUsers === sequelize.models.MercorUsers); // true
MercorUsers.findAll().then((users) => {
  console.log(users.every((user) => user instanceof MercorUsers)); // true
  console.log("All users:", JSON.stringify(users, null, 2));
});
