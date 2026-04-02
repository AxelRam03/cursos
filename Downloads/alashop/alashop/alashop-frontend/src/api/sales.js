import client from './client';

export const salesApi = {
  create:      (data)   => client.post('/sales/', data),
  list:        (params) => client.get('/sales/', { params }),
  exportExcel: (params) => client.get('/sales/export/excel', {
    params,
    responseType: 'blob',
  }),
  exportTicket: (saleId) => client.get(`/sales/export/ticket/${saleId}`, {
    responseType: 'blob',
  }),
};
