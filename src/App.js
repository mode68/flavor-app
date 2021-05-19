import './App.css';
import Layout from './components/Layout/Layout';
import RestaurantFilter from './containers/RestaurantFilter/RestaurantFilter';
import { Route, Switch } from 'react-router-dom';
import RestaurantForm from './components/RestaurantForm/RestaurantForm';
import RestaurantDetails from './containers/RestaurantDetails/RestaurantDetails';
import LoginForm from './containers/LoginForm/LoginForm';

function App() {
	const routes = (
		<Switch>
			<Route path='/restaurant/:id'>
				<RestaurantDetails />
			</Route>
			<Route path='/add-restaurant'>
				<RestaurantForm />
			</Route>
			<Route path='/login'>
				<LoginForm />
			</Route>
			<Route path='/'>
				<RestaurantFilter />
			</Route>
		</Switch>
	);
	return (
		<div className='App'>
			<Layout>{routes}</Layout>
		</div>
	);
}

export default App;
