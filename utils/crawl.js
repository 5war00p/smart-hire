const {
  Education,
  MercorUserSkills,
  MercorUsers,
  PersonalInformation,
  Skills,
  UserResume,
  WorkExperience,
} = require("../db-models");

const _ = require("lodash");

const getUserSkills = async () => {
  Skills.hasMany(MercorUserSkills, { foreignKey: "skillId" });
  MercorUserSkills.belongsTo(Skills, {
    foreignKey: "skillId",
  });

  const userSkills = await MercorUserSkills.findAll({
    raw: true,
    attributes: ["userId"],
    include: [{ model: Skills, attributes: ["skillName"] }],
  });

  return Object.values(_.groupBy(userSkills, "userId")).map((skills) => ({
    userId: skills[0].userId,
    skills: skills.map((s) => s["Skill.skillName"]),
  }));
};

const getEducation = async () => {
  const educations = await Education.findAll({
    raw: true,
  });

  return educations;
};

const getPersonalInformation = async () => {
  const infos = await PersonalInformation.findAll({
    raw: true,
  });

  return infos;
};

const getWorkExperiences = async () => {
  const works = await WorkExperience.findAll({
    raw: true,
  });

  return works;
};

const getResumes = async () => {
  const resumes = await UserResume.findAll({
    raw: true,
  });

  return resumes;
};

const getUsers = async () => {
  const users = await MercorUsers.findAll({
    raw: true,
  });

  return users;
};

const prepareUsers = async () => {
  const educations = await getEducation();
  const personalInfos = await getPersonalInformation();
  const workExperiences = await getWorkExperiences();
  const userResumes = await getResumes();
  const skills = await getUserSkills();
  const users = await getUsers();

  const usersWithSkills = _.values(
    _.merge(_.keyBy(users, "userId"), _.keyBy(skills, "userId"))
  );

  const resumes = _.values(
    _.merge(
      _.keyBy(educations, "resumeId"),
      _.keyBy(personalInfos, "resumeId"),
      _.keyBy(workExperiences, "resumeId"),
      _.keyBy(userResumes, "resumeId")
    )
  );

  const usersData = _.values(
    _.merge(_.keyBy(resumes, "userId"), _.keyBy(usersWithSkills, "userId"))
  ).map((each) => {
    delete each["educationId"];
    delete each["resumeId"];
    delete each["userId"];
    delete each["personalInformationId"];
    delete each["workExperienceId"];

    delete each["ocrText"];
    delete each["ocrEmail"];
    delete each["resumeBasedQuestions"];
    delete each["isInvitedToInterview"];
    delete each["reminderTasksIds"];
    delete each["isGptEnabled"];
    delete each["createdAt"];
    delete each["updatedAt"];
    delete each["lastLogin"];
    delete each["w8BenUrl"];
    delete each["tosUrl"];
    delete each["policyUrls"];
    delete each["isPreVetted"];
    delete each["isActive"];
    delete each["isComplete"];
    delete each["summary"];
    delete each["prevettedAt"];
    delete each["url"];
    delete each["profilePic"];
    delete each["notes"];
    delete each["residence"];
    delete each["source"];
    delete each["filename"];
    delete each["fullTimeSalaryCurrency"];
    delete each["partTimeSalaryCurrency"];

    return each;
  });

  return usersData;
};
