import { useEffect } from 'react';
import './App.css';
import Tmdb from './tmdb/Tmdb';

function App() {

  useEffect(()=>{
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      console.log(list)
    }

    loadAll()
  },[]);


  return (
    <div className="App">
      <p>HELLO WORLD</p>
    </div>
  );
}

export default App;
