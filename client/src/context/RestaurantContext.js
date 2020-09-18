import React, { useState, createContext, useEffect } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';

export const RestaurantContext = createContext();

export const RestaurantContextProvider = props => {
    const [restaurants, setRestaurants] = useState([])
    const [newReviews, setNewReviews] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await RestaurantFinder.get('')
            setRestaurants(response.data.data.restaurants)
        }
        fetchData().catch(err => console.log(err));
    }, [setRestaurants])

    const addRestaurant = restaurant => {
        setRestaurants([...restaurants, restaurant])
    }

    const addReview = review => {
        setNewReviews([...newReviews, review])
    }

    return (
        <RestaurantContext.Provider value={{
            restaurants,
            setRestaurants,
            addRestaurant,
            addReview,
            newReviews
        }}>
            {props.children}
        </RestaurantContext.Provider>
    )
}
