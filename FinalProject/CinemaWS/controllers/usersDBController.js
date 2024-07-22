const express = require("express");
const {
  DBUsersAddUser,
  DBUsersDeleteUser,
  DBUsersGetUserById,
  DBUsersGetUsers,
  DBUsersUpdateUser,
} = require("../services/usersDBService");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const users = await DBUsersGetUsers();
    return res.json(users);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const user = await DBUsersGetUserById(req.params.id);
    return res.json(user);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const result = await DBUsersAddUser(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/:id").put(async (req, res) => {
  try {
    const result = await DBUsersUpdateUser(req.params.id, req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    const result = await DBUsersDeleteUser(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
