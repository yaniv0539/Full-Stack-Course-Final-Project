const Subscription = require("../models/subscriptionsModel");

const getAllSubscriptions = () => {
  return new Promise((resolve, reject) => {
    Subscription.find((err, subscriptions) =>
      err ? reject(err) : resolve(subscriptions)
    );
  });
};

const getSubscriptionById = (subscriptionId) => {
  return new Promise((resolve, reject) => {
    Subscription.findById(subscriptionId, (err, subscription) =>
      err ? reject(err) : resolve(subscription)
    );
  });
};

const addSubscription = (newSubscription) => {
  return new Promise((resolve, reject) => {
    const subscription = new Subscription(newSubscription);
    subscription.save((err) =>
      err ? reject(err) : resolve("Added Successfully!")
    );
  });
};

const updateSubscription = (subscriptionId, newSubscription) => {
  return new Promise((resolve, reject) => {
    Subscription.findByIdAndUpdate(subscriptionId, newSubscription, (err) =>
      err ? reject(err) : resolve("Updated Successfully!")
    );
  });
};

const deleteSubscription = (subscriptionId) => {
  return new Promise((resolve, reject) => {
    Subscription.findByIdAndRemove(subscriptionId, (err) =>
      err ? reject(err) : resolve("Deleted Successfully!")
    );
  });
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscription,
};
