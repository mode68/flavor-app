import './App.css';
import Layout from './components/Layout/Layout';
import RestaurantFilter from './containers/RestaurantFilter/RestaurantFilter';
import { Route, Switch } from 'react-router-dom';
import RestaurantForm from './components/RestaurantForm/RestaurantForm';

function App() {
	const routes = (
		<Switch>
			<Route path='/add-restaurant'>
				<RestaurantForm />
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
