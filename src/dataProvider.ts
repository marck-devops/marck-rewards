import categoryResource from './components/category/resource/categoryResource';
import ocrScanResource from './components/ocr-scan/resource/ocrResource';
import productResource from './components/product/resource/productResource';
import storeResource from './components/store/resource/storeResource';
import userResource from './components/user/resource/userResource';
import { Params } from './constants/dataTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dataProvider: any = {
	getList: (resource: string, params: Params) => {
		switch (resource) {
			case 'user':
				return userResource.getList(resource, params);

			case 'store':
				return storeResource.getList(resource, params);

			case 'product':
				return productResource.getList(resource, params);

			case 'category':
				return categoryResource.getList(resource, params);

			case 'ocr_scan':
				return ocrScanResource.getList(resource, params);

			default:
				return Promise.reject(`Unsupported resource: ${resource}`);
		}
	},

	getOne: (resource: string, params: Params) => {
		switch (resource) {
			case 'user':
				return userResource.getOne(resource, params);

			case 'store':
				return storeResource.getOne(resource, params);

			case 'product':
				return productResource.getOne(resource, params);

			case 'category':
				return categoryResource.getOne(resource, params);

			case 'ocr_scan':
				return ocrScanResource.getOne(resource, params);

			default:
				return Promise.reject(`Unsupported resource: ${resource}`);
		}
	},

	getMany: (resource: string, params: Params) => {
		switch (resource) {
			case 'user':
				return userResource.getMany(resource, params);

			case 'store':
				return storeResource.getMany(resource, params);

			case 'product':
				return productResource.getMany(resource, params);

			case 'category':
				return categoryResource.getMany(resource, params);

			default:
				return Promise.reject(`Unsupported resource: ${resource}`);
		}
	},

	getManyReference: (resource: string, params: Params) => {
		switch (resource) {
			case 'user':
				return userResource.getManyReference(resource, params);

			case 'store':
				return storeResource.getManyReference(resource, params);

			case 'product':
				return productResource.getManyReference(resource, params);

			case 'category':
				return categoryResource.getManyReference(resource, params);

			default:
				return Promise.reject(`Unsupported resource: ${resource}`);
		}
	},

	create: (resource: string, params: Params) => {
		switch (resource) {
			case 'user':
				return userResource.create(resource, params);

			case 'store':
				return storeResource.create(resource, params);

			case 'product':
				return productResource.create(resource, params);

			case 'category':
				return categoryResource.create(resource, params);

			default:
				return Promise.reject(`Unsupported resource: ${resource}`);
		}
	},

	update: (resource: string, params: Params) => {
		switch (resource) {
			case 'user':
				return userResource.update(resource, params);

			case 'store':
				return storeResource.update(resource, params);

			case 'product':
				return productResource.update(resource, params);

			case 'category':
				return categoryResource.update(resource, params);

			case 'ocr_scan':
				return ocrScanResource.update(resource, params);

			default:
				return Promise.reject(`Unsupported resource: ${resource}`);
		}
	},

	updateMany: (resource: string, params: Params) => {
		switch (resource) {
			case 'user':
				return userResource.updateMany(resource, params);

			case 'store':
				return storeResource.updateMany(resource, params);

			case 'product':
				return productResource.updateMany(resource, params);

			case 'category':
				return categoryResource.updateMany(resource, params);

			case 'ocr_scan':
				return ocrScanResource.updateMany(resource, params);

			default:
				return Promise.reject(`Unsupported resource: ${resource}`);
		}
	},

	delete: (resource: string, params: Params) => {
		switch (resource) {
			case 'user':
				return userResource.delete(resource, params);

			case 'store':
				return storeResource.delete(resource, params);

			case 'product':
				return productResource.delete(resource, params);

			case 'category':
				return categoryResource.delete(resource, params);

			default:
				return Promise.reject(`Unsupported resource: ${resource}`);
		}
	},

	deleteMany: (resource: string, params: Params) => {
		switch (resource) {
			case 'user':
				return userResource.deleteMany(resource, params);

			case 'store':
				return storeResource.deleteMany(resource, params);

			case 'product':
				return productResource.deleteMany(resource, params);

			case 'category':
				return categoryResource.deleteMany(resource, params);

			default:
				return Promise.reject(`Unsupported resource: ${resource}`);
		}
	}
};
