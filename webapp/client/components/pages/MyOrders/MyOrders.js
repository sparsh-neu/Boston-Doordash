import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import R from 'ramda'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import axios from 'axios'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
      fontSize: '2vh',
    },
    table: {
      fontSize: '1vh',
    },
  },
})
const MenuItemWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  border: 1px solid #2f2a2a36;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 2vh;
`

const MenuItem = styled.div``

const MenuItemDetails = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  font-weight: 700;
  font-size: 2vh;
`
const CounterButton = styled.div`
  border: 1px solid #0000003d;
  padding: 7px;
  border-radius: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  margin-bottom: 10px;
  cursor: pointer;
`

const MenuItemQuantityWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
`

const MenuItemQuantity = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
  font-weight: 700;
  font-size: 2vh;
`

const QuantityWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: baseline;
`

const TotalQuantityText = styled.div`
  fontsize: 10px;
`
const TotalQuantity = styled.div`
  font-size: 20px;
  font-weight: 700;
`
function Row(props) {
  const { row } = props
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()
  const dispatch = useDispatch()

  var date = row.created_at
  console.log('row ', row)
// creating orderlist divs
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.restaurant_id.restaurantName}
        </TableCell>
        <TableCell align='right'>
          {new Date(date).toString().split(' GMT')[0]}
        </TableCell>
        <TableCell align='right'>{row.total}</TableCell>
        <TableCell align='right'>{row.status}</TableCell>
      </TableRow>
      <TableRow className={classes.table}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='h4' gutterBottom component='div'>
                Order Details
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow className={classes.table}>
                    <TableCell>Menu Item</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.menu.map((historyRow) => (
                    <TableRow
                      style={{
                        flexFlow: 'row wrap',
                        border: '1px solid #2f2a2a36',
                        justifyContent: 'space-between',
                        padding: '10px',
                        borderRadius: '10px',
                      }}
                      key={historyRow._id}
                    >
                      <TableCell component='th' scope='row'>
                        {/* {historyRow.itemName} */}
                        <MenuItemDetails>
                          <div>{historyRow.itemName}</div>
                        </MenuItemDetails>
                      </TableCell>
                      <TableCell>
                        {/* {historyRow.quantity} */}
                        <MenuItemQuantityWrapper>
                          <TotalQuantity>{historyRow.quantity}</TotalQuantity>
                        </MenuItemQuantityWrapper>
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* {row.menu.map((historyRow) => (
                    <td colspan='5'>
                      <TableRow key={historyRow._id}>
                        <MenuItemWrapper>
                          <MenuItemDetails>
                            <div>{historyRow.itemName}</div>
                          </MenuItemDetails>
                          <MenuItemQuantityWrapper>
                            <TotalQuantity>{historyRow.quantity}</TotalQuantity>
                          </MenuItemQuantityWrapper>
                        </MenuItemWrapper>
                      </TableRow>
                    </td>
                  ))} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
}

export default function MyOrders() {
  const [order, setOrders] = useState()

  const { user } = useSelector(R.pick(['user']))

  useEffect(() => {
    console.log('useEffect called')
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/order/userOrderDetails/${user.id}`
        )
        console.log('response', res)
        setOrders(res.data.orders)
      } catch (e) {
        console.log(e)
      }
    }
    getOrders()
  }, [])
  console.log('orders', order)
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Restaurant Name</TableCell>
            <TableCell align='right'>Order Date</TableCell>
            <TableCell align='right'>Total</TableCell>
            <TableCell align='right'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order != undefined &&
            order.map((row) => <Row key={row._id} row={row} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
