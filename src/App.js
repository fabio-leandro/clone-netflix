import { useEffect, useState } from 'react';
import './App.css';
import FeaturedMovie from './components/featuredmovie/FeaturedMovie';
import Header from './components/header/Header';
import MovieRow from './components/movierow/MovieRow';
import Tmdb from './tmdb/Tmdb';

function App() {

  const [movieList,setMovieList] = useState([]);
  const [featuredData,setFeaturedData] = useState(null);
  const [blackHeader,setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list)

      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id,'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll()
  },[]);

  useEffect(()=>{

    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }

     window.addEventListener('scroll',scrollListener);
    return () => {
      window.removeEventListener('scroll',scrollListener);
    }

  },[]);



  return (
    <div className="page">

      <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }
      <section className='lists'>
        {movieList.map((item,key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
          Feito para fins de aprendizado.<br/>
          Referência: Canal no Youtube Bonieky Lacerda.<br/>
          Todos os direitos para Netflix.<br/>
          Os dados foram tirados do site do TMDB.<br/>
      </footer>
    </div>
  );
}

export default App;
