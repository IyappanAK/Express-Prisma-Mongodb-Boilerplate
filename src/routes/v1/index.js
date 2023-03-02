const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const uploadFileRoute = require('./uploadFiles.route');
const loginRoute = require('./login.route');

const router = express.Router();

const defaultRoutes = [
  // Auth Using OTP
  {
    path: '/auth',
    route: authRoute,
  },
  //Login Using Email
  {
    path: '/login',
    route: loginRoute,
  },
 // Examples
  {
    path: '/users',
    route: userRoute,
  },
  //Image Upload Using S3 Bucket
  {
    path: '/fileserver',
    route: uploadFileRoute,
  },
  
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
