import express, { Application } from 'express'
import { join } from 'path'
import routesLoader from './routes'

export const initServer = () => {
  return new Promise((resolve) => {
    const app: Application = express();

    app.set('port', process.env.PORT || 80);
    app.set("views", join(__dirname, "views"));
    app.set("view engine", "ejs");
    app.use(express.static(join(__dirname, 'public')));

    routesLoader(app);

    app.listen(app.get('port'), () => {
      console.log(
        'Server is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
      );
      resolve(app);
    });

  })
};
