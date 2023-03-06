import api from './api';

export async function getEnrollmentUser(token) {
  const { data } = await api.get('/enrollments', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function postPayment(body, token) {
  const response = await api.post('/payments/process', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getPayment(token, ticketId) {
  const { data } = await api.get(`/payments?ticketId=${ticketId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
