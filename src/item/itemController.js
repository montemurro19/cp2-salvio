const asyncHandler = require("express-async-handler");

const Item = require("./itemModel");

const getItems = asyncHandler(async (req, res) => {
  let items;

  if (req.params.type) {
    items = await Item.find({ type: req.params.type });
  } else if (req.params.id) {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error("Item not found");
    }
    items = [item];
  } else {
    items = await Item.find();
  }
  res.status(200).json(items);
});

const addItem = asyncHandler(async (req, res) => {
  const { name, description, price, type } = req.body;

  if (!name || !description || !price || !type) {
    res.status(400);
    throw new Error("add all required fields");
  }
  const item = await Item.create({
    name: name,
    description: description,
    price: price,
    type: type,
  });
  res.status(200).json(item);
});

const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }

  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedItem);
});

const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }

  await item.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getItems,
  addItem,
  updateItem,
  deleteItem,
};
