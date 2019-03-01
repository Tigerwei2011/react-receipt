import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Products from './Products';
import ProductsData from './data/products.json';
import image from './roc.jpg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const divCenterStyle = {
  margin: '20px auto'
};

const textLeft = {
  textAlign: 'left'
};

class App extends Component {

  constructor(props) {
    super(props);

    this.GSTInput = React.createRef();

    this.state ={
                buyItems: ProductsData,   //import json file as initial items of list
                GST: 15, //set default gst value to 15%
                }
  }


//change gst value
  handleChange(e){
    e.preventDefault();
    {this.GSTInput.current.value > 0  &&
      this.setState({ GST: this.GSTInput.current.value})
      };
    }


//add new items into list redirect to products page
  addtoList(index){
    //e.preventDefault();
    
    const newItem = ProductsData[index];      

    this.setState({
      buyItems:[...this.state.buyItems, newItem]
    })
    

  }

  render() {
    const {buyItems} = this.state;
    const newGST = this.state.GST;
    var itemPrices = buyItems.map(function (uprice) {
      return uprice.unit_cost;
    });
    var totalPrice = itemPrices.reduce(function (price, price2) {
      return parseFloat(price, 4) + parseFloat(price2, 4);
    }, 0);
        
    return (
      
        <div className="App">
          <Route path='/Products' Component={Products} />
          <br />
          <img src={image} width="300" alt="logo"/>
          <h1>Receipt</h1>
          <div className="row">
            <div className="col-6" style={divCenterStyle}>
               
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Item</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    buyItems.map((item, index) =>{
                      return(
                        <tr key={index}>
                          <th scope="row">{index+1}</th>
                          <td>{item.product_name}</td>                        
                          <td>${item.unit_cost}</td>
                        </tr>
                      )
                    })
                  }
                  
                    <tr>
                      <th scope="col">Total: </th>
                      <td scope="col">&nbsp;&nbsp;</td>
                      <td scope="col">${totalPrice}</td>
                    </tr>
                    <tr>
                      <th scope="col">Total incl GST: </th>
                      <td scope="col">{newGST}% </td>
                      <td scope="col">${(totalPrice*(1+(newGST/100))).toFixed(2)}</td>
                    </tr>
                  
                  </tbody>
                </table>
              

                <form className="align-self-center" style={divCenterStyle} onSubmit={(e) => {this.handleChange(e)}}>
                  <div className="from-group form-inline align-items-end">
                      <input ref={this.GSTInput} type="text" placeholder="default GST : 15%" className="form-control" id="GSTInput"/>
                      <button type="submit" className="btn btn-info"> Change GST</button>
                  </div>
                </form>

                 {this.state.topbarLinks}

                <div className="row">
                  <div className="col-6 align-self-center" style={divCenterStyle}>
                    <h1> Fake Data </h1> 
                    {ProductsData.map((products, index) =>{ 
                        return(
                        <form className="align-self-center" onSubmit={(e) => {this.addtoList(index)}}>            
                           <div className="list-group">
                              <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-between">
                                  <h5 className="mb-1" >{products.product_name} </h5>
                                  <small className="text-danger">Price: ${products.unit_cost}</small>
                                </div>
                                <p className="mb-1" style={textLeft}>Supplier: {products.supplier}</p>
                              </a>
                              <button type="submit" className="btn btn-primary">add to list</button>              
                            </div>
                        </form>
                      )})} 
                    </div>
                </div>

              </div>
            </div>       
        </div>
      
    );
  }
}

export default App;
