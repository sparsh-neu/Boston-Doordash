import React, { useState , useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { faFlagUsa } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux'
import R, { mergeRight } from 'ramda'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


function Row(props) {
  const { row, setFlag, flag } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

    console.log("Flla ", props)
  const handleAccept = id => {
    console.log("Name",id);
    

    const accept = async () => {
        try {
          const res = await axios.put(
            `http://localhost:3000/api/order/acceptOrder/${id}`
          )
          console.log('response Avc', res)
         
        } catch (e) {
          console.log(e)
        }
      }
      accept()
      setFlag(!flag)
     
  };


const handleReject = id => {
    // console.log("Name ",id);
    const reject = async () => {
        try {
          const res = await axios.put(
            `http://localhost:3000/api/order/rejectOrder/${id}`
          )
          console.log('response Avc', res)
         
        } catch (e) {
          console.log(e)
        }
      }
      reject()
      setFlag(!flag)

 };
var date =  row.created_at;
console.log("Date Value:: ", date)
console.log("Testing Date", new Date(date).toString().split(' GMT')[0])
 // creating tables for pending order list 
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.user_id.username}
        </TableCell>
        <TableCell align="right">{new Date(date).toString().split(' GMT')[0]}</TableCell>
        <TableCell align="right">{row.total}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell style={{padding: 10}}>
            <Button   disabled={row.status != "Waiting for Confirmation"} style={{backgroundColor: "green", marginRight: 5}}
            onClick={() => handleAccept(row._id)} variant="contained" color="primary">
            Accept
                            
          </Button> 

        <Button disabled={row.status != "Waiting for Confirmation"} style={{backgroundColor: "red"}}
            onClick={() => handleReject(row._id)}  variant="contained" color="secondary">
        Reject
        </Button>
        
                   
 </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Menu Item</TableCell>
                    <TableCell>Quantity</TableCell>
                   
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.menu.map((historyRow) => (
                    <TableRow key={historyRow._id}>
                      <TableCell component="th" scope="row">
                        {historyRow.itemName}
                      </TableCell>
                      <TableCell>{historyRow.quantity}</TableCell>

                     
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function RestaurantOrders() {
  
const { user } = useSelector(R.pick(['user']));

console.log('userRRr' ,user);
  const [order,setOrders ] = useState()

  const [flag, setFlag] = useState(false)
  

  useEffect(() => {
    console.log('useEffect called')
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/order/restaurantOrderDetails/${user.restaurantID}`
        )
        console.log('response', res)
        setOrders(res.data.orders)
      } catch (e) {
        console.log(e)
      }
    }
    getOrders()
  }, [flag])
  console.log("orders", order)
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Username</TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Action</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          { order!=undefined  &&( 
          order.map((row) => (
            <Row key={row._id} row={row} flag={flag} setFlag={setFlag}/>
          )))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
