const express = require("express");
const router = express.Router();
const { Create } = require("./controller");

router.get("/categories", (req, res) => {
  const data = [
    {
      _id: 1,
      name: "Category 1 Seminar",
    },
    {
      _id: 2,
      name: "Category 2 Mern",
    },
  ];

  res.status(200).json({
    message: "Success get all categories",
    data,
  });
});

router.post("/categories", Create);

module.exports = router;
