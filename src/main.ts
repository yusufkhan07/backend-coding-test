import { bootstrapApp } from './app';

bootstrapApp().then(async (app) => {
  await app.listen(3000);
});
