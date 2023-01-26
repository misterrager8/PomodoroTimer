import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import $ from 'jquery';
import './App.css'

import Themes from './components/Themes';
import Timer from './components/Timer';

function App() {
	return (
		<div>
			<div className="p-5">
				<Themes/>
				<div className="mt-3"><Timer/></div>
			</div>
		</div>
		);
}

export default App;