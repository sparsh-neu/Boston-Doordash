import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { GoogleMap } from '@react-google-maps/api';
import Marker from './Marker';

class GoogleMap1 extends Component {
  // static defaultProps = {

  //   center: {
  //     lat: this.state.lat,
  //     lng: 12.31
  //   },
  //   zoom: 11
  // };
  constructor(props) {
    super(props)
    // const { id } = this.props.params;
    //console.log("IDD ",match.params.id)

    this.state = {
      lat:42.3601,
      lng: -71.0589,
    }
  }
  componentDidMount() {
    //   setTimeout(() => {
    //     this.setState({ productList: productList });
    //   }, 1000);
    console.log('Address ', this)
    fetch(
      `https://maps.googleapis.com/maps/api/geocoding/json?address=${this.props.address}&key=AIzaSyCt1Gyhvr7SwGEog6sQ6zJ7I5gvH9c7DPo`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(
            'Address lat and Lng ',
            result.results[0].geometry.location.lat
          )
          this.setState({
            lat: result.results[0].geometry.location.lat,
            lng: result.results[0].geometry.location.lng,
          })
        },

        (error) => {
          console.log('Error occured while retriving lat and lng')
        }
      )
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        {console.log('&&& ', this.state)}
        {this.state.lat != 0.0 && (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyCt1Gyhvr7SwGEog6sQ6zJ7I5gvH9c7DPo',
            }}
            defaultCenter={this.state}
            defaultZoom={3}
          >
            <Marker
              lat={this.state.lat}
              lng={this.state.lng}
              name='Restaurant Location'
              color='blue'
              onClick={() =>
                window.open(
                  'https://www.google.com/maps?q=' +
                    this.state.lat +
                    ',' +
                    this.state.lng,
                  '_blank'
                )
              }
              icon={{
                url: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
              }}
            />
          </GoogleMapReact>
        )}
      </div>
    )
  }
}

export default GoogleMap1
