import { Offline } from 'react-detect-offline';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import UserDataContextProvider from './Context/Store';
import router from './router/router';

function App() {
  return <>

    <Offline>
      <div className='alert alert-warning text-capitalize text-center' role="alert">
        you are offline
      </div>
    </Offline>

    <UserDataContextProvider>
      <RouterProvider router={router} />
    </UserDataContextProvider>

  </>
}

export default App;