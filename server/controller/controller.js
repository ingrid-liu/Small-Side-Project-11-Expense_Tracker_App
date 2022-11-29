const model = require("../models/model");

// POST: http://localhost:8080/api/categories
async function create_Categories(req, res) {
  const Create = new model.Categories({
    type: "Savings",
    color: "#1F385C", // dark
  });

  // save the above info in MongoDB

  await Create.save(function (err) {
    if (!err) return res.json(Create);
    return res
      .status(400)
      .json({ message: `Error while createing categories ${err}` });
  });
}

// GET: http://localhost:8080/api/categories
async function get_Categories(req, res) {
  let data = await model.Categories.find({}); // inside find function, pass {} object -> return all the objects from the Categories collection

  // filter the collection
  let filter = await data.map((item) =>
    Object.assign({}, { type: item.type, color: item.color })
  );

  return res.json(filter);
}

// POST: http://localhost:8080/api/transaction
async function create_Transaction(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not rovided");
  let { name, type, amount } = req.body;

  const create = await new model.Transaction({
    name,
    type,
    date: new Date(),
    amount,
  });

  create.save(function (err) {
    if (!err) return res.json(create);
    return res
      .status(400)
      .json({ message: `Error while creating transaction ${err}` });
  });
}

// GET: http://localhost:8080/api/transaction
async function get_Transaction(req, res) {
  let data = await model.Transaction.find({});
  return res.json(data);
}

// DELETE: http://localhost:8080/api/transaction
async function delete_Transaction(req, res) {
  if (!req.body) res.status(400).json({ message: "Request body not Found" });

  await model.Transaction.deleteOne(req.body, function (err) {
    if (!err) res.json("Record Deleted...");
  })
    .clone()
    .catch(function (err) {
      res.json("Error while deleting Trasaction Record");
    });
}

module.exports = {
  create_Categories,
  get_Categories,
  create_Transaction,
  get_Transaction,
  delete_Transaction,
};