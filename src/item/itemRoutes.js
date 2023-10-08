const express = require("express");
const router = express.Router();
const {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} = require("./itemController");

router.route("/").get(getItems).post(addItem);
router.route("/category/:type").get(getItems);
router.route("/:id").get(getItems).put(updateItem).delete(deleteItem);

module.exports = router;
