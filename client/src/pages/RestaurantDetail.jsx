import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { RestaurantContext } from '../context/RestaurantContext';

function RestaurantDetail() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState({});
    const { newReviews } = useContext(RestaurantContext);

    useEffect(() => {
        async function fetchData() {
            const response = await RestaurantFinder.get(`${id}`);
            setRestaurant(response.data.data.restaurant);
        }
        fetchData().catch(err => console.log(err));
    }, [id, newReviews])

    return (
        <Fragment>
            { restaurant &&
            <>
            <div className="my-3 text-center">
                <h1 className="font-weight-light display-3">{restaurant.name }</h1>
                {restaurant.count > 0 ? <><StarRating rating={restaurant.avg_rating}/>
                <span>{` (${restaurant.count}) | `}</span></> : <span>no reviews yet | </span>}
                <Link to={`/restaurants/${restaurant.id}/update`}>Update restaurant</Link>
            </div>
            <Reviews reviews={restaurant.reviews}/>
            <AddReview />
            </>
            }
        </Fragment>
    )
}

export default RestaurantDetail;
