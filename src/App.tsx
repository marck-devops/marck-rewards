import React from 'react';
import { Admin, Resource, radiantLightTheme, radiantDarkTheme } from 'react-admin';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';
import UserList from './components/user/UserList';
import UserCreate from './components/user/UserCreate';
import UserEdit from './components/user/UserEdit';
import StoreList from './components/store/StoreList';
import StoreCreate from './components/store/StoreCreate';
import StoreEdit from './components/store/StoreEdit';
import ProductList from './components/product/ProductList';
import ProductCreate from './components/product/ProductCreate';
import ProductEdit from './components/product/ProductEdit';
import CategoryList from './components/category/CategoryList';
import CategoryCreate from './components/category/CategoryCreate';
import CategoryEdit from './components/category/CategoryEdit';
import StoreShow from './components/store/StoreShow';
import OcrList from './components/ocr-scan/OcrList';
import OcrShow from './components/ocr-scan/OcrShow';
import { BrowserRouter } from 'react-router-dom';

export const App = () => (
	<BrowserRouter>
		<Admin
			dataProvider={dataProvider}
			authProvider={authProvider}
			theme={radiantLightTheme}
			darkTheme={radiantDarkTheme}
		>
			<Resource name='user' list={UserList} create={UserCreate} edit={UserEdit} />
			<Resource
				name='store'
				list={StoreList}
				create={StoreCreate}
				edit={StoreEdit}
				show={StoreShow}
			/>
			<Resource
				name='product'
				list={ProductList}
				create={(props) => <ProductCreate {...props} dataProvider={dataProvider} />}
				edit={(props) => <ProductEdit {...props} dataProvider={dataProvider} />}
			/>
			<Resource name='category' list={CategoryList} create={CategoryCreate} edit={CategoryEdit} />
			<Resource name='ocr_scan' list={OcrList} show={OcrShow} />
		</Admin>
	</BrowserRouter>
);
