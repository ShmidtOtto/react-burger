import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './services/reducers/rootReducer';
import { BrowserRouter } from 'react-router-dom';

const ingredientsUrl = 'https://norma.nomoreparties.space/api/ingredients';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App ingredientsUrl={ingredientsUrl}/>
    </BrowserRouter>
  </Provider>
);