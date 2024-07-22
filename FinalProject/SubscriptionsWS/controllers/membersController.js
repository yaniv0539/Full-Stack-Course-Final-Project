const express = require("express");
const membersService = require("../services/membersService");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const members = await membersService.getAllMembers();
    return res.json(members);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const member = await membersService.getMemberById(req.params.id);
    return res.json(member);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const result = await membersService.addMember(req.body);

    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/:id").put(async (req, res) => {
  try {
    const result = await membersService.updateMember(req.params.id, req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    const result = await membersService.deleteMember(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
