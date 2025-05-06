// src/utilities/serviceRequestService.js
import sendRequest from './sendRequest';

const BASE = '/service-requests';

export async function getServiceRequests(params = {}) {
  const qs = Object.keys(params).length ? '?' + new URLSearchParams(params) : '';
  return sendRequest(`${BASE}/${qs}`, 'GET');
}

export async function getServiceRequest(id) {
  return sendRequest(`${BASE}/${id}/`, 'GET');
}

export async function createServiceRequest(data) {
  return sendRequest(`${BASE}/`, 'POST', data);
}

export async function updateServiceRequest(id, data) {
    return sendRequest(`${BASE}/${id}/`, 'PATCH', data);
}

export async function deleteServiceRequest(id) {
  return sendRequest(`${BASE}/${id}/`, 'DELETE');
}
