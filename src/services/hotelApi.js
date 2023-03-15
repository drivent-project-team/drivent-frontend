import api from './api';

export async function getBookingUser(token) {
  const { data } = await api.get('/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export async function postBookig(body, token) {
  const { data } = await api.post('/booking', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export async function putBookig(body, token, bookingId) {
  const { data } = await api.put(`/booking/${bookingId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
