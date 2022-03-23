import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Weather from './component/Weather';
import Header from './component/Header';

import {
	BrowserRouter,
	Routes,
	Route
} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route exact path='/' element={<App />}></Route>
        <Route path='/weather' element={<Weather/>}></Route>
    </Routes>

  </BrowserRouter>,
  document.getElementById('root')
);
