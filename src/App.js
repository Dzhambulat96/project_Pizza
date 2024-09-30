import logo from './logo.svg';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizaBlock from './components/PizaBlock';

import './scss/app.scss';
import PizzaBlock from './components/PizaBlock';

import pizzas from './assets/pizzas.json';




function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((obj) => (
              <PizzaBlock {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
