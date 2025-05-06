// src/services/serviceListingService.js
import sendRequest from '../utilities/sendRequest';

// include the `/api` prefix
const BASE = '/service-listings';

export async function getAllServiceListings() {
  return sendRequest(`${BASE}/`, 'GET');
}

export async function createServiceListing(data) {
  return sendRequest(`${BASE}/`, 'POST', data);
}
