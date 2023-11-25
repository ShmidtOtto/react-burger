import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const ingridientsUrl = 'https://norma.nomoreparties.space/api/ingredients';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App ingridientsUrl={ingridientsUrl}/>
  </>
);