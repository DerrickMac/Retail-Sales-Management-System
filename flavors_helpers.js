const db = require("./database/db-connector");

//// Helper functions ////

function getFlavorData(res) {
  const search_query = "SELECT * FROM Flavors;";

  db.pool.query(search_query, function (err, results, fields) {
    if (!err) {
      res.render("flavors", { data: results });
    } else {
      console.log(err);
      res.status(500).send("Error retrieving flavors data");
    }
  });
}

function addFlavorData(req, res) {
  const flavorName = req.body.flavor_name;
  const qtyInStock = req.body.qty_in_stock;

  const insert = `INSERT INTO Flavors (flavor_name, qty_in_stock) VALUES ('${flavorName}', '${qtyInStock}')`;

  db.pool.query(insert, function (err, rows, fields) {
    if (!err) {
      res.redirect("/flavors");
    } else {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  });
}

function editFlavorData(req, res) {
  const flavorName = req.body.flavor_name;
  const qtyInStock = req.body.qty_in_stock;

  const update = `UPDATE Flavors SET flavor_name='${flavorName}', qty_in_stock='${qtyInStock}' WHERE flavor_id=${req.params.flavorID}`;

  db.pool.query(update, function (err, rows, fields) {
    if (!err) {
      res.redirect("/flavors");
    } else {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  });
}

function deleteFlavorData(req, res) {
  const delete_flav = `DELETE FROM Flavors WHERE flavor_id=${req.params.flavorID}`;

  db.pool.query(delete_flav, function (err, rows, fields) {
    if (!err) {
      res.redirect("/flavors");
    } else {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  });
}

module.exports = {
  getFlavorData,
  addFlavorData,
  editFlavorData,
  deleteFlavorData,
};
