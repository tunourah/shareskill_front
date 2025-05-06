// src/services/serviceListingService.js
import sendRequest from '../utilities/sendRequest';
 
const BASE = '/service-listings';

export async function getAllServiceListings(params = {}) {
    const qs = Object.keys(params).length
      ? "?" + new URLSearchParams(params).toString()
      : "";
    return sendRequest(`${BASE}/${qs}`, "GET");
  }

export async function createServiceListing(data) {
  return sendRequest(`${BASE}/`, 'POST', data);
}

 
 
