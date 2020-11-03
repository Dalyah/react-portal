const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var configObj = require("./config.json");
// to get this value from env variables
var env = "local"

/*
// Hive connection
const HiveJdbc = require('sugo-hive-jdbc')
 
const conf = {
  url: 'jdbc:hive2://stage-datanode-2.atgdmap.stage:10000/default',
  drivername: 'org.apache.hive.jdbc.HiveDriver',
  minpoolsize: 10,
  maxpoolsize: 100,
  properties: {
    user: 'daliyah.aljamal',
    password: 'GgU2y4tK0s#'
  }
}
*/
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
    var locations = [];
    var locNames =  [];
    const URL = 'http://hotels-location-api.tajawal-dev.internal/autocomplete/geo-suggest?query='+city;
    axios.get(URL).then(response => {
    console.log("here is the response :"+response);
    locations = response.data.locations
    locNames = [];
    locations.forEach(loc => {
      locNames.push(loc.name)
    })
    console.log("location names :  "+locNames)
     
    res.send({ landmarks: locNames });
  }).catch(error => {
    console.log(error)
    res.send({ landmarks: locNames });
  })
 
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
        'Others'], 
    otherPropertyList: [
        'Pension',
        'Other',
        'Inn',
        'Pousada (Brazil)',
        'Pousada (Portugal)',
        'Townhouse',
        'Cruise',
        'Riad',
        'Bed & breakfast',
        'Safari/Tentalow',
        'Residence',
        'Chalet',
        'Condo',
        'Property',
        'Tree house property',
        'Houseboat',
        'Palace',
        'Castle',
        'Cottage',
        'Cabin',
        'Lodge',
        'Ranch',
        'Campsite',
        'Agritourism property',
        'All-inclusive property',
        'Condominium resort',
        'Private vacation home',
        'Country house',
        'Ryokan',
        'Holiday park'
    ] });
});

// Recommendation endpoint
app.post('/getRecommendations', (req, res) => {
    console.log(req.body);
    const { caseID, city, hotelsList} = req.body

    //Get Customer ID from Hive
    customerID_query = ""
    customerID = "00142d022bf247c31a7901cb1ae0a333"

    // Map city name to city ID
    cityID_query = ""
    cityID = "59"

    // Send API request to AI Recommendation Model
    recURL ="http://10.67.3.7:5001/rec_request"
    body =
     {
      "customer_id": customerID,
      "n_recommendations": 200, 
      "city": cityID,
      "hotel_ids": hotelsList
   }
    axios({
      url: recURL,
      method: 'post',
      headers: {'content-type': 'application/json'},
      data: JSON.stringify(body)
      }).then(response => {
        console.info("hotels list is sent to Rec API")
        console.info(response);

        recHotels = response.data.rec_hotels;
        console.info('recHotels: '+ recHotels);
        res.send({ recommendationsList: recHotels });

  }).catch (error => {
    if (error && error.response && error.response.status) {
      console.info(error.response, '---');
  }

  });



    
});

// AvailableHotels endpoint
app.post('/getAvailableHotels', (req, res) => {
      console.log(req.body);
      dateFrom = req.body.dateFrom;
      dateTo = req.body.dateTo;
      adultsNo = req.body.adultsNo;
      dateTo = req.body.dateTo;
      kidsAgeList = req.body.kidsAgeList;
      hiveQuery = "SELECT DISTINCT atg_hotel_id FROM l2_boost.hotel_summary where atg_hotel_id IS NOT NULL";
  
      // get list of hotels IDs from Hive

      
      /*
      const runHiveQuery = async () => {
        const hive = new HiveJdbc(conf)
        const res = await hive.runQuery(hiveQuery)
        console.log(res)
      }
      runHiveQuery()
      */



      /*
      hive = require('node-hive').for({ server:"stage-datanode-2.atgdmap.stage" });
      hive.fetch("SELECT DISTINCT atg_hotel_id FROM l2_boost.hotel_summary where atg_hotel_id IS NOT NULL",
       function(err, data) {
        data.each(function(record) {
          console.log(record);
        });
      });
      */
      /*
      const hive = require('hive-driver');
      const { TCLIService, TCLIService_types } = hive.thrift;
      const client = new hive.HiveClient(
          TCLIService,
          TCLIService_types
      );
      const utils = new hive.HiveUtils(
          TCLIService_types
      );
      
      client.connect(
          {
              host: 'stage-datanode-2.atgdmap.stage',
              port: 10000
          },
          new hive.connections.TcpConnection(),
          new hive.auth.PlainTcpAuthentication({
            username: 'daliyah.aljamal',
            password: 'GgU2y4tK0s#'
          })
      ).then(async client => {
          console.info("--------------- we are connecting to hive --------------------")
          console.info(TCLIService)
          console.info(" the client portal value:")
          console.info(TCLIService_types.TProtocolVersion.HIVE_CLI_SERVICE_PROTOCOL_V10)
          const session = await client.openSession({
              client_protocol: TCLIService_types.TProtocolVersion.HIVE_CLI_SERVICE_PROTOCOL_V10
          });
          const operation = await session.executeStatement(
              'SELECT DISTINCT atg_hotel_id FROM l2_boost.hotel_summary where atg_hotel_id IS NOT NULL'
          );
          await utils.waitUntilReady(operation, false, () => {});
          await utils.fetchAll(operation);

          console.log(
              utils.getResult(selectDataOperation).getValue()
          );

          await operation.close();
          await session.close();
      });
      */
      

      var hotelsList = ['1385417']
      var availableHotels = []
      hotelsList.forEach(hotel =>{
          // Unify call 1
          console.info(dateFrom);
          console.info(dateTo);
          const URL1 = 'https://next-dev.tajawal.com/api/enigma/packages';
          const body = {checkIn: dateFrom,
                        checkOut: dateTo,
                        hotelId: hotel,
                        roomsInfo:[{adultsCount:adultsNo, kidsAges:kidsAgeList}]}
          var pId = '';
          axios({
            url: URL1,
            method: 'put',
            headers: {'content-type': 'application/json',
                      'token': '98ujlK#$y2osj38u2$lskjdf'},
            data: JSON.stringify(body)
            }).then(response => {
              console.info("first api call is completed!")
              console.info(response);

              pId = response.data.pId;
              console.info('pId: '+pId);
              // Unify call 2
              console.info("starting next call")
              var sId = null;
              const URL2 ='https://next-dev.tajawal.com/api/enigma/packages/poll/'+pId;

              if (pId !== '')
              {
                axios({
                  url: URL2,
                  method: 'get',
                  headers: {'content-type': 'application/json',
                            'token': '98ujlK#$y2osj38u2$lskjdf'}
              }).then(response2 => {
                    console.info("second api call is completed!")
                    console.info(response2);
                    sId = response2.data.sId;
                    console.info('sId: '+sId);
                    // if available 
                  if( sId !== null)
                  {
                    availableHotels.push(hotel);
                    console.info(' We are pushing values')
                    console.info(availableHotels)
                  }
                  res.send({ availableHotels: availableHotels});


              }).catch (error => {
                if (error && error.response && error.response.status) {
                  console.info(error.response, '---');
              }

              });
      
            }

        }).catch (error => {
          if (error && error.response && error.response.status) {
            console.info(error.response, '---');
        }

        });

     

        
        
      });
      

 
});

// login check endpoint
app.post('/validateUser', (req, res) => {
    console.log(req.body);
    username = req.body.username
    password = req.body.password
    console.log(configObj[env])
    validUsername = configObj[env].username
    validPassword = configObj[env].password
    // connect to DB, check username & password
    if (username === validUsername && password === validPassword)
    {
        res.send({ validLogin: true});
    }
    else
    {
        res.send({ validLogin: false});
    }
    

    
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));