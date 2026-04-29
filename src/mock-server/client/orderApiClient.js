const BASE = "http://localhost:3000/api";

const headers = {
  Authorization: "Bearer mock-valid-token",
  "Content-Type": "application/json",
};

async function createOrder(request, payload) {
  return request.post(`${BASE}/orders`, { data: payload, headers });
}

async function getOrder(request, id) {
  return request.get(`${BASE}/orders/${id}`, { headers });
}

async function updateStatus(request, id, status) {
  return request.patch(`${BASE}/orders/${id}/status`, {
    data: { status },
    headers,
  });
}

module.exports = { createOrder, getOrder, updateStatus };
