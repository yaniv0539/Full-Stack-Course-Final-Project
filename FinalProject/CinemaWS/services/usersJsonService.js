const jsonfile = require("jsonfile");

const file = "./Users.json";

const jsonUsersGetUsers = () => {
  return new Promise((resolve, reject) => {
    jsonfile.readFile(file, (err, users) => {
      if (err) reject(err);
      else resolve(users);
    });
  });
};

const jsonUsersGetUserById = (id) => {
  return new Promise((resolve, reject) => {
    jsonfile.readFile(file, (err, users) => {
      if (err) reject(err);
      else resolve(users.find((user) => user.id === id));
    });
  });
};

const jsonUsersAddUser = async (newUser) => {
  try {
    const users = await jsonUsersGetUsers();
    const newUsers = [...users, newUser];

    return new Promise((resolve, reject) => {
      jsonfile.writeFile(file, newUsers, (err) => {
        if (err) reject(err);
        else resolve("Added Successfully!");
      });
    });
  } catch (error) {
    console.log(
      "Please initialize 'Users.json' with empty array and restart the server"
    );
  }
};

const jsonUsersUpdateUser = async (id, newUser) => {
  const users = await jsonUsersGetUsers();
  const index = users.findIndex((user) => user.id === id);
  users[index] = newUser;
  return new Promise((resolve, reject) => {
    jsonfile.writeFile(file, users, (err) => {
      if (err) reject(err);
      else resolve("Updated Successfully!");
    });
  });
};

const jsonUsersDeleteUser = async (id) => {
  const users = await jsonUsersGetUsers();
  const index = users.findIndex((user) => user.id === id);
  users.splice(index, 1);
  return new Promise((resolve, reject) => {
    jsonfile.writeFile(file, users, (err) => {
      if (err) reject(err);
      else {
        resolve("Deleted Successfully!");
      }
    });
  });
};

module.exports = {
  jsonUsersAddUser,
  jsonUsersDeleteUser,
  jsonUsersGetUserById,
  jsonUsersGetUsers,
  jsonUsersUpdateUser,
};
