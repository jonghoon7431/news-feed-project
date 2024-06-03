// src/App.jsx

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import GlobalStyle from './components/globalstyle/GlobalStyle';
import router from './shared/Router'; // router 임포트
import store from './redux/config/configStore';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
