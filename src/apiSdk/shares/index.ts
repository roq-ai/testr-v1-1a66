import axios from 'axios';
import queryString from 'query-string';
import { ShareInterface, ShareGetQueryInterface } from 'interfaces/share';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getShares = async (query?: ShareGetQueryInterface): Promise<PaginatedInterface<ShareInterface>> => {
  const response = await axios.get('/api/shares', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createShare = async (share: ShareInterface) => {
  const response = await axios.post('/api/shares', share);
  return response.data;
};

export const updateShareById = async (id: string, share: ShareInterface) => {
  const response = await axios.put(`/api/shares/${id}`, share);
  return response.data;
};

export const getShareById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/shares/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteShareById = async (id: string) => {
  const response = await axios.delete(`/api/shares/${id}`);
  return response.data;
};
