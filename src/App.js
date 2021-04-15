import './App.css';
import Layout from './components/Layout/Layout';
import RestaurantFilter from './containers/RestaurantFilter/RestaurantFilter';

function App() {
	return (
		<div className='App'>
			<Layout>
				<RestaurantFilter />
			</Layout>
		</div>
	);
}

export default App;
