const express = require("express");
const {
  jsonPermissionsAddUser,
  jsonPermissionsDeleteUser,
  jsonPermissionsGetUserById,
  jsonPermissionsGetUsers,
  jsonPermissionsUpdateUser,
} = require("../services/permissionsJsonService");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const users = await jsonPermissionsGetUsers();
    return res.json(users);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const user = await jsonPermissionsGetUserById(req.params.id);
    return res.json(user);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const result = await jsonPermissionsAddUser(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/:id").put(async (req, res) => {
  try {
    const result = await jsonPermissionsUpdateUser(req.params.id, req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    const result = await jsonPermissionsDeleteUser(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
