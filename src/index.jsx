import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './services/reducers/rootReducer';

const ingridientsUrl = 'https://norma.nomoreparties.space/api/ingredients';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App ingridientsUrl={ingridientsUrl}/>
  </Provider>
);