import './App.css';
import Admin from './components/GET_products/adminComp';
import PostProduct from './components/POST_products/Post_product';

export const App = () => {
  return (
    <div>
        <Admin />
        <PostProduct />
    </div>
  )
}


export default App;