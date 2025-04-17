let SERVER_URL = "";
let SERVER_WEBSOCKET_URL = "";
const environment = process.env.NODE_ENV;
if (environment === "development") {
  SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL as string;
  SERVER_WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_DEV_URL as string;
} else {
  SERVER_URL = process.env.NEXT_PUBLIC_SERVER_PROD_URL as string;
  SERVER_WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_PROD_URL as string;
}

export { SERVER_URL, SERVER_WEBSOCKET_URL };