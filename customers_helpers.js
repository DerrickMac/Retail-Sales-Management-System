const db = require("./database/db-connector");

function handleRedirectCustomer(action, res) {
  if (action == 2) {
    const showMessage = "dupe";
    res.redirect("/customers/" + showMessage);
  } else {
    const showMessage = "success";
    res.redirect("/customers/" + showMessage);
  }
}

function getCustomerData(res, message) {
  const get_query = "SELECT * FROM Customers;";
  let alert = message;
  if (alert === "dupe") {
    alert =
      "Cannot add or edit customer because phone number already exists in the system.";
    console.log(alert);
  }

  db.pool.query(get_query, function (err, results, fields) {
    if (!err) {
      res.render("customers", { data: results, showAlert: alert });
    } else {
      console.log(err);
      res.status(500).send("Error retrieving customer data");
    }
  });
}

function addCustomerData(req, res) {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const rewardPointTotal = 0;
  const totalSale = 0;
  const phoneNumber = req.body.phone_number;
  let action = 0;

  // Check for an existing customer with the same phone number
  const check_existing_phone_number = `SELECT * FROM Customers WHERE phone_number='${phoneNumber}'`;

  db.pool.query(check_existing_phone_number, function (err, rows, fields) {
    if (!err) {
      if (rows.length > 0) {
        action = 2;
        console.log("FOUND EXISTING PHONE NUMBER THAT MATCHES INPUTTED NUMBER");
        handleRedirectCustomer(action, res);
      } else {
        console.log("DID NOT FIND EXISTING PHONE NUMBER");
        const insert = `INSERT INTO Customers (first_name, last_name, reward_point_total, total_sale, phone_number) VALUES ('${firstName}', '${lastName}', ${rewardPointTotal}, ${totalSale}, '${phoneNumber}')`;
        db.pool.query(insert, function (err, result) {
          if (!err) {
            handleRedirectCustomer(action, res);
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

function editCustomerData(req, res) {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const phoneNumber = req.body.phone_number;
  let action = 0;

  // Check for an existing customer with the same phone number
  const check_existing_phone_number = `SELECT * FROM Customers WHERE phone_number='${phoneNumber}'`;

  db.pool.query(check_existing_phone_number, function (err, rows, fields) {
    if (!err) {
      if (rows.length > 0) {
        action = 2;
        console.log("FOUND EXISTING PHONE NUMBER THAT MATCHES INPUTTED NUMBER");
        handleRedirectCustomer(action, res);
      } else {
        console.log("DID NOT FIND EXISTING PHONE NUMBER");
        const update = `UPDATE Customers SET first_name='${firstName}', last_name='${lastName}', phone_number='${phoneNumber}' WHERE customer_id=${req.params.customerID}`;

        db.pool.query(update, function (err, result) {
          if (!err) {
            handleRedirectCustomer(action, res);
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

function deleteCustomerData(req, res) {
  const delete_cust = `DELETE FROM Customers WHERE customer_id=${req.params.customerID}`;

  db.pool.query(delete_cust, function (err, rows, fields) {
    if (!err) {
      res.redirect("/customers/success");
    } else {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  });
}

module.exports = {
  getCustomerData,
  addCustomerData,
  editCustomerData,
  handleRedirectCustomer,
  deleteCustomerData,
};
