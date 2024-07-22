const { DBUsersAddUser, DBUsersGetUsers } = require("./usersDBService");
const { jsonUsersAddUser } = require("./usersJsonService");
const { jsonPermissionsAddUser } = require("./permissionsJsonService");

const applyFirstUser = async () => {
  const DBusers = await DBUsersGetUsers();
  if (DBusers[0] !== undefined) return;

  const adminToUsersDB = {
    Username: "Admin",
    Password: "Admin",
  };

  const adminFromUsersDB = await DBUsersAddUser(adminToUsersDB);

  const adminToUsersJson = {
    id: adminFromUsersDB._id,
    FirstName: "Admin",
    LastName: "Admin",
    CreatedDate: new Date(),
    SessionTimeOut: 200,
  };

  const adminToPermissionsJson = {
    id: adminFromUsersDB._id,
    Permissions: [
      "View Subscriptions",
      "Create Subscriptions",
      "Delete Subscriptions",
      "Update Subscriptions",
      "View Movies",
      "Create Movies",
      "Delete Movies",
      "Update Movies",
    ],
  };

  const jsonUsersResult = await jsonUsersAddUser(adminToUsersJson);
  const jsonPermissionsResult = await jsonPermissionsAddUser(
    adminToPermissionsJson
  );

  console.log(jsonUsersResult);
  console.log(jsonPermissionsResult);
};

module.exports = applyFirstUser;
