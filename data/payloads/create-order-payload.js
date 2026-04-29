module.exports.createOrderPayload = {
  customerId: "12345",
  items: [
    {
      sku: "A1",
      qty: 2,
    },
  ],
};

module.exports.updateOrderPayloadSuccess = {
  status: "RESERVED",
};
