const express = require("express");
const subscriptionsService = require("../services/subscriptionsService");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const subscriptions = await subscriptionsService.getAllSubscriptions();
    return res.json(subscriptions);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const subscription = await subscriptionsService.getSubscriptionById(
      req.params.id
    );
    return res.json(subscription);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const result = await subscriptionsService.addSubscription(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/:id").put(async (req, res) => {
  try {
    const result = await subscriptionsService.updateSubscription(
      req.params.id,
      req.body
    );
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    const result = await subscriptionsService.deleteSubscription(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
