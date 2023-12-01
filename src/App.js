import { useEffect, useState } from "react"

function App() {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [products,setProducts] = useState([])
  const [sortOption, setSortOption] = useState('priceLowToHigh');

    useEffect(()=>{
      const fetchData = async()=>{
        try{
          const response = await fetch('https://fakestoreapi.com/products')
          const data = await response.json()
          setProducts(data)
        }
        catch(err){
          console.log(err)
        }
      }
  
      fetchData();
    },[])


    const filterAndSortProducts = () => {
      let filteredProduct = products;
      if (categoryFilter !== 'All') {
        filteredProduct = filteredProduct.filter(product => product.category === categoryFilter);
      }

      switch (sortOption) {
        case 'priceLowToHigh':
          filteredProduct.sort((a, b) => a.price - b.price);
          break;
        case 'priceHighToLow':
          filteredProduct.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          filteredProduct.sort((a, b) => b.id - a.id);
          break;
        default:
          break;
      }

      return filteredProduct;
    }

  return (
    
    <div >
      <h1>ShopNow</h1>
      <div className="row">
          <div className="col-2 sidebar">
              <h2>Filters</h2>
              <h3>Category</h3>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option value="All">All</option>
                  <option value="men's clothing">men's clothing</option>
                  <option value="jewelery">jewelery</option>
                  <option value="electronics">electronics</option>women's clothing
                  <option value="women's clothing">women's clothing</option>
              </select>

              <h3>Price</h3>
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="priceLowToHigh">Price Low to High</option>
                <option value="priceHighToLow">Price High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
          </div>
          
          <div className="col-10 product-box">
            <ul>
              {filterAndSortProducts().map((product) => (
                <li key={product.id}>
                  <div><img src={product.image} alt={product.title}/></div>
                  <p>{product.title}</p>
                  <h4>{product.category}</h4>
                  <h5>{product.price}</h5>
                </li>
              ))}
            </ul>
          </div>
      </div>
    </div>
  );
}

export default App;
