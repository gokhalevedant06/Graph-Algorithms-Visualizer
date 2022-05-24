import './App.css';
import PathFinder from './Components/PathFinder';
import {Provider} from 'react-redux'
import store from './Redux/store'
import { selectData } from "./Redux/slice";
import { useSelector } from "react-redux";
function App() {
  // const user = useSelector(isLoggedIn);

  return (
    <>
    <Provider store={store}>
    <PathFinder/>
    </Provider>
    
    </>
  );
}

export default App;
