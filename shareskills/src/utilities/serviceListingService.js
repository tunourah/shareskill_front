import sendRequest from '../utilities/sendRequest';

const BASE = '/service-listings';

export async function getAllServiceListings(params = {}) {
  const qs = Object.keys(params).length ? '?' + new URLSearchParams(params) : '';
  return sendRequest(`${BASE}/${qs}`, 'GET');
}

export async function getServiceListing(id) {
  return sendRequest(`${BASE}/${id}/`, 'GET');
}

export async function createServiceListing(data) {
  return sendRequest(`${BASE}/`, 'POST', data);
}

export async function updateServiceListing(id, data) {
  return sendRequest(`${BASE}/${id}/`, 'PUT', data);
}

export async function deleteServiceListing(id) {
  return sendRequest(`${BASE}/${id}/`, 'DELETE');
}
