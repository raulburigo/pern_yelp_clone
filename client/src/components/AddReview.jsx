import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';

function AddReview() {
    
    const [name, setName] = useState('')
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)
    const restaurantId = useParams().id;
    
    const { addReview } = useContext(RestaurantContext)

    const emptyStar = <i className="fas fa-star"></i>
    const fullStar = <i className="far fa-star"></i>

    const handleSubmit = async e => {
        e.preventDefault()
        if (rating === 0) {
            alert('You must give at least one star')
        } else {
            try {
                const result = await RestaurantFinder.post(
                    `/${restaurantId}/addreview/`,
                    { name, review, rating }
                    )
                console.log(result)
                addReview(result)
            } catch (err) {
                console.log(err)
            }
            setName('')
            setReview('')
            setRating(0)
        }
    }

    return (
        <div className="mb-2">
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input required className="form-control" placeholder="user name" value={name} onChange={e => setName(e.target.value)} type="text"/>
                    </div>
                    <div className="form-group col-3 offset-1">
                        <label htmlFor="rating">Rating</label>
                        <div>
                            <span onClick={() => setRating(1)} value={1}>{rating >= 1 ? emptyStar : fullStar}</span>
                            <span onClick={() => setRating(2)} value={2}>{rating >= 2 ? emptyStar : fullStar}</span>
                            <span onClick={() => setRating(3)} value={3}>{rating >= 3 ? emptyStar : fullStar}</span>
                            <span onClick={() => setRating(4)} value={4}>{rating >= 4 ? emptyStar : fullStar}</span>
                            <span onClick={() => setRating(5)} value={5}>{rating >= 5 ? emptyStar : fullStar}</span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="review">Review</label>
                    <textarea required id="review" value={review} onChange={e => setReview(e.target.value)} className="form-control"></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-small">Add Review</button>
            </form>
        </div>
    )
}


export default AddReview
