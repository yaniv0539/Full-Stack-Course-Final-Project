const jsonfile = require("jsonfile");

const file = "./Permissions.json";

const jsonPermissionsGetUsers = () => {
  return new Promise((resolve, reject) => {
    jsonfile.readFile(file, (err, users) => {
      if (err) reject(err);
      else resolve(users);
    });
  });
};

const jsonPermissionsGetUserById = (id) => {
  return new Promise((resolve, reject) => {
    jsonfile.readFile(file, (err, users) => {
      if (err) reject(err);
      else resolve(users.find((user) => user.id === id));
    });
  });
};

const jsonPermissionsAddUser = async (newUser) => {
  try {
    const users = await jsonPermissionsGetUsers();
    const newUsers = [...users, newUser];

    return new Promise((resolve, reject) => {
      jsonfile.writeFile(file, newUsers, (err) => {
        if (err) reject(err);
        else resolve("Added Successfully!");
      });
    });
  } catch (error) {
    console.log(
      "Please initialize 'Permissions.json' with empty array and restart the server"
    );
  }
};

const jsonPermissionsUpdateUser = async (id, newUser) => {
  const users = await jsonPermissionsGetUsers();
  const index = users.findIndex((user) => user.id === id);
  users[index] = newUser;
  return new Promise((resolve, reject) => {
    jsonfile.writeFile(file, users, (err) => {
      if (err) reject(err);
      else resolve("Updated Successfully!");
    });
  });
};

const jsonPermissionsDeleteUser = async (id) => {
  const users = await jsonPermissionsGetUsers();
  const index = users.findIndex((user) => user.id === id);
  users.splice(index, 1);
  return new Promise((resolve, reject) => {
    jsonfile.writeFile(file, users, (err) => {
      if (err) reject(err);
      else resolve("Deleted Successfully!");
    });
  });
};

module.exports = {
  jsonPermissionsAddUser,
  jsonPermissionsDeleteUser,
  jsonPermissionsGetUserById,
  jsonPermissionsGetUsers,
  jsonPermissionsUpdateUser,
};
