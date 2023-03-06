import api from './api';

export async function getTicketTypes(token) {
  const { data } = await api.get('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getTicket(token) {
  const { data } = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function postTicket(body, token) {
  const response = await api.post('/tickets', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
