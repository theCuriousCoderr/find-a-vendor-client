import ws, { forceWebSocketReconnect } from "@/utils/connectWebSocket";
// import { SERVER_WEBSOCKET_URL } from "@/utils/getEnvUrl";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function _connectWebSocket() {
  let handshake = false;

  // ws.onopen = () => {
  //   console.log("✅ Connected to WebSocket");
  //   handshake = true;
  // };

  // const ws = new WebSocket(SERVER_WEBSOCKET_URL);

  if (ws && ws.readyState === WebSocket.OPEN) {
    handshake = true;
  } else {
    forceWebSocketReconnect();
  }

  return handshake;
}

const initialState = {
  isWebSocketConnected: false,
  vendor_notif_count: 0,
  customer_notif_count: 0,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    connectWebSocket: (state) => {
      state.isWebSocketConnected = _connectWebSocket();
    },
    updateHandshake: (state, action: PayloadAction<boolean>) => {
      state.isWebSocketConnected = action.payload
    },
    updateCustomerNotif: (state, action: PayloadAction<number>) => {
      // console.log(action.payload)
      state.customer_notif_count += action.payload;
    },
    updateVendorNotif: (state, action: PayloadAction<number>) => {
      // console.log(action.payload)
      state.vendor_notif_count += action.payload;
    },
  },
});

export const { connectWebSocket, updateHandshake, updateCustomerNotif, updateVendorNotif } =
  notificationSlice.actions;
export default notificationSlice.reducer;
