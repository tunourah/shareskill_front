import { useState, useEffect } from 'react';
import { useParams }         from 'react-router-dom';
import sendRequest           from '../utilities/sendRequest';

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        // 1) get the listing itself
        const s = await sendRequest(`/service-listings/${id}/`, 'GET');
        setService(s);

        // 2) get its reviews
        const r = await sendRequest(
          `/reviews/?service_listing=${id}`,
          'GET'
        );
        setReviews(Array.isArray(r) ? r : r.results ?? []);
      } catch (err) {
        setError(err.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (error)   return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!service) return <p>Service not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
      <p className="mb-6">{service.description}</p>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Details</h2>
        <p><strong>Category:</strong> {service.category_name ?? service.category?.name}</p>
        <p><strong>Provider:</strong> {service.provider_username ?? service.provider?.username}</p>
        <p><strong>Price:</strong> {service.price_description}</p>
        <p><strong>Location:</strong> {service.location_description}</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev.id} className="border-b py-4">
              <p><strong>{rev.reviewer.username}</strong> rated {rev.rating}/5</p>
              <p className="mt-1">{rev.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
