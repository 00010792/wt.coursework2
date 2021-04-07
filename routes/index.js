const express = require("express");
const router = express.Router();

const { Database } = require("../middleware/handler");
const { Validator } = require("../middleware/validator");

const database = new Database();
const validator = new Validator();

database.useCollection("database.json");

/* GET users listing. */
router.get("/", (req, res) => {
  database.getAll(
    (data) => res.render("index", { todos: data }),
    () => res.render("index", { todos: null })
  );
});

router.get("/new", (req, res) => {
  res.render("new", {});
});

router.post("/new", (req, res) => {
  if (validator.isValid(req.body)) {
    database.saveOne(req.body, () => {
      res.render("new", { success: true });
    });
  } else {
    res.render("new", { error: true, success: false });
  }
});

router.get("/todo/:id/delete", (req, res) => {
  database.deleteOne(
    req.params.id,
    () => {
      res.redirect("/");
    },
    () => {
      res.sendStatus(500);
    }
  );
});

router.get("/todo/:id", (req, res) => {
  database.getOne(
    req.params.id,
    (data) => res.render("todo", { todo: data }),
    () => res.sendStatus(404)
  );
});

module.exports = router;
