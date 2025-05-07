// src/pages/ReviewPage.jsx

import React, { useState } from 'react';
import sendRequest from '../utilities/sendRequest';

const COLORS = {
  darkTeal:   "#002933",
  brightBlue: "#0AC6F2"
};

export default function ReviewPage({ id, existingReview, onSuccess }) {
  // View mode if a review already exists
  if (existingReview) {
    return (
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold" style={{ color: COLORS.darkTeal }}>
          Your Review
        </h2>
        <p><strong>Rating:</strong> {existingReview.rating}/5</p>
        <p><strong>Comment:</strong></p>
        <div className="p-3 bg-gray-100 rounded">{existingReview.comment}</div>
      </div>
    );
  }

  // Otherwise, the one‐time form
  const [rating, setRating]   = useState(5);
  const [comment, setComment] = useState('');

  const handle = async e => {
    e.preventDefault();
    const newReview = await sendRequest('/reviews/', 'POST', {
      service_request: id,
      rating,
      comment
    });
    onSuccess(newReview);
  };

  return (
    <form onSubmit={handle} className="p-6 space-y-4">
      <h2 className="text-xl font-semibold" style={{ color: COLORS.darkTeal }}>
        Leave a Review
      </h2>
      <div className="space-y-2">
        <label className="block text-sm">Rating (1–5)</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={e => setRating(e.target.value)}
          className="w-20 border p-2 rounded"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm">Comment</label>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="w-full border p-2 rounded h-32"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 rounded"
        style={{
          backgroundColor: COLORS.brightBlue,
          color: 'white'
        }}
      >
        Submit
      </button>
    </form>
  );
}
