CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  username TEXT,
  password TEXT
);

CREATE TABLE tokens
(
  id SERIAL PRIMARY KEY,
  user_id INT,
  twitter_token TEXT,
  twitter_token_secret TEXT,
  facebook_token TEXT,
  instagram_token TEXT
);

CREATE TABLE posts
(
  id SERIAL PRIMARY KEY,
  user_id INT,
  caption TEXT,
  text TEXT,
  media_url TEXT,
  media_pic BYTEA,
  media_video BYTEA,
  post_date timestamp
);

ALTER TABLE tokens ADD CONSTRAINT tokens_fk0 FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE tokens ADD CONSTRAINT posts_fk0 FOREIGN KEY (user_id) REFERENCES users(id);


/*  Execute this file from the command line by typing:
 *    heroku pg:psql -f database/schema.sql
 *  to create the tables.
*/
