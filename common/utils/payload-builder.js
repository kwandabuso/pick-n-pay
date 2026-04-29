import {
  createOrderPayload,
  updateOrderPayloadSuccess,
} from "../../data/payloads/create-order-payload.js";

export function buildCreateOrderPayloadSuccess(customerId, sku, quantity) {
  return {
    ...createOrderPayload,
    customerId,
    items: [
      {
        sku,
        qty: quantity,
      },
    ],
  };
}

export function buildUpdateOrderPayload(customerId, sku, quantity) {
  return updateOrderPayloadSuccess;
}
