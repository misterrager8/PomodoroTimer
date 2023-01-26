import { useState, useEffect } from 'react';

function Themes() {
	const [theme, setTheme] = useState(localStorage.getItem('PomodoroTimer'));

	const changeTheme = (theme_) => {
		localStorage.setItem('PomodoroTimer', theme_);
		document.documentElement.setAttribute('data-theme', theme_);
		setTheme(theme_);
	}

	useEffect(() => {
		changeTheme(theme);
	}, []);

	return (
		<div className="">
			<a className="btn btn-sm btn-outline-secondary text-capitalize dropdown-toggle" data-bs-target="#themes" data-bs-toggle="dropdown"><i className="bi bi-paint-bucket"></i> {theme}</a>
			<div className="dropdown-menu text-center" id="themes">
				<a className="dropdown-item text-capitalize" onClick={() => changeTheme('dark')}> dark</a>
				<a className="dropdown-item text-capitalize" onClick={() => changeTheme('light')}> light</a>
				<a className="dropdown-item text-capitalize" onClick={() => changeTheme('charcoal')}> charcoal</a>
				<a className="dropdown-item text-capitalize" onClick={() => changeTheme('pine')}> pine</a>
				<a className="dropdown-item text-capitalize" onClick={() => changeTheme('maroon')}> maroon</a>
				<a className="dropdown-item text-capitalize" onClick={() => changeTheme('deepspace')}> deepspace</a>
			</div>
		</div>
		);
}

export default Themes;