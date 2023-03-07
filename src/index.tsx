import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import App from './App';

import './styles/reset.css';
import './styles/index.css';

const rootElem = document.getElementById('root');

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
