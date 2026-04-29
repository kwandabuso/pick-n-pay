import express from "express";
import auth from "./authMiddleware.js";
import {
  createOrder,
  getOrder,
  updateStatus,
  deleteOrder,
  resetOrders,
  listOrders,
} from "./orderStore.js";

const app = express();
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "UP", dbPath });
});

app.use(auth);

app.post("/api/orders", (req, res) => {
  const { customerId, items } = req.body;

  if (!customerId || typeof customerId !== "string") {
    return res.status(400).json({ message: "customerId is required" });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ message: "items must contain at least one item" });
  }

  const order = createOrder(req.body);
  return res.status(201).json(order);
});

app.get("/api/orders", (req, res) => {
  return res.json(getAllOrders());
});

app.get("/api/orders/:id", (req, res) => {
  const order = getOrder(req.params.id);

  if (!order) return res.status(404).json({ message: "Not found" });

  return res.json(order);
});

app.patch("/api/orders/:id/status", (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "status is required" });
    }

    const order = updateStatus(req.params.id, status);
    if (!order) return res.status(404).json({ message: "Not found" });

    return res.json(order);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

app.delete("/api/debug/reset", (req, res) => {
  resetOrders();
  return res.json({ message: "Reset complete" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mock OMS running on http://localhost:${PORT}`);
});
