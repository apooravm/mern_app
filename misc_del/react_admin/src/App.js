import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {prodArray: []};
  }

  componentDidMount() {
    this.GET_Products();
  }

  GET_Products() {
    axios.get('http://localhost:5000/api/product')
      .then(response => {
        this.setState({ prodArray: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  POST_Products() {
    axios.post('http://localhost:5000/api/product')
      .then(response => {
        this.setState({ prodArray: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {this.state.prodArray.map((product) => (
          <div className='mainUser'>
            <div>
              {product._id}: 
            </div>
            {product.title}
            <br></br>
          </div>
        ))}
      </div>
    );
  }
}


export default App;

// {"_id":"63d410ebf04180823d5964ca","title":"Nike t-shirt","description":"test-Description","image":"test-Image",
// "category":["t-shirt","man"],"size":"L","colour":"Red","price":30,
// "createdAt":"2023-01-27T17:59:07.825Z","updatedAt":"2023-01-27T17:59:07.825Z","__v":0}