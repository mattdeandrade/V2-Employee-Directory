const express = require("express");
const router = express.Router();
module.exports = router;

const employees = require("../data/employees");

router.get("/", (req, res) => {
  res.json(employees);
});
router.get("/random", (req, res, next) => {
  const id = Math.floor(Math.random() * employees.length);
  const employee = employees.find((e) => e.id === +id);
  if (employee) res.json(employees[id]);
  else next({ status: 404, message: `There is no employee with id ${id}.` });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    next({ status: 404, message: `There is no employee with id ${id}.` });
  }
});
router.post("/", (req, res, next) => {
  const text = req.body;
  let notUnique = false;
  for (let i = 0; i < employees.length; i++)
    if (employees[i].name === text.name) notUnique = true;

  if (!notUnique) {
    employees.push({ id: employees.length + 1, text });
    res.status(201).json(employees.at(-1));
  } else
    next({
      status: 400,
      message: `New employee cannot match an existing one.`,
    });
});
