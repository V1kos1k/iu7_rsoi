import { app } from './app';

const port = process.env.PORT || 8180;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}...`);
});
