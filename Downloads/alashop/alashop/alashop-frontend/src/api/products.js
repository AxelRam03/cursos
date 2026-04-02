import client from './client';

export const productsApi = {
  list:       (params) => client.get('/products/', { params }),
  getByBarcode: (barcode) => client.get(`/products/barcode/${barcode}`),
  create:     (data)   => client.post('/products/', data),
  update:     (id, data) => client.patch(`/products/${id}`, data),
  delete:     (id)     => client.delete(`/products/${id}`),
  uploadImage:(id, file) => {
    const form = new FormData();
    form.append('file', file);
    return client.post(`/products/${id}/image`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
