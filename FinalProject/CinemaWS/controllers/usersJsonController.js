const express = require("express");
const {
  jsonUsersAddUser,
  jsonUsersDeleteUser,
  jsonUsersGetUserById,
  jsonUsersGetUsers,
  jsonUsersUpdateUser,
} = require("../services/usersJsonService");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const users = await jsonUsersGetUsers();
    return res.json(users);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const user = await jsonUsersGetUserById(req.params.id);
    return res.json(user);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const result = await jsonUsersAddUser(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/:id").put(async (req, res) => {
  try {
    const result = await jsonUsersUpdateUser(req.params.id, req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    const result = await jsonUsersDeleteUser(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
