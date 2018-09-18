CLI commands

local db commands:
initdb -D database/data
pg_ctl -D database/data -l logfile start
pg_ctl status -D database/data
createdb test
psql test
psql -f schema.sql

in psql CLI:
TABLE items;
\d tables; 
insert into items("imgUrl") VALUES ('testers2');
\x on // easier to see tables

heroku CLI:
heroku pg:psql -f schema.sql  // add schema to heroku pg database
heroku pg:psql  // command for starting database
heroku logs --tail // see heroku server logs for app
heroku login // if you are working on a different computer than normal
heroku open // open app in new browser tab

git remote add heroku yourrepo.git