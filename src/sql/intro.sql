-- Create shirts table

CREATE TABLE type19_db.shirts 
(
shirt_id INT UNSIGNED NOT NULL AUTO_INCREMENT, 
shirt_brand VARCHAR(255) NOT NULL, 
shirt_model VARCHAR(255) NOT NULL, 
shirt_size VARCHAR(5) NOT NULL, 
shirt_price DECIMAL(2) UNSIGNED NOT NULL, 
shirt_discription TEXT NOT NULL, 
PRIMARY KEY (shirt_id)
) 
ENGINE = InnoDB;

-- Add all posts
INSERT INTO posts (title, author, date, body) VALUES
('Post 1', 'James Band', '2023-12-20', 'This is body of Post 1'),
('Post 2', 'Jane Dow', '2023-12-01', 'Body of post 2'),
('POST 3', 'James Band', '2023-12-04', 'Body about post 3'),
('Post 4', 'Mike T', '2023-12-14', 'Post about Boxing from T. '),
('Post 5', 'Mike T', '2023-12-15', 'Post about Boxing from T. '),
('Post 6', 'Jane Dow', '2023-11-05', 'Post 6 about Jane');

-- Create one post
INSERT INTO posts 
  (title, author, date, body) 
  VALUES ('Post 5', 'Mike T', '2023-12-15', 'Post about Boxing from T. ');

