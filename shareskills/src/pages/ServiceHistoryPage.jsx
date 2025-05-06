import React, { useState, useEffect } from 'react';
import { getServiceRequests } from '../utilities/serviceRequestService';

export default function ServiceHistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getServiceRequests({ provider: 'current' })
      .then(data => {
        const arr = Array.isArray(data) ? data : data.results || [];
        // exclude pending & accepted
        setHistory(arr.filter(r => !['pending','accepted'].includes(r.status)));
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Service History</h2>
      {history.map(r => (
        <div key={r.id} className="mb-4 p-4 border rounded-lg">
          <p><strong>{r.client}</strong> — {r.status} on {new Date(r.updated_at).toLocaleDateString()}</p>
          <p className="text-gray-700">{r.message}</p>
          {r.status === 'completed' && r.review ? (
            <p className="mt-2">Reviewed: {r.review.rating} ★ — {r.review.comment}</p>
          ) : null}
        </div>
      ))}
      {history.length === 0 && <p>No past requests.</p>}
    </div>
  );
}
