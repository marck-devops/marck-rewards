import { fetchUtils } from 'react-admin';
import { Params, Product, ProductListResponse } from '../../../constants/dataTypes';

const apiUrl = import.meta.env.VITE_BASE_URL;

const httpClient = (url: string, options: RequestInit = {}): Promise<ProductListResponse> => {
	if (!options.headers) {
		options.headers = new Headers({
			Accept: 'application/json',
			'Content-Type': 'application/json'
		});
	}

	const user = JSON.parse(localStorage.getItem('user') || '{}');

	if (user) {
		const { accessToken } = user;
		if (options.headers instanceof Headers) {
			options.headers.set('Authorization', `Bearer ${accessToken}`);
		}
	} else {
		alert('No valid access token found.');
	}

	return fetchUtils.fetchJson(url, options);
};

const productResource = {
	getList: (resource: string, params: Params): Promise<Product> => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort || { field: 'id', order: 'ASC' };

		if (resource === 'product') {
			if (window.location.search.includes('storeId')) {
				const storeId = window.location.search.split('=')[1];
				const url = `${apiUrl}/product/get-store-products?page=${page}&perPage=${perPage}&sort=${field}:${order}&storeId=${storeId}`;
				return httpClient(url).then(({ json }) => json);
			} else {
				const url = `${apiUrl}/product?page=${page}&perPage=${perPage}&sort=${field}:${order}`;
				return httpClient(url).then(({ json }) => json);
			}
		}

		return Promise.reject(`Unsupported resource: ${resource}`);
	},

	getOne: (resource: string, params: Params): Promise<{ data: Product }> => {
		const url = `${apiUrl}/product/${params.id}`;
		return httpClient(url).then(({ json }) => ({ data: { ...json, id: json.id } }));
	},

	getMany: (resource: string, params: Params): Promise<{ data: Product }> => {
		const query = {
			filter: JSON.stringify({ id: params.ids })
		};
		const url = `${apiUrl}/product/search?id=${JSON.stringify(query)}`;
		return httpClient(url).then(({ json }) => ({ data: json }));
	},

	getManyReference: (
		resource: string,
		params: Params
	): Promise<{ data: Product; total: number }> => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort || { field: 'id', order: 'ASC' };
		const query: Record<string, string | number> = {
			...params.filter,
			[params.target as string]: params.id,
			sort: JSON.stringify([field, order]),
			range: JSON.stringify([(page - 1) * perPage, page * perPage - 1])
		};
		if (params.id !== undefined) {
			query['store'] = params.id; // Add the store ID to the query
		}
		// const url = `${apiUrl}/product?${JSON.stringify(query)}`;
		const url = `${apiUrl}/product/store/${params.id}?${JSON.stringify(query)}`;

		return httpClient(url).then(({ headers, json }) => {
			const total = headers.get('content-range')?.split('/').pop() || '';
			return {
				data: json,
				total: parseInt(total, 10)
			};
		});
	},

	create: (resource: string, params: Params): Promise<{ data: Partial<Product> }> => {
		const { productReceiptPoints, ...restData } = params.data || {};

		const numericData = {
			...restData,
			productReceiptPoints: productReceiptPoints ? Number(productReceiptPoints) : undefined
		};

		const url = `${apiUrl}/product`;

		return httpClient(url, {
			method: 'POST',
			body: JSON.stringify(numericData)
		})
			.then(({ json }) => {
				return { data: { ...numericData, id: json.id } };
			})
			.catch((error) => {
				console.error('Error during entity creation:', error);
				return Promise.reject(error); // Return a rejected Promise
			});
	},

	update: (resource: string, params: Params): Promise<{ data: Product }> => {
		const { id, title, description, productReceiptPoints, category, store } = params.data || {};

		// const storeObj = { id: store };
		// const categoryObj = { id: category };

		const updatedData = {
			title,
			description,
			productReceiptPoints:
				productReceiptPoints !== undefined ? Number(productReceiptPoints) : undefined,
			category,
			store
			// categoryObj,
			// storeObj
		};

		return httpClient(`${apiUrl}/${resource}/${id}`, {
			method: 'PATCH',
			body: JSON.stringify(updatedData)
		}).then(({ json }) => ({ data: { ...updatedData, id: json.id } })) as Promise<{
			data: Product;
		}>;
	},

	updateMany: (resource: string, params: Params): Promise<{ data: Product }> => {
		const query = {
			filter: JSON.stringify({ id: params.ids })
		};
		const url = `${apiUrl}/${resource}?${JSON.stringify(query)}`;

		return httpClient(url, {
			method: 'PUT',
			body: JSON.stringify(params.data)
		}).then(({ json }) => ({ data: json }));
	},

	delete: (resource: string, params: Params): Promise<{ data: Product }> =>
		httpClient(`${apiUrl}/${resource}/${params.id}`, {
			method: 'DELETE'
		}).then(({ json }) => ({ data: json })),

	deleteMany: (resource: string, params: Params): Promise<{ data: string[] | undefined }> => {
		const { ids } = params;
		const url = `${apiUrl}/${resource}/deleteMany`;

		return httpClient(url, {
			method: 'DELETE',
			body: JSON.stringify({ ids })
		}).then(() => ({ data: ids }));
	}
};

export default productResource;
