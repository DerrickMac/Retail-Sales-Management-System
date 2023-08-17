var express = require("express");
var app = express();
const methodOverride = require("method-override");
var bodyParser = require("body-parser");
PORT = 52990;

const {
  getCustomerData,
  addCustomerData,
  editCustomerData,
  deleteCustomerData,
} = require("./customers_helpers");
const {
  getMenuItemData,
  addMenuItemData,
  editMenuItemData,
  deleteMenuItemData,
} = require("./menu_items_helpers");
const {
  getFlavorData,
  addFlavorData,
  editFlavorData,
  deleteFlavorData,
} = require("./flavors_helpers");
const {
  getContainerData,
  addContainerData,
  editContainerData,
  deleteContainerData,
} = require("./containers_helpers");
const {
  getOrderData,
  addOrderData,
  editOrderData,
  deleteOrderData,
} = require("./orders_helpers");
const {
  addSuborderData,
  editSuborderData,
  deleteSuborderData,
} = require("./suborders_helpers");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

///////////////////// HOME PAGE ///////////////////////////
app.get("/", function (req, res) {
  res.render("index");
});

///////////////////// CUSTOMERS ///////////////////////////

// SELECT ALL CUSTOMERS -- Purpose of showMessage is to alert user of duplicate phone numbers
app.get("/customers/:showMessage", function (req, res) {
  const showMessage = req.params.showMessage;
  getCustomerData(res, showMessage);
});

// INSERT INTO
app.post("/customers", function (req, res) {
  addCustomerData(req, res);
});

// EDIT SPECIFIC CUSTOMER
app.patch("/customers/:customerID", function (req, res) {
  editCustomerData(req, res);
});

// DELETE SPECIFIC CUSTOMER
app.delete("/customers/:customerID", function (req, res) {
  deleteCustomerData(req, res);
});

///////////////////// MENU ITEMS ///////////////////////////

// SELECT ALL MENU ITEMS
app.get("/menu-items", function (req, res) {
  getMenuItemData(res);
});

// INSERT INTO
app.post("/menu-items", function (req, res) {
  addMenuItemData(req, res);
});

// EDIT SPECIFIC MENU ITEM
app.patch("/menu-items/:menuID", function (req, res) {
  editMenuItemData(req, res);
});

// DELETE SPECIFIC MENU ITEM
app.delete("/menu-items/:menuID", function (req, res) {
  deleteMenuItemData(req, res);
});

///////////////////// FLAVORS ///////////////////////////

// SELECT ALL FLAVORS
app.get("/flavors", function (req, res) {
  getFlavorData(res);
});

// INSERT INTO
app.post("/flavors", function (req, res) {
  addFlavorData(req, res);
});

// EDIT SPECIFIC FLAVOR
app.patch("/flavors/:flavorID", function (req, res) {
  editFlavorData(req, res);
});

// DELETE SPECIFIC FLAVOR
app.delete("/flavors/:flavorID", function (req, res) {
  deleteFlavorData(req, res);
});

///////////////////// CONTAINERS ///////////////////////////

// SELECT ALL CONTAINERS
app.get("/containers", function (req, res) {
  getContainerData(res);
});

// INSERT INTO
app.post("/containers", function (req, res) {
  addContainerData(req, res);
});

// EDIT SPECIFIC CONTAINER
app.patch("/containers/:containerID", function (req, res) {
  editContainerData(req, res);
});

// DELETE SPECIFIC CONTAINER
app.delete("/containers/:containerID", function (req, res) {
  deleteContainerData(req, res);
});

///////////////////// ORDERS /////////////////////////////

// SELECT SPECIFIC ORDER AND SUBORDERS -- Purpose of showMessage is to alert user of duplicate entries.
app.get("/orders/:orderID/:showMessage", function (req, res) {
  const getOrderID = req.params.orderID;
  const showMessage = req.params.showMessage;
  getOrderData(req, res, getOrderID, showMessage);
});

// SELECT ALL ORDERS AND SUBORDERS
app.get("/orders", function (req, res) {
  getOrderData(req, res, -1);
});

// INSERT INTO
app.post("/orders", function (req, res) {
  addOrderData(req, res);
});

// EDIT SPECIFIC ORDER
app.patch("/orders/:orderID", function (req, res) {
  editOrderData(req, res);
});

// DELETE SPECIFIC ORDER
app.delete("/orders/:orderID", function (req, res) {
  deleteOrderData(req, res);
});

//////////////////////// SUBORDERS //////////////////////////////////

// INSERT INTO
app.post("/suborders", function (req, res) {
  addSuborderData(req, res);
});

// EDIT SPECIFIC SUBORDER
app.patch("/suborders/:suborderID", function (req, res) {
  editSuborderData(req, res);
});

// DELETE SPECIFIC SUBORDER
app.delete("/suborders/:orderID/:suborderID", function (req, res) {
  deleteSuborderData(req, res);
});

// Start the server
let port = process.env.PORT;
if (port == null || port == "") {
  port = 52990;
}
app.listen(port, function () {
  console.log("Server started successfully");
});
