// src/services/categoryService.js
import sendRequest from '../utilities/sendRequest';

const BASE = '/categories';

export async function getAllCategories() {
  return sendRequest(`${BASE}/`, 'GET');
}
 
