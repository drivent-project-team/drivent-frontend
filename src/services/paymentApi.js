import api from './api';

export async function getEnrollmentUser(token) {
  const { data } = await api.get('/enrollments', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getTickets(token) {
  const { data } = await api.get('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
