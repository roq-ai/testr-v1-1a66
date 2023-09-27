import axios from 'axios';
import queryString from 'query-string';
import { NotificationInterface, NotificationGetQueryInterface } from 'interfaces/notification';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getNotifications = async (
  query?: NotificationGetQueryInterface,
): Promise<PaginatedInterface<NotificationInterface>> => {
  const response = await axios.get('/api/notifications', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createNotification = async (notification: NotificationInterface) => {
  const response = await axios.post('/api/notifications', notification);
  return response.data;
};

export const updateNotificationById = async (id: string, notification: NotificationInterface) => {
  const response = await axios.put(`/api/notifications/${id}`, notification);
  return response.data;
};

export const getNotificationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/notifications/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteNotificationById = async (id: string) => {
  const response = await axios.delete(`/api/notifications/${id}`);
  return response.data;
};
