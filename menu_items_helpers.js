const db = require("./database/db-connector");

function getMenuItemData(res) {
  const search_query = "SELECT * FROM Menu_Items;";

  db.pool.query(search_query, function (err, results, fields) {
    if (!err) {
      res.render("menu_items", { data: results });
    } else {
      console.log(err);
    }
  });
}

function addMenuItemData(req, res) {
  const menuName = req.body.menu_name;
  const pricePerUnit = req.body.price_per_unit;
  const description = req.body.description;

  const insert = `INSERT INTO Menu_Items (menu_name, price_per_unit, description) VALUES ('${menuName}', '${pricePerUnit}','${description}')`;

  db.pool.query(insert, function (err, rows, fields) {
    if (!err) {
      res.redirect("/menu-items");
    } else {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  });
}

function editMenuItemData(req, res) {
  const menuName = req.body.menu_name;
  const pricePerUnit = req.body.price_per_unit;
  const description = req.body.description;

  const update = `UPDATE Menu_Items SET menu_name='${menuName}', price_per_unit='${pricePerUnit}', description='${description}' WHERE menu_id=${req.params.menuID}`;

  db.pool.query(update, function (err, rows, fields) {
    if (!err) {
      res.redirect("/menu-items");
    } else {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  });
}

function deleteMenuItemData(req, res) {
  const delete_menu_item = `DELETE FROM Menu_Items WHERE menu_id=${req.params.menuID}`;

  db.pool.query(delete_menu_item, function (err, rows, fields) {
    if (!err) {
      res.redirect("/menu-items");
    } else {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  });
}

module.exports = {
  getMenuItemData,
  addMenuItemData,
  editMenuItemData,
  deleteMenuItemData,
};
