/*
  REQUIRED ROUTES
*/

========= Probably not needed =========
GET   -->   /api
=======================================

GET   -->   /api/signup
POST  -->   /api/signup
GET   -->   /api/login
POST  -->   /api/login
POST  -->   /api/logout
GET   -->   /api/oauth
GET   -->   /api/oauth/twitter/:userId
GET   -->   /api/oauth/facebook/:userId
POST  -->   /api/oauth/twitter/authenticatedCallback
POST  -->   /api/oauth/facebook/authenticatedCallback
GET   -->   /api/home
GET   -->   /api/drafts
GET   -->   /api/createPost
POST  -->   /api/createPost/publish
POST  -->   /api/createPost/save
POST  -->   /validateuser
GET   -->   *
GET   -->   /home/updateTwitterFeed/:userId
