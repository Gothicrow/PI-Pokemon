import {Route} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import PokeDetails from './components/Pokemon/PokeDetails';
import Form from './components/Form/Form';

function App() {
  return (
    <div className="App">
      <Route path='/' exact component={LandingPage}/>
      <Route path='/home' exact component={Home}/>
      <Route path='/home/:id' component={PokeDetails}/>
      <Route path='/create/pokemon' component={Form}/>
    </div>
  );
}

export default App;
