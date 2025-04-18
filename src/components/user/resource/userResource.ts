import { fetchUtils } from 'react-admin';
import { Params, User, UserListResponse } from '../../../constants/dataTypes';

const apiUrl = import.meta.env.VITE_BASE_URL;

const httpClient = (url: string, options: RequestInit = {}): Promise<UserListResponse> => {
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

const userResource = {
	getList: (resource: string, params: Params): Promise<User> => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort || { field: 'id', order: 'ASC' };

		const url = `${apiUrl}/user?page=${page}&perPage=${perPage}&sort=${field}:${order}`;
		return httpClient(url).then(({ json }) => json);
	},

	getOne: (resource: string, params: Params): Promise<{ data: User }> => {
		const url = `${apiUrl}/user/search?id=${params.id}`;

		return httpClient(url).then(({ json }) => ({ data: { ...json, id: json.id } }));
	},

	getMany: (resource: string, params: Params): Promise<{ data: User }> => {
		const query = {
			filter: JSON.stringify({ id: params.ids })
		};
		const url = `${apiUrl}/user/search?id=${JSON.stringify(query)}`;

		return httpClient(url).then(({ json }) => ({ data: json }));
	},

	getManyReference: (resource: string, params: Params): Promise<{ data: User; total: number }> => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort || { field: 'id', order: 'ASC' };
		const query: Record<string, string | number> = {
			...params.filter,
			[params.target as string]: params.id,
			sort: JSON.stringify([field, order]),
			range: JSON.stringify([(page - 1) * perPage, page * perPage - 1])
		};

		const url = `${apiUrl}/user?${JSON.stringify(query)}`;

		return httpClient(url).then(({ headers, json }) => {
			const total = headers.get('content-range')?.split('/').pop() || '';
			return {
				data: json,
				total: parseInt(total, 10)
			};
		});
	},

	create: (resource: string, params: Params): Promise<{ data: Partial<User> }> => {
		const { ...restData } = params.data || {};

		const numericData = {
			...restData
		};

		const url = `${apiUrl}/user/create`;

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

	update: (resource: string, params: Params): Promise<{ data: User }> => {
		const {
			id,
			firstName,
			lastName,
			email,
			city,
			state,
			address,
			phoneNumber,
			currentPoints,
			isActive,
			isAdmin,
			user
		} = params.data || {};
		const updatedData = {
			firstName,
			lastName,
			email,
			city,
			state,
			address,
			phoneNumber,
			currentPoints: Number(currentPoints),
			isActive,
			isAdmin,
			user
		};

		return httpClient(`${apiUrl}/${resource}/${id}`, {
			method: 'PATCH',
			body: JSON.stringify(updatedData)
		}).then(({ json }) => ({ data: { ...updatedData, id: json.id } })) as Promise<{
			data: User;
		}>;
	},

	updateMany: (resource: string, params: Params): Promise<{ data: User }> => {
		const query = {
			filter: JSON.stringify({ id: params.ids })
		};
		const url = `${apiUrl}/${resource}?${JSON.stringify(query)}`;

		return httpClient(url, {
			method: 'PUT',
			body: JSON.stringify(params.data)
		}).then(({ json }) => ({ data: json }));
	},

	delete: (resource: string, params: Params): Promise<{ data: User }> =>
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

export default userResource;
