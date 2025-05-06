import React, { useState, useEffect } from 'react';
import { updateServiceRequest, getServiceRequests } from '../utilities/serviceRequestService';

export default function PendingRequestsPage() {
  const [list, setList] = useState([]);
  useEffect(() => {
    getServiceRequests({ provider: 'current', status: 'pending' })
      .then(data => setList(Array.isArray(data)?data:data.results))
  }, []);

  const handle = async (id, newStatus) => {
    await updateServiceRequest(id, { status: newStatus });
    setList(l => l.filter(r => r.id !== id));
  };

  return (
    <div>
      <h2>Pending Requests</h2>
      {list.map(r => (
        <div key={r.id} className="p-4 mb-4 border rounded">
          <p><strong>{r.client}</strong> asked on {new Date(r.created_at).toLocaleString()}</p>
          <p>{r.message}</p>
          <button onClick={()=>handle(r.id,'accepted')} className="mr-2 px-3 py-1 bg-green-500 text-white">Accept</button>
          <button onClick={()=>handle(r.id,'rejected')} className="px-3 py-1 bg-red-500 text-white">Reject</button>
        </div>
      ))}
    </div>
  );
}
