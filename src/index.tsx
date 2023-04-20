import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import App from './App';
import './firebase';

import './styles/reset.css';
import './styles/index.css';

const rootElem = document.getElementById('root');

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);

  root.render(
    <BrowserRouter basename="/dictionary">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}
