import { closeOnErr } from "./connect";
import statisticRepository from "../repository/statistic";

export function startWorker(amqpConn: any) {
  amqpConn.createChannel(function (err: any, ch: any) {
    if (closeOnErr(err)) return;
    ch.on("error", function (err: { message: any }) {
      console.error("[AMQP] channel error", err.message);
    });
    ch.on("close", function () {
      console.log("[AMQP] channel closed");
    });
    ch.prefetch(10);
    ch.assertQueue("jobs", { durable: true }, function (err: any, _ok: any) {
      if (closeOnErr(err)) return;
      ch.consume("jobs", processMsg, { noAck: false });
      console.log("Worker is started");
    });

    function processMsg(msg: any) {
      work(msg, function (ok: any) {
        try {
          if (ok) ch.ack(msg);
          else ch.reject(msg, true);
        } catch (e) {
          closeOnErr(e);
        }
      });
    }
  });
}

function work(
  msg: { content: { toString: () => any } },
  cb: { (ok: any): void; (arg0: boolean): void }
) {
  const queueItem = JSON.parse(msg.content.toString());
  if (queueItem.type === "create") {
    statisticRepository.recordingData(queueItem.result);
  }
  cb(true);
}
