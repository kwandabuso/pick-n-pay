const { v4: uuidv4 } = require("uuid");

const orders = {};

const validTransitions = {
  CREATED: ["RESERVED", "CANCELLED"],
  RESERVED: ["PAID", "CANCELLED"],
  PAID: ["CONFIRMED"],
  CONFIRMED: ["SHIPPED"],
  SHIPPED: [],
  CANCELLED: [],
};

function createOrder(data) {
  const id = uuidv4();

  const order = {
    id,
    ...data,
    status: "CREATED",
    createdAt: new Date().toISOString(),
  };

  orders[id] = order;
  return order;
}

function getOrder(id) {
  return orders[id] || null;
}

function updateStatus(id, newStatus) {
  const order = orders[id];
  if (!order) return null;

  const allowedTransitions = validTransitions[order.status] || [];

  if (!allowedTransitions.includes(newStatus)) {
    throw new Error(`Invalid transition from ${order.status} to ${newStatus}`);
  }

  order.status = newStatus;
  order.updatedAt = new Date().toISOString();

  return order;
}

function deleteOrder(id) {
  if (!orders[id]) return false;

  delete orders[id];
  return true;
}

function resetOrders() {
  Object.keys(orders).forEach((id) => delete orders[id]);
}

function listOrders() {
  return Object.values(orders);
}

module.exports = {
  createOrder,
  getOrder,
  updateStatus,
  deleteOrder,
  resetOrders,
  listOrders,
};
