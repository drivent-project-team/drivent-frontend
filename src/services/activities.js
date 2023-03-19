import api from './api';

export async function getActivities(token) {
  const { data } = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getPlaces(token) {
  const { data } = await api.get('/activities/places', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getUserActivities(token) {
  const { data } = await api.get('/activities/userActivities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

