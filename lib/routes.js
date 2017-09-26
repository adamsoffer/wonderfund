const nextRoutes = require('next-routes')
const routes = (module.exports = nextRoutes())

routes.add('home', '/', 'index')
routes.add('project', '/project/:slug')
routes.add('about', '/about-us')
routes.add('startACampaign', '/start-a-campaign')
routes.add('contact', '/contact')
