import amqp from "amqplib/callback_api";
import { configinfo } from "../config";
import { startWorker } from "./consumer";

const amqpUrl = configinfo.rabbitmq || "amqp://localhost:5673";
let amqpConn: any = null;
let isConnecting = false;

export function start() {
  if (isConnecting) return;
  isConnecting = true;

  amqp.connect(amqpUrl + "?heartbeat=60", function (err: any, conn: any) {
    isConnecting = false;
    if (err) {
      console.error("[AMQP]", err.message);
      return setTimeout(start, 1000);
    }
    conn.on("error", function (err: any) {
      if (err.message !== "Connection closing") {
        console.error("[AMQP] conn error", err.message);
      }
    });
    conn.on("close", function () {
      console.error("[AMQP] reconnecting");
      return setTimeout(start, 1000);
    });

    console.log("[AMQP] connected");
    amqpConn = conn;

    whenConnected();
  });
}

function whenConnected() {
  startWorker(amqpConn);
}

export function closeOnErr(err: unknown) {
  if (!err) return false;
  console.error("[AMQP] error", err);
  amqpConn.close();
  return true;
}
