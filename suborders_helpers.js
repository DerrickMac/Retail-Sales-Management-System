const db = require("./database/db-connector");

function addSuborderData(req, res) {
  const orderID = req.body.order_id;
  const menuID = JSON.parse(req.body.menu_id)[0];
  const flavorID = req.body.flavor_id;

  let containerID = null;
  if (typeof req.body.container_id !== "undefined") {
    containerID = `'${JSON.parse(req.body.container_id)[0]}'`;
  }

  const quantityOrdered = req.body.quantity_ordered;
  const subtotal = req.body.subtotal;
  let action = req.body.action;

  console.log(`FOR ADD SUBORDER: Action is: ${action} for orderID: ${orderID}`);
  // Check for an existing suborder with the same menu_id, container_id, and flavor_id
  const check_existing_suborder = `SELECT * FROM Suborders WHERE order_id='${orderID}' AND menu_id='${menuID}' AND flavor_id='${flavorID}' AND (container_id=${containerID} OR (container_id IS NULL AND ${containerID} IS NULL))`;

  db.pool.query(check_existing_suborder, function (err, rows, fields) {
    if (!err) {
      if (rows.length > 0) {
        console.log(
          "FOUND EXISTING SUBORDER THAT MATCHES INPUTTED ADD SUBORDER"
        );
        // Update the existing suborder's quantity and subtotal
        const existingSuborderID = rows[0].suborder_item_id;
        const newQuantity =
          parseInt(rows[0].quantity_ordered) + parseInt(quantityOrdered);
        const newSubtotal = parseInt(rows[0].subtotal) + parseInt(subtotal);
        const update_existing_suborder = `UPDATE Suborders SET quantity_ordered=${newQuantity}, subtotal=${newSubtotal} WHERE suborder_item_id=${existingSuborderID}`;

        db.pool.query(update_existing_suborder, function (err, rows, fields) {
          if (!err) {
            handleRedirect(action, orderID, res);
          } else {
            console.log(err);
            res.status(500).send("Internal server error");
          }
        });
      } else {
        console.log(
          "DID NOT FIND EXISTING SUBORDER THAT MATCHES INPUTTED ADD SUBORDER"
        );
        // Insert a new suborder
        const insert_suborder = `INSERT INTO Suborders (order_id, menu_id, flavor_id, container_id, quantity_ordered, subtotal)  VALUES ('${orderID}', '${menuID}','${flavorID}', ${containerID}, '${quantityOrdered}','${subtotal}')`;

        db.pool.query(insert_suborder, function (err, rows, fields) {
          if (!err) {
            handleRedirect(action, orderID, res);
          } else {
            console.log(err);
            res.status(500).send("Internal server error");
          }
        });
      }
    } else {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  });
}

function editSuborderData(req, res) {
  const orderID = req.body.order_id;
  const menuID = JSON.parse(req.body.menu_id)[0];
  const flavorID = req.body.flavor_id;

  let containerID = null;
  if (typeof req.body.container_id !== "undefined") {
    containerID = `'${JSON.parse(req.body.container_id)[0]}'`;
  }

  const quantityOrdered = req.body.quantity_ordered;
  const subtotal = req.body.subtotal;
  let action = req.body.action;

  // Check for an existing suborder with the same menu_id, container_id, and flavor_id
  const check_existing_suborder = `SELECT * FROM Suborders WHERE order_id='${orderID}' AND menu_id='${menuID}' AND flavor_id='${flavorID}' AND (container_id=${containerID} OR (container_id IS NULL AND ${containerID} IS NULL))`;

  db.pool.query(check_existing_suborder, function (err, rows, fields) {
    if (!err) {
      if (
        rows.length > 0 &&
        rows[0].suborder_item_id != req.params.suborderID
      ) {
        // if the existing suborder is not current suborder,
        action = -1;
        handleRedirect(action, orderID, res);
      } else {
        // Update the current suborder
        const update_suborder = `UPDATE Suborders SET order_id=${orderID}, menu_id='${menuID}', flavor_id='${flavorID}', container_id=${containerID}, quantity_ordered='${quantityOrdered}', subtotal='${subtotal}' WHERE order_id=${orderID} AND suborder_item_id=${req.params.suborderID}`;

        db.pool.query(update_suborder, function (err, rows, fields) {
          if (!err) {
            handleRedirect(action, orderID, res);
          } else {
            console.log(err);
            res.status(500).send("Internal server error");
          }
        });
      }
    } else {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  });
}

function handleRedirect(action, orderID, res) {
  console.log(`Action is: ${action} for orderID: ${orderID}`);
  if (action == 1) {
    const showMessage = "success";
    res.redirect("/orders/" + orderID + "/" + showMessage);
  } else if (action == -1) {
    const showMessage = "dupe";
    res.redirect("/orders/" + orderID + "/" + showMessage);
  } else {
    res.redirect("/orders");
  }
}

function deleteSuborderData(req, res) {
  const orderID = req.params.orderID;
  const delete_suborder = `DELETE FROM Suborders WHERE order_id=${orderID} AND suborder_item_id=${req.params.suborderID}`;
  let action = req.body.action;

  db.pool.query(delete_suborder, function (err, rows, fields) {
    if (!err) {
      if (action == 1) {
        res.redirect("/orders/" + orderID + "/" + "success");
      } else {
        res.redirect("/orders");
      }
    } else {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  });
}

module.exports = {
  addSuborderData,
  editSuborderData,
  deleteSuborderData,
};
