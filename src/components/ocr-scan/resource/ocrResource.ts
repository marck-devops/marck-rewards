import { fetchUtils } from 'react-admin';
import { Params, OCR_ScanListResponse, OCR_SCAN } from '../../../constants/dataTypes';

const apiUrl = import.meta.env.VITE_BASE_URL;

const httpClient = (url: string, options: RequestInit = {}): Promise<OCR_ScanListResponse> => {
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

const ocrScanResource = {
	getList: (resource: string, params: Params): Promise<OCR_SCAN> => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort || { field: 'id', order: 'ASC' };
		const url = `${apiUrl}/ocr_scan?page=${page}&perPage=${perPage}&sort=${field}:${order}`;
		return httpClient(url).then(({ json }) => json);
	},

	getOne: (resource: string, params: Params): Promise<{ data: OCR_SCAN }> => {
		const url = `${apiUrl}/ocr_scan/${params.id}`;
		return httpClient(url).then(({ json }) => ({ data: { ...json, id: json.id } }));
	},

	getMany: (resource: string, params: Params): Promise<{ data: OCR_SCAN }> => {
		const query = {
			filter: JSON.stringify({ id: params.ids })
		};
		const url = `${apiUrl}/ocr_scan/search?id=${JSON.stringify(query)}`;
		return httpClient(url).then(({ json }) => ({ data: json }));
	},

	getManyReference: (
		resource: string,
		params: Params
	): Promise<{ data: OCR_SCAN; total: number }> => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort || { field: 'id', order: 'ASC' };
		const query: Record<string, string | number> = {
			...params.filter,
			[params.target as string]: params.id,
			sort: JSON.stringify([field, order]),
			range: JSON.stringify([(page - 1) * perPage, page * perPage - 1])
		};

		const url = `${apiUrl}/ocr_scan?${JSON.stringify(query)}`;

		return httpClient(url).then(({ headers, json }) => {
			const total = headers.get('content-range')?.split('/').pop() || '';
			return {
				data: json,
				total: parseInt(total, 10)
			};
		});
	},

	create: (resource: string, params: Params): Promise<{ data: Partial<OCR_SCAN> }> => {
		const { ...restData } = params.data || {};

		const numericData = {
			...restData
		};

		const url = `${apiUrl}/ocr_scan`;

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

	update: (resource: string, params: Params): Promise<{ data: OCR_SCAN }> => {
		const { id, status } = params.data || {};
		const updatedData = { status };

		return httpClient(`${apiUrl}/${resource}/${id}/update-status-and-award-points`, {
			method: 'PATCH',
			body: JSON.stringify(updatedData)
		}).then(({ json }) => ({ data: { ...updatedData, id: json.id } })) as Promise<{
			data: OCR_SCAN;
		}>;
	},

	updateMany: (resource: string, params: Params): Promise<{ data: OCR_SCAN }> => {
		const query = {
			filter: JSON.stringify({ id: params.ids })
		};
		const url = `${apiUrl}/${resource}?${JSON.stringify(query)}`;

		return httpClient(url, {
			method: 'PUT',
			body: JSON.stringify(params.data)
		}).then(({ json }) => ({ data: json }));
	},

	delete: (resource: string, params: Params): Promise<{ data: OCR_SCAN }> =>
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

export default ocrScanResource;
