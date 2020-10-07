import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';

function UpdateForm() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('Price Range');

    let history = useHistory();

    const { setIsUpdated } = useContext(RestaurantContext);

    useEffect(() => {
        async function fetchData() {
            const response = await RestaurantFinder.get(`${id}`);
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);
        }
        fetchData().catch(err => console.log(err));
    }, [id])

    // faltou o 404...

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await RestaurantFinder.put(`${id}/`, {
                name,
                location,
                price_range: priceRange
            })
            setIsUpdated(false)
            history.push('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="restaurant name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="restaurant location"
                        value={location}
                        onChange={e => setLocation(e.target.value)}                            
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <select className="custom-select" value={priceRange} onChange={e => setPriceRange(e.target.value)}>
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}

export default UpdateForm;
