const User = require("../models/usersModel");

const DBUsersGetUsers = () => {
  return new Promise((resolve, reject) => {
    User.find((err, users) => (err ? reject(err) : resolve(users)));
  });
};

const DBUsersGetUserById = (userId) => {
  return new Promise((resolve, reject) => {
    User.findById(userId, (err, user) => (err ? reject(err) : resolve(user)));
  });
};

const DBUsersAddUser = (newUser) => {
  return new Promise((resolve, reject) => {
    const user = new User(newUser);
    user.save((err, obj) => (err ? reject(err) : resolve(obj)));
  });
};

const DBUsersUpdateUser = (userId, newUser) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(userId, newUser, (err, obj) =>
      err ? reject(err) : resolve(obj)
    );
  });
};

const DBUsersDeleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndRemove(userId, (err, obj) =>
      err ? reject(err) : resolve(obj)
    );
  });
};

module.exports = {
  DBUsersGetUsers,
  DBUsersGetUserById,
  DBUsersAddUser,
  DBUsersUpdateUser,
  DBUsersDeleteUser,
};
