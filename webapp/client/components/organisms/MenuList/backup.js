import React, { useState } from 'react'
import { useHistory ,Link, useParams } from 'react-router-dom'
import R, { identity } from 'ramda'
import './App.scss'
import axios from 'axios'

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import 'bootstrap/dist/css/bootstrap.min.css'
import { browserHistory , withRouter } from 'react-router'
import Button from 'react-bulma-companion/lib/Button'
import { Col, Row } from 'react-bootstrap'
import { push } from 'react-router-redux';
import { Redirect } from 'react-router'
import MyOrders  from '../../pages/MyOrders';

// const dispatch = useDispatch()
let productList = [{}]
let menu =[]
let total1 =0

const { user } = R.pick(['user'])
console.log("UU ", user)


const containerStyle = {
  width: '250px',
  height: '250px',
}

const center = {
  lat: -3.745,
  lng: -38.523,
}

function test(){

  console.log("Test cakked")
}
function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCVC0lORAnjYEPClZpa5vB19IGbwRbkdxg',
  })
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  )
}
/* Product */
class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      qty: 0,
     
    }
    this.add = this.add.bind(this)
    this.subtract = this.subtract.bind(this)
    this.showInfo = this.showInfo.bind(this)
  }

  add() {
    this.setState({
      qty: parseInt(this.state.qty) + 1,
    })
    console.log('add ', this)
    this.props.handleTotal(this.props.price)
    let name = this.props.name
    let q  = this.state.qty
   let flag = false;
    menu.forEach(function (item){
      console.log("ff ", item.itemName)
      console.log("ff111 ", name)

      if(item.itemName === name){
        console.log("It already exists")
        item.quantity = item.quantity+1

        flag = true
      }
     
    })
     if(!flag){
        menu.push({"itemName": this.props.name,"quantity":this.state.qty+1})
      }
      flag = false;
      console.log("mm ", menu)
    
  }

  subtract() {
    this.setState({
      qty: this.state.qty - 1,
    })
    this.props.handleTotal(-this.props.price)
    let name = this.props.name

   
    for(var i =0 ; i < menu.length; i++){
      if(menu[i].itemName === name){
        if(menu[i].quantity ==1 ){
         menu.splice(i,1)
        }else{
          menu[i].quantity = menu[i].quantity-1
        }
      }
    }

    console.log("NNN ", menu)


  }

  showInfo() {
    this.props.handleShow(this.props.info)
  }

  render() {
    return (
      <Row>
        <Col>
          <div className='row form-group'>
            <div className='col-sm-10'>
              <h4>
                {this.props.name}: ${this.props.price}
              </h4>
            </div>
            <div className='col-sm-2 text-right'>qty: {this.state.qty}</div>
          </div>
          <div className='row btn-toolbar'>
            <div className='col-6'>
              <button
                className='btn btn-outline-primary'
                onClick={this.showInfo}
              >
                show More
              </button>
            </div>
            <div className='col-6 text-right'>
              <button className='btn btn-outline-primary' onClick={this.add}>
                +1
              </button>
              <button
                className='btn btn-outline-primary'
                onClick={this.subtract}
                disabled={this.state.qty < 1}
              >
                -1
              </button>
            </div>
          </div>
          <hr />
        </Col>
      </Row>
    )
  }
}

/* Total */
class Total extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    //   console.log('this.props.total ', this.props.total)
    let total = this.props.total.toFixed(2)
    let tax = (this.props.total * 0.05).toFixed(2)
    let totalIncTax = +total + +tax
    let mystyle = {
      borderTop: '1px solid #ddd',
      marginTop: '10px',
    }
    return (
      <div
        className='col-lg-6 col-md-6 col-sm-12'
        style={{
          marginTop: '30px',
          backgroundColor: '#F6F6F6',
          padding: '10px',
        }}
      >
        <h3 className='row' style={{ fontWeight: 400 }}>
          <span className='col-6'>Total Price:</span>
          <span className='col-6 text-right'>${total}</span>
        </h3>
        <h3 className='row' style={{ fontWeight: 400 }}>
          <span className='col-6'>Tax (5%):</span>
          <span className='col-6 text-right'>${tax}</span>
        </h3>
        <h3 className='row' style={mystyle}>
          <span className='col-6'>Total inc Tax:</span>
          <span className='col-6 text-right'>${totalIncTax}</span>
        </h3>
      </div>
    )
  }
}

/* ProductList */
class MenuList extends React.Component {
  
  constructor(props) {
    super(props)
    // const { id } = this.props.params;
    //console.log("IDD ",match.params.id)

    this.state = {
      total: 0,
      productList: '',
      // id : this.props.match.params.id
    }
    console.log('ID ', localStorage.getItem('id'))
    this.createProduct = this.createProduct.bind(this)
    this.calculateTotal = this.calculateTotal.bind(this)
    this.showProduct = this.showProduct.bind(this)
    this.order = this.order.bind(this)
  }

  componentDidMount() {
    //   setTimeout(() => {
    //     this.setState({ productList: productList });
    //   }, 1000);
    fetch(`http://localhost:3000/api/res/getMenu/${localStorage.getItem('id')}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('Rss ', result.restaurants[0].menu)
          this.setState({
            isLoaded: true,
            productList: result.restaurants[0].menu,
          })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          })
        }
      )
  }

  componentDidUpdate(prevProps) {
    console.log("Prev props",prevProps)
 }

  createProduct(product) {
    this.setState({
      products: this.state.productList.push(product),
    })
  }

  calculateTotal(price) {
    this.setState({
      total: parseInt(this.state.total) + parseInt(price),
    })
    console.log('Total ', this.state.total)
  }

  showProduct(info) {
    console.log(info)
    alert(info)
  }
  order(t){
     const history = useHistory();

    console.log("order called")
    // console.log('mm **', menu)
    console.log('Tot **', this)

    let orderDetails = {
      user_id: localStorage.getItem('uid'),
      restaurant_id: localStorage.getItem('id'),
      status: "Waiting for Confirmation",
      total: this.state.total * 1.05,
      menu : menu

    }
    console.log('mm rrr', orderDetails)
    axios.post('http://localhost:3000/api/order/saveOrder', orderDetails)
        .then(response => 
           //console.log("res ",response)
         //history.push("/myOrders")
         //browserHistory.push('/myOrders')
         test()
      
);

// routingFunction = (param) => {
//   this.props.history.push({
//       pathname: `/target-path`,
//       state: param
//   });
// }
  }
  
  render() {
    if (!this.state.productList) return <p>loading menu ...!!!!</p>
    console.log('Pp ', productList)
    var component = this
    var products = this.state.productList.map(function (product) {
      return (
        <div>
          <Product
            name={product.itemName}
            price={product.price}
            info={product.info}
            handleShow={component.showProduct}
            handleTotal={component.calculateTotal}
          />
        </div>
      )
    })

    return (
      
      <div>
        <Row>
          <Col>
            {products}
            <Total total={this.state.total} />
            <br></br>
            <Button variant='primary' onClick={this.order}>Order Now</Button>{' '}
          </Col>
          <Col>
            <MyComponent />
          </Col>
        </Row>
      </div>
    )
  }
}

export default MenuList
