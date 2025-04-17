import { SERVER_WEBSOCKET_URL } from "./getEnvUrl";

let ws!: WebSocket

try {
    // export default function connectWebSocket() {
 ws = new WebSocket(SERVER_WEBSOCKET_URL);

function connect() {
  ws = new WebSocket(SERVER_WEBSOCKET_URL);

  ws.onopen = () => {
    console.log("✅ Connected");
    // send initial auth or sync message if needed
  };

  ws.onerror = (err) => {
    console.warn("⚠️ WebSocket error:");
  };

  ws.onclose = () => {
    console.log("🔄 Disconnected, reconnecting...");
    setTimeout(connect, 500); // reconnect after delay
  };
}

connect();



} catch (error) {
    console.error("1. WebSocket Error")
}

function forceWebSocketReconnect() {
    try {
        ws = new WebSocket(SERVER_WEBSOCKET_URL);
    }
    catch (error) {
        console.error("2. WebSocket Error")
    }
   
  }



export default ws;
export { forceWebSocketReconnect };
