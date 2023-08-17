const db = require("./database/db-connector");

function getContainerData(res) {
  const search_query = "SELECT * FROM Containers;";

  db.pool.query(search_query, function (err, results, fields) {
    if (!err) {
      res.render("containers", { data: results });
    } else {
      console.log(err);
    }
  });
}

function addContainerData(req, res) {
  const containerName = req.body.container_name;
  const pricePerUnit = req.body.price_per_unit;
  const qtyInStock = req.body.qty_in_stock;

  const insert = `INSERT INTO Containers (container_name, price_per_unit, qty_in_stock) VALUES ('${containerName}', '${pricePerUnit}','${qtyInStock}')`;

  db.pool.query(insert, function (err, rows, fields) {
    if (!err) {
      res.redirect("/containers");
    } else {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  });
}

function editContainerData(req, res) {
  const containerName = req.body.container_name;
  const pricePerUnit = req.body.price_per_unit;
  const qtyInStock = req.body.qty_in_stock;

  const update = `UPDATE Containers SET container_name='${containerName}', price_per_unit='${pricePerUnit}', qty_in_stock='${qtyInStock}' WHERE container_id=${req.params.containerID}`;

  db.pool.query(update, function (err, rows, fields) {
    if (!err) {
      res.redirect("/containers");
    } else {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  });
}

function deleteContainerData(req, res) {
  const delete_cont = `DELETE FROM Containers WHERE container_id=${req.params.containerID}`;

  db.pool.query(delete_cont, function (err, rows, fields) {
    if (!err) {
      res.redirect("/containers");
    } else {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  });
}

module.exports = {
  getContainerData,
  addContainerData,
  editContainerData,
  deleteContainerData,
};
