import { RouterProvider } from 'react-router-dom';
import GlobalStyle from './components/globalstyle/GlobalStyle';
import router from './shared/Router';

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
