import axios from 'axios';
import queryString from 'query-string';
import { AccessInterface, AccessGetQueryInterface } from 'interfaces/access';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAccesses = async (query?: AccessGetQueryInterface): Promise<PaginatedInterface<AccessInterface>> => {
  const response = await axios.get('/api/accesses', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAccess = async (access: AccessInterface) => {
  const response = await axios.post('/api/accesses', access);
  return response.data;
};

export const updateAccessById = async (id: string, access: AccessInterface) => {
  const response = await axios.put(`/api/accesses/${id}`, access);
  return response.data;
};

export const getAccessById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/accesses/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAccessById = async (id: string) => {
  const response = await axios.delete(`/api/accesses/${id}`);
  return response.data;
};
