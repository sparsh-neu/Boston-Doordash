const express = require('express')
const passport = require('passport')
const { Restaurant } = require('../database/schemas')

const { User } = require('../database/schemas')

const multer = require('multer')

var ObjectId = require('mongodb').ObjectID
const router = express.Router()
const { v4: uuidv4 } = require('uuid')

module.exports = router


const DIR = './public/'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({

    storage: storage,
    fileFilter: (req, file, cb) => {
      // console.log('ff ', req)
      console.log('ff 11', file)
      console.log("MUUU")

        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
  
});


router.post('/test', upload.single('profilePic'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  console.log('ss ', req.body)
  console.log('ssdd ', req)

  const newRestaurant = new Restaurant({
    address: '1 Hacker Street',
    restaurantName: 'Facebook',
    pincode: '02120',
    location: 'California',
    profilePic: url + '/public/' + req.file.filename,
  })
  newRestaurant
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Success',
        restaurants: {
          profilePic: result.profilePic,
        },
      })
    })
    .catch((err) => {
      console.log('Err ', err)
      res.send(err)
    })
})

//Adding Restaurant

router.post('/addRestaurant', upload.single('profilePic'), (req, res) => {
  //   if (!req || !req.body || !req.body.username || !req.body.password) {
  //     res.status(400).send({ message: 'Username and Password required' });
  //   }
  console.log('** ', req.body)
  const url = req.protocol + '://localhost:3000'

  console.log('REGISTER ', req.body)
  console.log('File ', req.file)

  console.log('REGISTER ', req.body)

  const newRestaurant = Restaurant({
    address: req.body.address,
    restaurantName: req.body.restaurantName,
    pincode: req.body.pincode,
    location: req.body.location,
    profilePic: url + '/public/' + req.file.filename,
  })

  newRestaurant.save((err, savedUser) => {
    if (err || !savedUser) {
      res.status(400).send({ message: 'Adding new Restaurant Failed', err })
    } else {
      console.log('Success')
      //res.send({ message: 'Restaurant Added successfully'});
      if (!req || !req.body || !req.body.username || !req.body.password) {
        res.status(400).send({ message: 'Username and Password required' })
      }

      req.body.username_case = req.body.username
      req.body.username = req.body.username.toLowerCase()

      const { username } = req.body
      console.log('LL ', savedUser)
      const newUser = User({
        username: req.body.username,
        password: req.body.password,
        restaurantID: savedUser._id,
      })

      User.find({ username }, (err, users) => {
        if (err) {
          res.status(400).send({ message: 'Create user failed', err })
        }
        if (users[0]) {
          res.status(400).send({ message: 'Username exists' })
        }

        newUser.hashPassword().then(() => {
          newUser.save((err, savedUser) => {
            if (err || !savedUser) {
              res.status(400).send({ message: 'Create user failed', err })
            } else {
              User.find({ _id: savedUser._id })
                .populate('restaurantID')
                .exec(function (err, users) {
                  res.send({ message: 'User created successfully', users })
                })
            }
          })
        })
      })
    }
  })
})

//Retrieve Restaurant
router.get('/getRestaurants', (req, res) => {
  Restaurant.find({}, (err, restaurants) => {
    if (err) {
      res.status(400).send({ message: 'Get Restaurants failed', err })
    } else {
      res.send({ message: 'Restaurants retrieved successfully', restaurants })
    }
  })
})

//Add menu to the restuarnt
router.post('/addMenu', (req, res) => {
  console.log('Add menu caled')
  //console.log("rr" , req)
  var menuItem = { itemName: req.body.itemName, price: req.body.price }
  Restaurant.findOneAndUpdate(
    { _id: ObjectId(req.user.restaurantID) },
    { $push: { menu: menuItem } },
    { new: true },
    function (error, success) {
      if (error) {
        res.send({ message: 'Error', error })
      } else {
        console.log('Add menu ', success)
        res.send({ message: 'Menu Added successfully', success })
      }
    }
  )
})

//Update an already added menu
router.patch('/updateMenu', (req, res) => {
  console.log('Update menu caled')
  console.log('rr', req.user.restaurantID)
  console.log('mm', req.body)
  var menuItem = { itemName: req.body.itemName, price: req.body.price }
  Restaurant.findOneAndUpdate({'menu._id': ObjectId(req.body._id)}, 
  {"$set" : {
    'menu.$.itemName': req.body.itemName,
    'menu.$.price': req.body.price
  }},
    function (error, success) {
      if (error) {
        res.send({ message: 'Error', error })
      } else {
        console.log('Add menu ', success)
        res.send({ message: 'Menu Added successfully', success })
      }
    }
  )
})

//Remove selected menu
router.post('/deleteMenu', (req, res) => {
  console.log('Delete menu caled')
  //console.log("rr" , req)
  console.log('menu id', req.body._id)
  console.log('rest id', req.user.restaurantID)

  Restaurant.findOneAndUpdate(
    { _id: ObjectId(req.user.restaurantID) },
    { $pull: { menu: { _id: ObjectId(req.body._id) } } },
    { new: true },
    function (err, data) {
      if (err) {
        res.send({ message: 'Error', err })
      } else {
        console.log('Delete Menu ', data)
        res.send({ message: 'Deleted successfully', data })
      }
    }
  )
})

//Retrieve menu
router.get('/getMenu', (req, res) => {
  console.log('Menu called')
  // console.log(req)

  console.log(req.user.restaurantID)
  Restaurant.find({ _id: req.user.restaurantID }, (err, restaurants) => {
    if (err) {
      res.status(400).send({ message: 'Get Menus failed', err })
    } else {
      res.send({ message: 'Menus retrieved successfully', restaurants })
    }
  })
})

//Retrieve selected menu
router.get('/getMenu/:id', (req, res) => {
  console.log('Menu called')
  // console.log(req)

  console.log(req.params.id)
  Restaurant.find({ _id: req.params.id }, (err, restaurants) => {
    if (err) {
      res.status(400).send({ message: 'Get Menus failed', err })
    } else {
      res.send({ message: 'Menus retrieved successfully', restaurants })
    }
  })
})

router.get('/getRestaurantsByLocation/:location', (req, res) => {
  Restaurant.find({ location: req.params.location }, (err, restaurants) => {
    if (err) {
      res.status(400).send({ message: 'Get Restaurants failed', err })
    } else {
      res.send({ message: 'Restaurants retrieved successfully', restaurants })
    }
  })
})

//Retrieve particular restaurant by name
router.get('/getRestaurantsByName/:name', (req, res) => {
  Restaurant.find(
    {
      restaurantName: {
        $regex: new RegExp(req.params.name, 'i'),
      },
    },
    (err, restaurants) => {
      if (err) {
        res.status(400).send({ message: 'Get Restaurants failed', err })
      } else {
        res.send({ message: 'Restaurants retrieved successfully', restaurants })
      }
    }
  )
})

//Retrieve particular restaurant using location
router.get('/getRestaurantsByLocation', (req, res) => {
  Restaurant.find({ location: req.body.location }, (err, restaurants) => {
    if (err) {
      res.status(400).send({ message: 'Get Restaurants failed', err })
    } else {
      res.send({
        message: 'Restaurants Details retrieved successfully',
        restaurants,
      })
    }
  })
})

//Update Restaurant Information
router.put('/restaurantInfo', (req, res) => {
  req.body.updated_at = Date.now()
  console.log(req.user.restaurantID)
  console.log('** ', req.body)
  Restaurant.findByIdAndUpdate(
    { _id: req.user.restaurantID },
    req.body,
    { new: true },
    (err, restaurants) => {
      if (err) {
        res.status(400).send({ message: 'Update Restaurants failed', err })
      }
      res.send({ message: 'Restaurant updated successfully', restaurants })
    }
  )
})

//Retieve information of a particular restaurant by id
router.get('/getRestaurantInfo/:id', (req,res) => {
  console.log(req);
  Restaurant.find({_id: req.params.id }, (err, restaurants) => {
    if (err) {
      res.status(400).send({ message: 'Get Restaurant Details failed', err });
      console.log("error msg",  req.user.restaurantID);
    } else {
      res.send({ message: 'Restaurants Details retrieved successfully', restaurants });
    }
  });
});