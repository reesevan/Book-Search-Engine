import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
function App() {
    return (<>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
    </>);
}
export default App;
