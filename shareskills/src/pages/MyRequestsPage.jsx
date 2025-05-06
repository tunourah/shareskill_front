import React, {useState, useEffect} from 'react';
import { getServiceRequests } from '../utilities/serviceRequestService';
import { Link } from 'react-router-dom';

export default function MyRequestsPage() {
  const [reqs, setReqs] = useState([]);
  useEffect(() => {
    getServiceRequests({ client: 'current' })
      .then(d=> setReqs(Array.isArray(d)?d:d.results));
  }, []);

  return (
    <div>
      <h2>My Requests</h2>
      {reqs.map(r => (
        <div key={r.id} className="p-4 mb-4 border rounded">
          <p>Service: {r.service_title}</p>
          <p>Status: {r.status}</p>
          {r.status === 'completed' && (
            <Link to={`/requests/${r.id}/review`} className="text-blue-500">Leave a Review</Link>
          )}
        </div>
      ))}
    </div>
  );
}
