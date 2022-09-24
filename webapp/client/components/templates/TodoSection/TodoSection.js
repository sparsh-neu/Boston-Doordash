import React, { useState, useEffect } from 'react';
import AddTodo from '_molecules/AddTodo';
import TodoList from '_organisms/TodoList';
import { useDispatch, useSelector } from 'react-redux';

import Section from 'react-bulma-companion/lib/Section';
import Title from 'react-bulma-companion/lib/Title';
import Columns from 'react-bulma-companion/lib/Columns';
import Column from 'react-bulma-companion/lib/Column';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import img from "../../../assets/images/restaurant.jpeg"
import axios from 'axios'
import Grid from "@material-ui/core/Grid";
import SearchBar from "material-ui-search-bar";

import { push } from 'connected-react-router';

const apiURL = process.env.API_URL || ''

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
});

const api = axios.create({
  baseURL: apiURL
})

export default function TodoSection() {
  //  goTo = () => {
  //   //localStorage.setItem('hotel', JSON.stringify(data));
  //   console.log('RESTT ID ' )
  //   //history.push(`/restaurant/menu/${data.id}`);
  // };
  const dispatch = useDispatch();


  function getMenu(e){
    // this.sortOn(e.currentTarget.getAttribute('data-column'));
    console.log("KEY ", e)
    localStorage.setItem('id', e);
    dispatch(push(`/menuList/${e}`));

}
  const [restaurants, setRestaurants] = useState([{}]); 
  const [searched, setSearched] = "";


  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  useEffect(() => {
  console.log("useEffect called");
  const getRestaurants = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/res/getRestaurants`,
      );
      console.log("response", res)
      setRestaurants(res.data.restaurants);

    } catch (e) {
      console.log(e);
    }
  };
  getRestaurants();
}, []);


// console.log(weather);



  console.log("resss ", restaurants)
  console.log("res  ", restaurants.length)
    console.log("res id ", restaurants[0]._id)

    const handleSearch = (searchedVal) => {
      console.log(searchedVal)
    // const filtered =data.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(searchedVal)))};

    //setRows(filteredRows);
  };
  return (

    // <Section className="todo-section">
    //   <Title size="1" className="has-text-centered">
    //     Todo List:
    //   </Title>
    //   <Columns>
    //     <Column size="8" offset="2" className="has-text-centered">
    //       <AddTodo />
    //     </Column>
    //   </Columns>
    //   <Columns>
    //     <Column size="8" offset="2" className="has-text-left">
    //       <TodoList />
    //     </Column>
    //   </Columns>
    // </Section>
    
  
    
  <div>
  <SearchBar
      value = {searched}
      onChange={(searchVal) => handleSearch(searchVal)}
      onRequestSearch={handleSearch}
      style={{
          margin: '0 auto',
          maxWidth: 800
      }}
      />
      <br>
      </br>
       
{ restaurants.length >1 && restaurants.map((elem) => (

  <Grid
       container
       spacing={2}
       direction="row"
       justify="flex-start"
       alignItems="flex-start"
       style={{
          display:"flex",
          flexWrap:"nowrap",
          boxSizing: "border-box",
          overflowX:"auto",
          gridAutoFlow:"column"
       }}
     >
      {console.log("ELE ",elem)}
      {console.log("Index of elem ",elem._id)}

    <Grid item xs={3} key={elem._id}>

        <Card >
        <CardActionArea onClick={() =>getMenu(elem._id) }>
          <CardMedia
            component="img"
            alt="Restaurant Name"
            height="400"
            width="500"
            image={img}
            title="Restaurant Name"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {elem.restaurantName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                  {elem.location}
            </Typography>
          </CardContent>
        </CardActionArea>

      </Card>
    </Grid>


  </Grid>
))} 
</div>
  );
};
    
  

