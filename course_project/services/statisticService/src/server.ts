import { app } from "./app";
import { start } from "./rabbitmq/connect";

const port = process.env.PORT || 8680;
app.listen(port, () => {
  start();
  console.log(`Server is up and running on port ${port}...`);
});
