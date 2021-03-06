import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';
import StarRating from './StarRating';

function RestaurantList() {

    const {restaurants, setRestaurants} = useContext(RestaurantContext);

    let history = useHistory();

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            await RestaurantFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter(restaurant => restaurant.id !== id))
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation()
        history.push(`/restaurants/${id}/update`)
    }

    const handleDetail = id => {
        history.push(`/restaurants/${id}`)
    }

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary text-center">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map(restaurant => (
                    <tr key={restaurant.id} onClick={() => handleDetail(restaurant.id)}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{'$'.repeat(restaurant.price_range)}</td>
                        {restaurant.count > 0 ? <td>
                            <StarRating rating={restaurant.avg_rating}/>
                            <span className="text-warning">({restaurant.count})</span>
                        </td> : <td><span className="text-warning">no reviews</span></td>}
                        <td><button onClick={e => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button></td>
                        <td><button onClick={e => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button></td>
                    </tr>
                    ))}                              
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList
