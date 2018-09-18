SSL=false
DATABASE_URL=postgres://user:password@hostwithport/database

Twitter key shown in dashboard for your twitter app:
twConsumerKey=
twConsumerSecret=

Facebook key shown in dashboard for your facebook app:
fbClientID=
fbClientSecret=

The name of your heroku app so that the callback urls match what is in your facebook/twitter 
app on their server.
So: https://${process.env.herokuAppName}/api/oauth/twitter/authenticatedCallback 
would see ${process.env.herokuAppName} replaced with pure-river-11017.herokuapp.com
herokuAppName=