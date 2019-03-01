import React, { Component } from 'react';
import { Redirect, Route, BrowserRouter, withRouter } from 'react-router-dom';
import ProductsData from './data/products.json';
import 'bootstrap/dist/css/bootstrap.min.css';

const divCenterStyle = {
  margin: '20px auto'
};

const textLeft = {
  textAlign: 'left'
};

class Products extends Component {
  
  //add to receipt list
  addtoList(e){
    e.preventDefault();
    //this.setState({ GST: this.GSTInput.current.value})

  };

  render() {
    return (
      <div class="row">
        <div class="col-4 align-self-center" style={divCenterStyle}>
          <h1> Fake Data </h1> 
          {ProductsData.map((productsDetail, index) =>{ 
            return(
              <form className="align-self-center" onSubmit={(e) => {this.addtoList(e)}}>            
                 <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{productsDetail.product_name} </h5>
                        <small>Price: ${productsDetail.unit_cost}</small>
                      </div>
                      <p class="mb-1" style={textLeft}>Supplier: {productsDetail.supplier}</p>
                    </a>
                    <button type="submit" className="btn btn-primary">add to list</button>              
                  </div>
              </form>
            )})} 
          </div>
      </div>

    )
  }
}

export default withRouter(Products);
