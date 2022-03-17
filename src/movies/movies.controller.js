const service = require("./movies.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");

//middleware

async function movieExists(req, res, next) {
    const foundMovie = await service.read(req.params.id);
    if (foundMovie) {
        res.locals.movie = foundMovie;
        return next();
    }
    next({
        status: 404,
        message: `Movie does not exist in the database`,
    })
}



//functions

async function list(req, res, next) {
    const { is_showing } = req.query;
    is_showing ? res.status(200).json({ data: await service.listShowing() }) : res.status(200).json({ data: await service.list() });
}

async function read(req, res, next) {
    res.status(200).json({ data: res.locals.movie });
}

async function listReviews(req, res) {
    const movieId = res.locals.movie.movie_id;
    const reviews = await service.listReviews(movieId);
    const allReviews = [];
    for (let i = 0; i < reviews.length; i++) {
        const review = reviews[i];
        const critic = await service.getCritics(review.critic_id);
        review.critic = critic[0];
        allReviews.push(review);
    }
    res.status(200).json({ data: allReviews });
}

async function listTheaters(req, res) {
    const movieId = res.locals.movie.movie_id;
    const result = await service.listTheaters(movieId);
    res.status(200).json({ data: result });
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    listReviews: [
        asyncErrorBoundary(movieExists),
        asyncErrorBoundary(listReviews),
    ],
    listTheaters: [
        asyncErrorBoundary(movieExists),
        asyncErrorBoundary(listTheaters),
    ],
};