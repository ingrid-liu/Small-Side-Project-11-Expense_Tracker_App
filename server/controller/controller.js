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
  let { name, type, amount, userEmail } = req.body;

  const create = await new model.Transaction({
    name,
    type,
    date: new Date(),
    amount,
    userEmail,
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
  console.log("from controller, get_Transaction:", data);
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

// GET: http://localhost:8080/api/labels
async function get_Labels(req, res) {
  model.Transaction.aggregate([
    // console.log("!! from controller get_Labels "),     // TODO 1 - 好像不行哎
    {
      $lookup: {
        from: "categories",
        localField: "type",
        foreignField: "type",
        as: "categories_info",
      },
    },
    {
      $unwind: "$categories_info",
    },
  ])
    .then((result) => {
      let data = result.map((v) =>
        Object.assign(
          {},
          {
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            userEmail: v.userEmail,
            color: v.categories_info["color"], // TODO 3. this color calling method
          }
        )
      );
      res.json(data); // TODO 2 . If I change result into data, there is no error hint
    })
    .catch((error) => {
      res.status(400).json("Lookup Collection Error");
    });
}

// GET: http://localhost:8080/api/users
async function get_User(req, res) {
  model.User.findOne({ userEmail: req.body.userEmail }, function (err, user) {
    if (user == null || !user.validPassword(req.body.password)) {
      res.json({ userEmail: "" });
    } else {
      res.json({ userEmail: req.body.userEmail });
    }
  });
}

// POST: http://localhost:8080/api/users
async function create_User(req, res) {
  console.log(req);
  if (req.body.userEmail == undefined || req.body.password == undefined) {
    return res.status(400).json({ message: `Error while creating user` });
  }
  let data = await model.User.findOne({ userEmail: req.body.userEmail });
  if (data != null) {
    res.json({ userEmail: "" });
  } else {
    var new_user = new model.User({
      userEmail: req.body.userEmail,
    });
    new_user.password = new_user.generateHash(req.body.password);
    new_user.save(function (err) {
      if (!err) return res.json({ userEmail: req.body.userEmail });
      return res
        .status(400)
        .json({ message: `Error while creating user ${err}` });
    });
  }
}

module.exports = {
  create_Categories,
  get_Categories,
  create_Transaction,
  get_Transaction,
  delete_Transaction,
  get_Labels,
  get_User,
  create_User,
};
