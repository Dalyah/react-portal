const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// futurebookings endpoint
app.post('/getFutureBookingsByID', (req, res) => {
    console.log(req.body);
    customerID = req.body.customerID
    // connect to DB & get the list of future bookings
    res.send({ futureBookings: [ " RUH to JED on JAN 19th,2021 at 9:00 AM",
                                 " JED to DMM on MAR 2nd, 2021 at 11:30 PM",
                                 " JED to DXB  on JAN 30th at 5:00 PM"] });
});

// landmarks endpoint
app.post('/getlandmarksByCity', (req, res) => {
    console.log(req.body);
    city = req.body.city
    // connect to location API & get the list of landmarks
    res.send({ landmarks:  [ 'Dubai Mall',
                             'Ski Dubai',
                             'Burj Khalifah',
                             'Burj Al Arab', 
                             'Mall of Emirates'] });
});

// Property endpoint
app.post('/getPropertyListByCity', (req, res) => {
    console.log(req.body);
    city = req.body.city
    // connect to location API & get the list of landmarks
    res.send({ propertyList:  [
        'Hotel',
        'Aparthotel',
        'Apartment',
        'Resort',
        'Villa',
        'Hostel',
        'Guesthouse',
        'Motel',
        'Others'] });
});

// Recommendation endpoint
app.post('/getRecommendations', (req, res) => {
    console.log(req.body);
    const { customerID, selectedBooking, city, dateTo, dateFrom, adultsNo,
        kidsNo, roomsNo, starRatingList, guestRatingList, propertyList, costList,
        landmarksList} = req.body
    // Map String values to IDs

    // Send API request to AI Recommendation Model

    res.send({ recommendationsList: [["Swiss Hotel", "https://www.almosafer.com/"],
                                     ["Hiliton Dubai The Walk", "link"],
                                     ["Ibis Styles Dubai Jumeira", 'link']] });
});

// login check endpoint
app.post('/validateUser', (req, res) => {
    console.log(req.body);
    username = req.body.username
    password = req.body.password
    // connect to DB, check username & password
    res.send({ validLogin: true});
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));