import { app } from './app';

const port = process.env.PORT || 8480;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}...`);
});
