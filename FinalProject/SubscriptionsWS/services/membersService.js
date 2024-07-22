const Member = require("../models/membersModel");

const getAllMembers = () => {
  return new Promise((resolve, reject) => {
    Member.find((err, members) => (err ? reject(err) : resolve(members)));
  });
};

const getMemberById = (memberId) => {
  return new Promise((resolve, reject) => {
    Member.findById(memberId, (err, member) =>
      err ? reject(err) : resolve(member)
    );
  });
};

const addMember = (newMember) => {
  return new Promise((resolve, reject) => {
    const member = new Member(newMember);
    member.save((err) => (err ? reject(err) : resolve("Added Successfully!")));
  });
};

const addManyMembersAtOnce = (newMembers) => {
  return new Promise((resolve, reject) => {
    Member.insertMany(newMembers, (err) =>
      err ? reject(err) : resolve("Added Successfully!")
    );
  });
};

const updateMember = (memberId, newMember) => {
  return new Promise((resolve, reject) => {
    Member.findByIdAndUpdate(memberId, newMember, (err) =>
      err ? reject(err) : resolve("Updated Successfully!")
    );
  });
};

const deleteMember = (memberId) => {
  return new Promise((resolve, reject) => {
    Member.findByIdAndRemove(memberId, (err) =>
      err ? reject(err) : resolve("Deleted Successfully!")
    );
  });
};

module.exports = {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
  addManyMembersAtOnce,
};
