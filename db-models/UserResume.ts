import { DataTypes } from "sequelize";
import sequelize from "../app/_clients/sequelize";

const UserResume = sequelize.define(
  "UserResume",
  {
    resumeId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "platform",
    },
    ocrText: {
      type: DataTypes.TEXT,
    },
    ocrEmail: {
      type: DataTypes.STRING,
    },
    ocrGithubUsername: {
      type: DataTypes.STRING,
    },
    resumeBasedQuestions: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.STRING,
      unique: true,
    },
    isInvitedToInterview: {
      type: DataTypes.TINYINT({ length: 1 }),
      defaultValue: 0,
    },
    reminderTasksIds: {
      type: DataTypes.JSON,
    },
  },
  {
    tableName: "UserResume",
  }
);

export default UserResume;
