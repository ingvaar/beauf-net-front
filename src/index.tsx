import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';
import { store } from './features/store';
import App from './App';
import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
