DROP DATABASE IF EXISTS cavareviews;
CREATE DATABASE cavareviews;

\connect cavareviews;

-- DROP TABLE IF EXISTS reviews;
-- DROP TABLE IF EXISTS categories;
-- DROP TABLE IF EXISTS review_categories;

CREATE TABLE reviews (
	id UUID PRIMARY KEY,
	restaurant_id integer,
	username varchar(50),
	date date,
	overall_rating integer,
	food_rating integer,
	service_rating integer,
	ambiance_rating integer,
	value_rating integer,
	noise_level integer,
	recommended integer,
	body text
);

\copy reviews (id,restaurant_id,username,date,overall_rating,food_rating,service_rating,ambiance_rating,value_rating,noise_level,recommended,body) FROM databases/mockData.csv WITH csv;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username varchar(50) UNIQUE
);

INSERT INTO users (username) SELECT username FROM reviews ON CONFLICT (username) DO NOTHING;

-- INSERT INTO reviews (id,restaurant_id,username,date,overall_rating,food_rating,service_rating,ambiance_rating,value_rating,noise_level,recommended,body) VALUES ('ae285ce5-9500-49f0-850e-d442bef0f156',10000001,'Matt78','2017-11-18',1,4,5,3,5,2,4,'This is a highly enjoyable restaurant.');


-- CREATE TABLE categories (
-- 	id serial PRIMARY KEY,
-- 	category varchar(50)
-- );

-- CREATE TABLE review_categories (
-- 	id serial PRIMARY KEY,
-- 	reviews_id integer,
-- 	category varchar(50),
-- 	selected boolean
-- );

-- INSERT INTO categories (category) VALUES
--   ('Special Occasion'),
--   ('Business Meals'),
--   ('Live Music'),
--   ('Good for Groups'),
--   ('Waterfront'),
--   ('Scenic View'),
--   ('Kid-friendly'),
--   ('Afternoon Coffee'),
--   ('Romantic'),
--   ('Good for Anniversaries'),
--   ('Casual'),
--   ('Seasonal'),
--   ('Great for Outdoor Dining'),
--   ('Neighborhood Gem'),
--   ('Late-night Find'),
--   ('Handcrafted Cocktails'),
--   ('Vegan'),
--   ('Healthy'),
--   ('Comfort Food'),
--   ('Disabled Access'),
--   ('Fun'),
--   ('Happy Hour'),
--   ('Bar Seating'),
--   ('Tasting Menu'),
--   ('Quiet Conversation'),
--   ('Authentic'),
--   ('Vibrant Bar Scene'),
--   ('Fit for Foodies'),
--   ('Worth the Drive'),
--   ('Notable Wine List'),
--   ('Quick Bite'),
--   ('Organic'),
--   ('Great for Lunch'),
--   ('Afternoon Tea'),
--   ('Good for Birthdays'),
--   ('Hot Spot'),
--   ('Great for Brunch'),
--   ('Pre/post Theatre'),
--   ('Cozy'),
--   ('Gluten Free Options'),
--   ('Live Sports'),
--   ('People Watching'),
--   ('Creative Cuisine'),
--   ('Spicy'),
--   ('Paleo Friendly'),
--   ('Good for a Date'),
--   ('Local Ingredients'),
--   ('Good Vegetarian Options'),
--   ('Tapas'),
--   ('Sunday Lunch'),
--   ('Great Beer')
--   ;
