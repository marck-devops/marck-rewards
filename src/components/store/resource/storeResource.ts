import { fetchUtils } from 'react-admin';
import { Params, Store, ListResponse } from '../../../constants/dataTypes';

const apiUrl = import.meta.env.VITE_BASE_URL;

const httpClient = (url: string, options: RequestInit = {}): Promise<ListResponse> => {
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

const storeResource = {
	getList: (resource: string, params: Params): Promise<Store> => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort || { field: 'id', order: 'ASC' };
		const url = `${apiUrl}/store?page=${page}&perPage=${perPage}&sort=${field}:${order}`;

		return httpClient(url).then(({ json }) => json);
	},

	getOne: (resource: string, params: Params): Promise<{ data: Store }> => {
		const url = `${apiUrl}/store/${params.id}`;
		return httpClient(url).then(({ json }) => ({ data: { ...json, id: json.id } }));
	},

	getMany: (resource: string, params: Params): Promise<{ data: Store }> => {
		const query = {
			filter: JSON.stringify({ id: params.ids })
		};
		const url = `${apiUrl}/store/search?id=${JSON.stringify(query)}`;

		return httpClient(url).then(({ json }) => ({ data: json }));
	},

	getManyReference: (resource: string, params: Params): Promise<{ data: Store; total: number }> => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort || { field: 'id', order: 'ASC' };
		const query: Record<string, string | number> = {
			...params.filter,
			[params.target as string]: params.id,
			sort: JSON.stringify([field, order]),
			range: JSON.stringify([(page - 1) * perPage, page * perPage - 1])
		};

		const url = `${apiUrl}/store?${JSON.stringify(query)}`;

		return httpClient(url).then(({ headers, json }) => {
			const total = headers.get('content-range')?.split('/').pop() || '';
			return {
				data: json,
				total: parseInt(total, 10)
			};
		});
	},

	create: (resource: string, params: Params): Promise<{ data: Partial<Store> }> => {
		const { storePhoto, storeCheckInPoints, storeReceiptPoints, latitude, longitude, ...restData } =
			params.data || {};

		const numericData = {
			...restData,
			storePhoto,
			storeCheckInPoints: storeCheckInPoints ? Number(storeCheckInPoints) : undefined,
			storeReceiptPoints: storeReceiptPoints ? Number(storeReceiptPoints) : undefined,
			latitude: latitude ? Number(latitude) : undefined,
			longitude: longitude ? Number(longitude) : undefined
		};
		const url = `${apiUrl}/store`;

		const file = storePhoto && storePhoto['rawFile'];

		if (file instanceof File) {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('type', file.type);

			return httpClient(`${apiUrl}/upload`, {
				body: formData,
				method: 'POST',
				headers: new Headers({})
			})
				.then((uploadResponse) => {
					// After uploading the file, create the user/store entity with the returned data
					return httpClient(url, {
						method: 'POST',
						body: JSON.stringify({
							...numericData,
							storePhoto: uploadResponse.body
						})
					});
				})
				.then(({ json }) => {
					return { data: { ...numericData, id: json.id } };
				});
		} else {
			// If no file to upload, simply create the store entity
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
		}
	},

	update: (resource: string, params: Params): Promise<{ data: Store }> => {
		const {
			id,
			address,
			foursquareId,
			name,
			latitude,
			longitude,
			postCode,
			region,
			timezone,
			storeCheckInPoints,
			storeReceiptPoints,
			inStorePartner,
			storePhoto,
			user,
			formatted_address,
			cross_street,
			country,
			locality
		} = params.data || {};

		const updatedData = {
			storePhoto,
			storeCheckInPoints: storeCheckInPoints !== undefined ? Number(storeCheckInPoints) : undefined,
			storeReceiptPoints: storeReceiptPoints !== undefined ? Number(storeReceiptPoints) : undefined,
			inStorePartner,
			address,
			name,
			foursquareId,
			latitude: latitude ? Number(latitude) : undefined,
			longitude: longitude ? Number(longitude) : undefined,
			postCode,
			region,
			timezone,
			formatted_address,
			cross_street,
			country,
			locality,
			user
		};

		const file = storePhoto && storePhoto['rawFile'];

		if (file instanceof File) {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('type', file.type);

			return httpClient(`${apiUrl}/upload`, {
				body: formData,
				method: 'POST',
				headers: new Headers({})
			})
				.then((uploadResponse) => {
					// After uploading the file, create the user/store entity with the returned data
					return httpClient(`${apiUrl}/${resource}/${id}`, {
						method: 'PATCH',
						body: JSON.stringify({
							...updatedData,
							storePhoto: uploadResponse.body
						})
					});
				})
				.then(({ json }) => {
					return { data: { ...updatedData, id: json.id } };
				}) as Promise<{
				data: Store;
			}>;
		} else {
			// If no new storePhoto, update other fields without FormData
			return httpClient(`${apiUrl}/${resource}/${id}`, {
				method: 'PATCH',
				body: JSON.stringify(updatedData),
				headers: new Headers({ 'Content-Type': 'application/json' })
			}).then(({ json }) => ({ data: { ...updatedData, id: json.id } })) as Promise<{
				data: Store;
			}>;
		}
	},

	updateMany: (resource: string, params: Params): Promise<{ data: Store }> => {
		const query = {
			filter: JSON.stringify({ id: params.ids })
		};
		const url = `${apiUrl}/${resource}?${JSON.stringify(query)}`;

		return httpClient(url, {
			method: 'PUT',
			body: JSON.stringify(params.data)
		}).then(({ json }) => ({ data: json }));
	},

	delete: (resource: string, params: Params): Promise<{ data: Store }> =>
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

export default storeResource;
