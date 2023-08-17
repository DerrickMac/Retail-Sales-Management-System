const db = require("./database/db-connector");

function getOrderData(req, res, ID, message) {
  let order_query = "";
  let suborder_query_2 = "";
  let alert = message;
  if (alert === "dupe") {
    alert =
      "Cannot make requested changes to suborder because another suborder contains matching contents.";
    console.log(alert);
  }

  if (ID === -1) {
    order_query = `
        SELECT Orders.*, COUNT(Suborders.suborder_item_id) AS suborder_count
        FROM Orders
        LEFT JOIN Suborders ON Orders.order_id = Suborders.order_id
        GROUP BY Orders.order_id;
      `;
    suborder_query_2 = `
      SELECT Suborders.suborder_item_id, Menu_Items.menu_name, Flavors.flavor_name, Flavors.flavor_id, Containers.container_name, Containers.container_id, Menu_Items.menu_id, Suborders.quantity_ordered, Suborders.subtotal, Orders.order_id, Containers.price_per_unit AS cont_price, Menu_Items.price_per_unit AS menu_price, Menu_Items.menu_name AS menu_name
      FROM Suborders
      JOIN Menu_Items ON Suborders.menu_id = Menu_Items.menu_id
      JOIN Flavors ON Suborders.flavor_id = Flavors.flavor_id
      LEFT JOIN Containers ON Suborders.container_id = Containers.container_id
      JOIN Orders ON Suborders.order_id = Orders.order_id
      ORDER BY Orders.order_id, Suborders.suborder_item_id ASC;
      `;
  } else {
    order_query = `
        SELECT Orders.*, COUNT(Suborders.suborder_item_id) AS suborder_count
        FROM Orders
        LEFT JOIN Suborders ON Orders.order_id = Suborders.order_id
        WHERE Orders.order_id=${ID}
        GROUP BY Orders.order_id;
      `;

    suborder_query_2 = `
      SELECT Suborders.suborder_item_id, Menu_Items.menu_name, Flavors.flavor_name, Flavors.flavor_id, Containers.container_name, Containers.container_id, Menu_Items.menu_id, Suborders.quantity_ordered, Suborders.subtotal, Orders.order_id, Containers.price_per_unit AS cont_price, Menu_Items.price_per_unit AS menu_price, Menu_Items.menu_name AS menu_name
      FROM Suborders
      JOIN Menu_Items ON Suborders.menu_id = Menu_Items.menu_id
      JOIN Flavors ON Suborders.flavor_id = Flavors.flavor_id
      LEFT JOIN Containers ON Suborders.container_id = Containers.container_id
      JOIN Orders ON Suborders.order_id = Orders.order_id
      WHERE Orders.order_id=${ID}
      ORDER BY Orders.order_id, Suborders.suborder_item_id ASC;
      `;
  }

  const customer_query = "SELECT * FROM Customers;";

  const menu_query = "SELECT * FROM Menu_Items;";

  const flavor_query = "SELECT * FROM Flavors;";

  const container_query = "SELECT * FROM Containers;";

  db.pool.query(order_query, function (err, order_results, fields) {
    if (!err) {
      db.pool.query(suborder_query_2, function (err, sub_results, fields) {
        if (!err) {
          db.pool.query(menu_query, function (err, menu_results, fields) {
            if (!err) {
              db.pool.query(
                flavor_query,
                function (err, flavor_results, fields) {
                  if (!err) {
                    db.pool.query(
                      container_query,
                      function (err, container_results, fields) {
                        if (!err) {
                          db.pool.query(
                            customer_query,
                            function (err, customer_results, fields) {
                              if (!err) {
                                res.render("orders", {
                                  data: order_results,
                                  suborder_data: sub_results,
                                  menu_data: menu_results,
                                  flavor_data: flavor_results,
                                  container_data: container_results,
                                  customer_data: customer_results,
                                  showAlert: alert,
                                });
                              } else {
                                console.log(err);
                              }
                            }
                          );
                        } else {
                          console.log(err);
                        }
                      }
                    );
                  } else {
                    console.log(err);
                  }
                }
              );
            } else {
              console.log(err);
            }
          });
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
}

function addOrderData(req, res) {
  const customerID = req.body.customer_id;
  const timeOfSale = req.body.time_of_sale;
  const orderSubtotal = 0;
  const orderTax = 0;
  const orderTotal = 0;
  const pointsAwarded = 0;

  const insert = `INSERT INTO Orders (customer_id, time_of_sale, order_subtotal, order_tax, order_total, points_awarded)  VALUES ('${customerID}', '${timeOfSale}','${orderSubtotal}', '${orderTax}', '${orderTotal}','${pointsAwarded}')`;

  db.pool.query(insert, function (err, rows, fields) {
    if (!err) {
      var lastInsertId = rows.insertId;
      res.redirect("/orders/" + lastInsertId + "/" + "success");
    } else {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  });
}

function editOrderData(req, res) {
  let customerID = null;
  if (req.body.customer_id !== "") {
    customerID = `'${req.body.customer_id}'`;
  }

  const update = `UPDATE Orders SET customer_id=${customerID} WHERE order_id=${req.params.orderID}`;

  db.pool.query(update, function (err, rows, fields) {
    if (!err) {
      res.redirect("/orders");
    } else {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  });
}

function deleteOrderData(req, res) {
  const delete_order = `DELETE FROM Orders WHERE order_id=${req.params.orderID}`;

  db.pool.query(delete_order, function (err, rows, fields) {
    if (!err) {
      res.redirect("/orders");
    } else {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  });
}

module.exports = {
  getOrderData,
  addOrderData,
  editOrderData,
  deleteOrderData,
};
