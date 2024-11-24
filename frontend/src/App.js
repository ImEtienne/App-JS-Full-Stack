import './App.css';
import ProductList from './components/ProductList';
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Header/>
      <h1>Liste des Produits</h1>
      <ProductList />
    </div>
  );
}

export default App;
