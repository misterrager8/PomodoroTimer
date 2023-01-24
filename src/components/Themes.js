import { useState, useEffect } from 'react';

function Themes() {
	const [theme, setTheme] = useState(localStorage.getItem('PomodoroTimer'));

	const changeTheme = (theme_) => {
		localStorage.setItem('PomodoroTimer', theme_);
		document.documentElement.setAttribute('data-theme', theme_);
	}

	useEffect(() => {
		changeTheme(theme);
	}, []);

	return (
		<div className="btn-group btn-group-sm col-4 offset-4">
			<a className="btn btn-outline-secondary text-capitalize" onClick={() => changeTheme('dark')}><i className="bi bi-paint-bucket"></i> dark</a>
			<a className="btn btn-outline-secondary text-capitalize" onClick={() => changeTheme('light')}><i className="bi bi-paint-bucket"></i> light</a>
			<a className="btn btn-outline-secondary text-capitalize" onClick={() => changeTheme('charcoal')}><i className="bi bi-paint-bucket"></i> charcoal</a>
			<a className="btn btn-outline-secondary text-capitalize" onClick={() => changeTheme('darkgold')}><i className="bi bi-paint-bucket"></i> darkgold</a>
			<a className="btn btn-outline-secondary text-capitalize" onClick={() => changeTheme('oxford')}><i className="bi bi-paint-bucket"></i> oxford</a>
		</div>
		);
}

export default Themes;