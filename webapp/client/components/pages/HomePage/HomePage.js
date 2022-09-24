import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AddTodo from '_molecules/AddTodo'
import TodoList from '_organisms/TodoList'
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Row } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import img from '../../../assets/images/restaurant.jpeg'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import SearchBar from '../../molecules/searchBar/SearchBar/SearchBar'

import { push } from 'connected-react-router'
import R from 'ramda'

import Lottie from 'react-lottie'
import EmptyAnimation from '../../../assets/animations/empty-lottie.json'
import DeliveryAnimation from '../../../assets/animations/delivery-lottie.json'
import FoodLottie from '../../../assets/animations/food-lottie.json'
import SupportLottie from '../../../assets/animations/support-lottie.json'

import Restaurant1 from '../../../assets/images/restaurant/restaurant-1.jpeg'
import Restaurant2 from '../../../assets/images/restaurant/restaurant-2.jpeg'
import Restaurant3 from '../../../assets/images/restaurant/restaurant-3.jpeg'
import Restaurant4 from '../../../assets/images/restaurant/restaurant-4.jpeg'
import Restaurant5 from '../../../assets/images/restaurant/restaurant-5.jpeg'
import Restaurant6 from '../../../assets/images/restaurant/restaurant-6.jpeg'

const apiURL = process.env.API_URL || ''

const api = axios.create({
  baseURL: apiURL,
})


const EmptyStateAnimation = styled.div``

const EmptyStateText = styled.div`
  font-size: 4vh;
  text-align: center;
`

const FeatureAnimations = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  padding-bottom: 12vh;
`

const FeatureAnimationIcon = styled.div`
  width: 28%;
  text-align: center;
`
const FeatureAnimationTitle = styled.div`
  font-weight: 700;
  letter-spacing: -0.04ch;
  text-transform: none;
  color: rgb(25, 25, 25);
  margin: 0px;
  padding-top: 20px;
  display: block;
  font-variant-ligatures: no-common-ligatures;
  font-size: 3vh;
`

const FeatureAnimationDescription = styled.div`
  font-weight: 300;
  padding-top: 3px;
  letter-spacing: -0.04ch;
  text-transform: none;
  color: rgb(25, 25, 25);
  margin: 0px;
  display: block;
  font-variant-ligatures: no-common-ligatures;
  font-size: 2.25vh;
`
const BannerCards = styled.div`
  display: flex;
  flex-flow: row;
  margin: 0 10%;
`

const BannerText = styled.div`
  align-self: center;
`

const BannerTitle = styled.div`
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.04ch;
  text-transform: none;
  color: rgb(25, 25, 25);
  margin: 0px;
  padding: 0px;
  display: block;
  font-variant-ligatures: no-common-ligatures;
  font-size: 5vh;
`

const BannerDescription = styled.div`
  font-weight: 300;
  line-height: 32px;
  padding-top: 2%;
  letter-spacing: -0.04ch;
  text-transform: none;
  color: rgb(25, 25, 25);
  margin: 0px;
  display: block;
  font-variant-ligatures: no-common-ligatures;
  font-size: 2.25vh;
`

const BannerImage = styled.div`
  img {
    width: 80%;
    height: auto;
    box-shadow: 5px 5px 5px #ccc;
    /* padding: 10%; */
    margin: 10%;
    border-radius: 15px;
  }
`
//styling to homepage user - searchbar, grid and other containers
export default function HomePage() {
  const dispatch = useDispatch()
  const { user } = useSelector(R.pick(['user']))
  console.log('Home user ', user)

  function getMenu(e) {
    // this.sortOn(e.currentTarget.getAttribute('data-column'));
    console.log('KEY ', e)
    localStorage.setItem('id', e)
    localStorage.setItem('uid', user.id)
    dispatch(push(`/menuList/${e}`))
  }
  const [restaurants, setRestaurants] = useState([{}])
  const [searched, setSearched] = ''

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  const EmptyLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: EmptyAnimation,
  }

  const DeliveryAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: DeliveryAnimation,
  }

  const FoodLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: FoodLottie,
  }

  const SupportLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: SupportLottie,
  }

  const lottieAnimations = [
    DeliveryAnimationOptions,
    FoodLottieOptions,
    SupportLottieOptions,
  ]

  const RestaurantImages = [
    Restaurant1,
    Restaurant2,
    Restaurant3,
    Restaurant4,
    Restaurant5,
    Restaurant6,
  ]

  function randomIamges() {
    const min = 0
    const max = RestaurantImages.length - 1
    const rand = min + Math.random() * (max - min)

    console.log('Random Number', Math.round(rand))

    return Math.round(rand)
  }

  const getRestaurants = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/res/getRestaurants`
      )
      console.log('response', res)
      setRestaurants(res.data.restaurants)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    console.log('useEffect called')
    getRestaurants()
  }, [])

  console.log('resss ', restaurants)
  console.log('res  ', restaurants.length)

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(6),
      paddingTop: 40,
      justifyContent: 'space-around',
      
    },

    image1: {
      height: 200,
      width: 350,
      borderRadius: 8,
    },
    image3: {
      height: 154,
      width: 154,
      borderRadius: 8,
    },
    image2: {
      height: 250,
      width: 350,
    },
    image4: {
      height: 330,
      width: 280,
    },
    span1: {
      fontFamily:
        'DD-TTNorms, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: '32px',
      marginLeft: '11%',
      fontWeight: '700',
      lineHeight: '40px',
      letterSpacing: '-0.04ch',
      textTransform: 'none',
      color: 'rgb(25, 25, 25)',
      fontVariantLigatures: 'no-common-ligatures',
      display: 'block',
      marginBottom: '0',
    },
  }))
  const classes = useStyles()
  const handleSearch = (searchText) => {
    console.log('Typed Text', searchText)
    if (searchText) {
      getRestaurantsByName(searchText)
    } else {
      getRestaurants()
    }
  }
  const getRestaurantsByName = async (restaurantName) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/res/getRestaurantsByName/` + restaurantName
      )
      console.log('response', res)
      console.log('Length of array', res?.data?.restaurants?.length)

      if (res?.data?.restaurants?.length > 0) {
        await setRestaurants(res?.data?.restaurants)
      } else {
        console.log('Entering else', res?.data?.restaurants)
        await setRestaurants([])
      }

      console.log('Current Restaurants', restaurants)
    } catch (e) {
      console.log('React Restaurant Error', e)
      console.log('Current Restaurants in YIKES', restaurants)
    }
  }
  return (
    <div>
      <SearchBar
        value={searched}
        onChange={(searchVal) => handleSearch(searchVal)}
        onRequestSearch={(searchVal) => {
          handleSearch(searchVal)
        }}
        onCancelSearch={() => handleSearch()}
        style={{
          
          margin: '0 auto',
          position: "relative",
          top: '15px',
          maxWidth: 800,
          borderRadius: '16px',
          boxShadow: 'none',
          backgroundColor: 'white',
          border: '1px solid #2125291c',
          
        }}
      />
      <br></br>
      <div>
        <span className={classes.span1}>Restaurants near you</span>
      </div>

      <div className={classes.root} style={{border:'2px solid black', borderRadius:'40px'}}>
        {restaurants?.length > 0 && (
          <Grid
            container
            spacing={4}
            style={{
              display: "flex",
              flexWrap: "nowrap",
              overflowX: "auto",
              boxSizing: "border-box"
            }}
            // container
            // spacing={4}
            // direction='row'
            // justifyContent='center'
            // alignItems='center'
            
          >
            {restaurants?.length > 0 &&
              restaurants?.length &&
              restaurants?.map((elem) => (
                // {console.log('ELE ', elem)}
                // {console.log('Index of elem ', elem._id)}
                <Grid
                  style={{
                    margin: '0 auto',
                    padding: '5',
                    paddingBottom: '20px',
                    textAlign: '-webkit-center',
                   
                  }}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={elem?._id}
                >
                  <Card
                    style={{ boxShadow: 'none', paddingTop: '10px'}}
                    className={classes.image2}
                  >
                    <CardActionArea onClick={() => getMenu(elem._id)}>
                      <CardMedia
                        component='img'
                        alt='Restaurant Name'
                        className={classes.image1}
                        image={elem.profilePic}
                        title='Restaurant Name'
                      />
                      <CardContent
                        style={{
                          paddingLeft: '0',
                          paddingTop: '2px',
                          paddingBottom: '0',
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: '14px',
                            fontWeight: '700',
                            lineHeight: '20px',
                            textAlign: 'initial',
                            letterSpacing: '-0.04ch',
                            display: 'block',
                            marginBottom: '0',
                          }}
                          gutterBottom
                          variant='h5'
                          component='h2'
                        >
                          {elem.restaurantName}
                        </Typography>
                        <Typography
                          variant='body2'
                          component='p'
                          style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            lineHeight: '20px',
                            textAlign: 'initial',
                            letterSpacing: '-0.04ch',
                            display: 'block',
                          }}
                        >
                          {elem.location}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
          </Grid>
        )}
        {restaurants?.length == 0 && (
          <EmptyStateAnimation>
            <Lottie options={EmptyLottieOptions} width={350} height={350} />
            <EmptyStateText>
              Not finding your restaurant? Search to find one
            </EmptyStateText>
          </EmptyStateAnimation>
        )}
      </div>

      <FeatureAnimations>
        {lottieAnimations?.map((item, index) => (
          <FeatureAnimationIcon>
            <Lottie
              options={lottieAnimations[index]}
              width={200}
              height={200}
            />
            <BannerText>
              <FeatureAnimationTitle>
                It’s all here. All in one app.
              </FeatureAnimationTitle>
              <FeatureAnimationDescription>
                Discover local, on-demand delivery or Pickup from restaurants
              </FeatureAnimationDescription>
            </BannerText>
          </FeatureAnimationIcon>
        ))}
      </FeatureAnimations>
      <BannerCards>
        <BannerText>
          <BannerTitle>Doordash is here to save you from hunger. Bon Appetite!</BannerTitle>
          <BannerDescription>
            In the mood for something? Here,choose from local, on-demand delivery or just Pickup from restaurants
          </BannerDescription>
        </BannerText>
        <BannerImage>
          <img
            src='https://cdn.doordash.com/media/consumer/home/landing/new/all_in_one.jpg'
            alt='Banner 1'
          />
        </BannerImage>
      </BannerCards>
      <BannerCards>
        <BannerImage>
          <img
            src='https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1600,format=auto,quality=50/https://cdn.doordash.com/media/consumer/home/landing/new/ev_fla_wel_alt.jpg'
            alt='Banner 2'
          />
        </BannerImage>
        <BannerText>
          <BannerTitle>Your friendly chicken wings are calling you</BannerTitle>
          <BannerDescription>
            Whether you stay in Boston or California, we have got you covered. Get to
            choose from over 700,000 favorites across the U.S
          </BannerDescription>
        </BannerText>
      </BannerCards>
    </div>
  )
}
