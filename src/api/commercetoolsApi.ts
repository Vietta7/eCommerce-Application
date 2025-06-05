const API_BASE = 'https://api.europe-west1.gcp.commercetools.com';
const PROJECT_KEY = 'dino-land';

export const commercetoolsApi = {
  async fetchCategories(token: string) {
    const response = await fetch(`${API_BASE}/${PROJECT_KEY}/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return response.json();
  },

  async fetchProducts(token: string, params: URLSearchParams) {
    const response = await fetch(
      `${API_BASE}/${PROJECT_KEY}/product-projections/search?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return response.json();
  },

  fetchProductSearch: async (token: string, params: URLSearchParams) => {
    const res = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/dino-land/product-search?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
  },
};
