import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { getStep } from './service';

ReactDOM.render(<App />, document.getElementById('root'));
getStep().then(x => console.info(x));
