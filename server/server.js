require("dotenv").config();
const express = require("express");
const db = require("./db")
const morgan = require("morgan")
const cors = require("cors")
const app = express();

// MIDDLEWARES

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// ENDPOINTS

app.get('/api/v1/restaurants', async (req, res) => {
    try {
        const results = await db.query(
            'SELECT restaurants.*, trunc(AVG(reviews.rating), 2) as avg_rating, COUNT(reviews.rating) FROM restaurants LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id GROUP BY restaurants.id;'
        );
        res.status(200).json({
            status: 'success',
            results: results.rowCount, // posso usar pra paginar...
            data: {
                restaurants: results.rows
            }
        });
    } catch (err) {
        res.json({
            status: 'fail',
            error: err.message
        })
    }
});

app.get('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await db.query(
            'SELECT restaurants.*, trunc(AVG(reviews.rating), 2) as avg_rating, COUNT(reviews.rating) FROM restaurants LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id GROUP BY restaurants.id HAVING restaurants.id = $1;',
            [req.params.id]
        )
        const reviews = await db.query(
            'SELECT * FROM reviews WHERE restaurant_id = $1;',
            [req.params.id]
        )
        res.status(200).json({
            status: 'success',
            data: {
                restaurant: {
                    ...restaurant.rows[0],
                    reviewsCount: reviews.rowCount,
                    reviews: reviews.rows
                }
            }
        })
    } catch (err) {
        res.json({
            status: 'fail',
            error: err.message
        })
    }
    // todo: faltou um 404
});

app.post('/api/v1/restaurants', async (req, res) => {
    try {
        const results = await db.query(
            'INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *;',
            [req.body.name, req.body.location, req.body.price_range]
        );
        res.status(201).json({
            status: 'success',
            data: {
                restaurant: results.rows[0]
            }
        })    } catch (err) {
        res.json({
            status: 'fail',
            error: err.message
        })
    }
});

app.post('/api/v1/restaurants/:id/addreview', async (req, res) => {
    try {
        const results = await db.query(
            'INSERT INTO reviews (name, review, rating, restaurant_id) values ($1, $2, $3, $4) returning *;',
            [req.body.name, req.body.review, req.body.rating, req.params.id]
        );
        res.status(201).json({
            status: 'success',
            data: {
                review: results.rows[0]
            }
        })    } catch (err) {
        res.json({
            status: 'fail',
            error: err.message
        })
    }
});

app.put('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const results = await db.query(
            'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *;',
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
        )
        res.status(200).json({
            status: 'success',
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        res.json({
            status: 'fail',
            error: err.message
        })
    }
    // todo: faltou um 404
});

app.delete('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const results = await db.query(
            'DELETE FROM restaurants WHERE id = $1;',
            [req.params.id]
        )
        res.status(204).json({
            status: 'success',
        })
    } catch (err) {
        res.json({
            status: 'fail',
            error: err.message
        })
    }
    // todo: faltou um 404
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log('server is up and listening on port', port)
);