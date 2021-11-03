
import http from 'http'
import https from 'https'
import express, { Application, Request, Response, NextFunction } from 'express'
import { join } from 'path'
import { readFileSync } from 'fs'
import routesLoader from './routes'

function ensureSecure(req: Request, res: Response, next: NextFunction) {
  if (req.secure) {
    return next()
  }
  res.redirect('https://' + req.hostname + req.url)
}

export const initServer = () => {
  return new Promise((resolve) => {
    const app: Application = express()

    app.set('port', process.env.PORT || 80)
    app.set("views", join(__dirname, "views"))
    app.set("view engine", "ejs")
    if (process.env.ENV !== 'dev') {
      app.use(ensureSecure)
    }
    app.use(express.static(join(__dirname, '..', '..', 'public')))

    routesLoader(app)

    const httpServer = http.createServer(app)

    httpServer.listen(process.env.PORT || 80, () => {
      console.log(
        'Server is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
      )
      resolve(app)
    })

    if (process.env.ENV !== 'dev') {
      const sslPath = `/etc/letsencrypt/live/${process.env.DOMAIN}/`
      const privateKey = readFileSync(`${sslPath}/privkey.pem`, 'utf8')
      const certificate = readFileSync(`${sslPath}/fullchain.pem`, 'utf8')
      const credentials = { key: privateKey, cert: certificate }
      const httpsServer = https.createServer(credentials, app)
      httpsServer.listen(443, () => {
        console.log(
          'Server is running at https://localhost:%d in %s mode',
          app.get('port'),
          app.get('env')
        )
      })
    }
  })
}
