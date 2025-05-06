import React, {useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import sendRequest from '../utilities/sendRequest';

export default function ReviewPage() {
  const {id} = useParams();
  const nav = useNavigate();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const handle = async e => {
    e.preventDefault();
    await sendRequest('/reviews/', 'POST', { service_request: id, rating, comment });
    nav('/userpage');
  };
  return (
    <form onSubmit={handle} className="space-y-4 p-4">
      <h2 className="text-xl">Leave a Review</h2>
      <input type="number" min="1" max="5" value={rating}
        onChange={e=>setRating(e.target.value)} className="border p-2 rounded"/>
      <textarea value={comment} onChange={e=>setComment(e.target.value)}
        className="border p-2 rounded w-full" />
      <button type="submit" className="px-4 py-2 bg-brightBlue text-white rounded">Submit</button>
    </form>
  );
}
