import { File } from 'buffer';
import { RaRecord, SortPayload } from 'react-admin';

export interface Params {
	pagination: {
		page: number;
		perPage: number;
	};
	sort?: SortPayload;
	filter?: RaRecord;
	target?: string;
	id?: string;
	data?: User | Store | Product | Category | CommonEntityProps;
	ids?: string[];
	storePhoto?: {
		rawFile: File;
		src?: string;
		title?: string;
	};
}

export type CommonEntityProps = {
	id: string;
	createdAt: Date;
	updatedAt: string;
	status: ReceiptStatus;
	currentPoints?: number;
	amountRedeemed?: number;
	address: string;
	title: string;
	description: string;
	birthDate: Date;
	city: string;
	email: string;
	fcmToken: string;
	firebaseId: number;
	firstName: string;
	isActive: boolean;
	isAdmin: boolean;
	lastLoggedIn: Date;
	lastName: string;
	password: string;
	phoneNumber: string;
	picture: string;
	refreshToken: string;
	signupMethod: string;
	state: string;
	underage: boolean;
	user: User;
	store: Store;
	category: Category;
	approvedBy?: User;
	products: Product[];
	image: string | null;
	foursquareId?: string | null;
	name?: string;
	latitude?: number | null;
	longitude?: number | null;
	formatted_address?: string;
	cross_street?: string;
	country?: string;
	locality?: string;
	postCode?: string;
	region?: string;
	timezone?: string;
	storeCheckInPoints?: number;
	storeReceiptPoints?: number;
	productReceiptPoints?: number;
	inStorePartner?: boolean;
	storePhoto?: {
		rawFile: File;
		src?: string;
		title?: string;
	};
};

export type UserListResponse = {
	status: number;
	headers: Headers;
	body: string;
	json: User;
};

export type ListResponse = {
	status: number;
	headers: Headers;
	body: string;
	json: Store;
};

export type ProductListResponse = {
	status: number;
	headers: Headers;
	body: string;
	json: Product;
};

export type CategoryListResponse = {
	status: number;
	headers: Headers;
	body: string;
	json: Category;
};

export type OCR_ScanListResponse = {
	status: number;
	headers: Headers;
	body: string;
	json: OCR_SCAN;
};

export type ReceiptStatus = {
	APPROVED: 'approved';
	REJECTED: 'rejected';
	PENDING: 'pending';
};

export type User = {
	address: string;
	birthDate: Date;
	city: string;
	createdAt: Date;
	email: string;
	fcmToken: string;
	firebaseId: number;
	firstName: string;
	id: string;
	isActive: boolean;
	isAdmin: boolean;
	lastLoggedIn: Date;
	lastName: string;
	password: string;
	phoneNumber: string;
	picture: string;
	refreshToken: string;
	signupMethod: string;
	state: string;
	currentPoints: number;
	underage: boolean;
	updatedAt: string;
} & CommonEntityProps;

export type Store = {
	id: string;
	user: User;
	foursquareId?: string | null;
	name?: string;
	latitude?: number | null;
	longitude?: number | null;
	address?: string;
	formatted_address?: string;
	cross_street?: string;
	country?: string;
	locality?: string;
	postCode?: string;
	region?: string;
	timezone?: string;
	isActive?: boolean;
	storeCheckInPoints?: number;
	storeReceiptPoints?: number;
	inStorePartner?: boolean;
	storePhoto?: {
		rawFile: File;
		src?: string;
		title?: string;
	};
	products: Product[];
} & CommonEntityProps;

export type Product = {
	id: string;
	title: string;
	productReceiptPoints: number;
	description: string;
	isActive: boolean;
	user: User;
	category: Category | null;
	store: Store;
} & CommonEntityProps;

export type Category = {
	name: string;
	isActive: boolean;
	createdAt: Date;
	products: Product[];
} & CommonEntityProps;

export type OCR_SCAN = {
	id: string;
	image: string | null;
	isActive: boolean;
	status: ReceiptStatus;
	approvedBy?: User;
	user: User;
	products: Product[];
	store: Store;
} & CommonEntityProps;
