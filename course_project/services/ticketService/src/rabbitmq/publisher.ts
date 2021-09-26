import { closeOnErr } from "./connect";

let pubChannel: any = null;
let offlinePubQueue: any = [];
export function startPublisher(amqpConn: any) {
  amqpConn.createConfirmChannel(function (err: any, ch: any) {
    if (closeOnErr(err)) return;
    ch.on("error", function (err: { message: any }) {
      console.error("[AMQP] channel error", err.message);
    });
    ch.on("close", function () {
      console.log("[AMQP] channel closed");
    });

    pubChannel = ch;
    while (true) {
      var m = offlinePubQueue.shift();
      if (!m) break;
      publish(m[0], m[1], m[2]);
    }
  });
}

export function publish(exchange: string, routingKey: string, content: Buffer) {
  try {
    pubChannel.publish(
      exchange,
      routingKey,
      content,
      { persistent: true },
      function (err: any, ok: any) {
        if (err) {
          console.error("[AMQP] publish", err);
          offlinePubQueue.push([exchange, routingKey, content]);
          pubChannel.connection.close();
        }
      }
    );
  } catch (e: any) {
    console.error("[AMQP] publish", e.message);
    offlinePubQueue.push([exchange, routingKey, content]);
  }
}
