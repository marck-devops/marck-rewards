import { fetchUtils, AuthProvider, HttpError } from 'react-admin';

const apiUrl = import.meta.env.VITE_BASE_URL;

export const authProvider: AuthProvider = {
	login: ({ username, password }) => {
		return fetchUtils
			.fetchJson(`${apiUrl}/auth/signin`, {
				method: 'POST',
				body: JSON.stringify({ email: username, password })
			})
			.then(({ json }) => {
				const { userToken } = json;
				if (userToken && userToken.accessToken) {
					const { accessToken } = userToken;
					localStorage.setItem('user', JSON.stringify({ accessToken: accessToken }));
					return Promise.resolve();
				} else {
					return Promise.reject(
						new HttpError('Invalid Response', 500, 'Token is missing or undefined.')
					);
				}
			})
			.catch((error) => {
				if (error.status === 401) {
					return Promise.reject(new HttpError('Unauthorized', 401, 'Invalid username or password'));
				} else {
					return Promise.reject(new HttpError('Error', error.status, error.body));
				}
			});
	},
	logout: () => {
		localStorage.removeItem('user');
		return Promise.resolve();
	},
	checkError: () => Promise.resolve(),
	checkAuth: () => (localStorage.getItem('user') ? Promise.resolve() : Promise.reject()),
	getPermissions: () => {
		return Promise.resolve(undefined);
	},
	getIdentity: () => {
		const persistedUser = localStorage.getItem('user');
		const user = persistedUser ? JSON.parse(persistedUser) : null;

		return Promise.resolve(user);
	}
};

export default authProvider;
