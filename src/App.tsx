import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterConfig } from './routes';

function App() {
  return (
    <div>
      <RouterConfig />
      <ToastContainer />
    </div>
  );
}

export default App;
