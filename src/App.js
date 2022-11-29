import './App.css';
import PathFinder from './Components/PathFinder';
import {Provider} from 'react-redux'
import { store } from "./Redux/store";
function App() {

  return (
    <>
    <Provider store={store}>
    <PathFinder/>
    </Provider>
    
    </>
  );
}

export default App;
