import React, { useState , useEffect} from 'react'
import R, { identity } from 'ramda'
import './App.scss'
import axios from 'axios'

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bulma-companion/lib/Button'
import { Col, Row } from 'react-bootstrap'
import { add } from 'date-fns'

// const dispatch = useDispatch()
// let productList = [{}]
// let menu =[]
// let total1 =0

// const [productList, setProductList] = useState([{}])

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


function Product(){

  console.log("Product called")
  const [qty, setQty] = useState(0)

  const add = (val) => {
    
    setQty(qty+1)
  }

  const subtract = (val) => {
    
    setQty(qty-1)
  }

  
  return (
    <Row>
      <Col>
        <div className='row form-group'>
          <div className='col-sm-10'>
            <h4>
              {props.name}: ${props.price}
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
export default function MenuList(props){

  const [total, setTotal] = useState(0)
  const [productList, setProductList]  = useState([{}])
  const [qtyy, setQtyy] = useState({name:"", qty:0})

  const add =(item) => {
   
     console.log('v ',item)
    // setQty(qty+1)
    console.log('QQ ',qtyy)
    setQtyy(item,1)
  }

  const subtract = (val) => {
    
    setQty(qty-1)
  }
  
  useEffect(() => {
    console.log('useEffect called')
    const getMenus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/res/getMenu/${localStorage.getItem('id')}`
        )
        console.log('response', res)
        setProductList(res.data.restaurants[0].menu)
      } catch (e) {
        
        console.log("error ",e)
      }
    }
    getMenus()
  }, [])
  // const calculateTotal = (price) => {
  //   setTotal(total+price)
  // }
  console.log("PLL ", productList)
  // console.log("PL11L ", qtyy)

  return (
    <div>

        { productList.length > 1 && 
        productList.map((product) => (
      <div>
<Row>
      <Col>
        <div className='row form-group'>
          <div className='col-sm-10'>
            <h4>
              {product.itemName}: ${product.price}
            </h4>
          </div>
          <div className='col-sm-2 text-right'>qty: {0}</div>
        </div>
        <div className='row btn-toolbar'>
          <div className='col-6'>
            {/* <button
              className='btn btn-outline-primary'
              onClick={this.showInfo}
            >
              show More
            </button> */}
          </div>
          <div className='col-6 text-right'>
            <button className='btn btn-outline-primary' onClick={add(product.itemName)}>
              +1
            </button>
            <button
              className='btn btn-outline-primary'
              onClick={() => subtract()}              
              // disabled={qty < 1}
            >
              -1
            </button>
          </div>
        </div>
        <hr />
      </Col>
    </Row>
    </div>
        
          

      
        ))
        
        }
  
  </div>
  )
  

}

