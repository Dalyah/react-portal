import React, {Component} from 'react'
import Login from './recommendation-components/login'
import CustomerDetails from './recommendation-components/customer_details'
import CityDetails from './recommendation-components/city_details'
import FutureBookings from './recommendation-components/future_bookings'
import Preferences from './recommendation-components/preferences'
import Recommendations from './recommendation-components/recommendations'
import Feedback from './recommendation-components/feedback'
import Thanks from './recommendation-components/thanks'
import Avatar from 'react-avatar';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 'login',
            username:'',
            bookingList: [],
            customerID: '',
            selectedBooking: '',
            city: '',
            dateFrom: '',
            dateTo: '',
            adultsNo: '',
            kidsNo: '',
            roomsNo: '',
            kidsAgeList: [],
            starRatingList: [], 
            guestRatingList: [], 
            propertyList: [],
            costList: [],
            landmarksList: [],
            booked: '',
            bookingID: '',
            cancelReasons: []
        };
      }
    changeActivePage(newPage){
        this.setState({activePage: newPage})
    }

    getBookingList(list){
        this.setState({bookingList: list})
    }

    getCustomerID(ID){
        this.setState({customerID: ID})
    }

    getSelectedBooking(booking){
        this.setState({selectedBooking: booking})
    }
    getCityDetailsList(list){
        for(var key in list) {
            this.setState({[key]: list[key]})
         }
    }
    getPreferencesList(list){
      for(var key in list) {
          this.setState({[key]: list[key]})
       }
  }
  getBooked(booked){
      this.setState({booked: booked})
  }
  getBookingID(bookingID){
      this.setState({bookingID: bookingID})
  }
  getUsername(username){
    this.setState({username: username})
}
  getSelectedReasons(reasons){
    this.setState({cancelReasons: reasons})
}
  
    renderActivePage(page) {
        switch(page) {
            case 'login':
              return <Login activePage = {this.changeActivePage.bind(this)} 
              username = {this.getUsername.bind(this)} />
            case 'customerDetails':
              return <CustomerDetails activePage = {this.changeActivePage.bind(this)} 
              bookingList = {this.getBookingList.bind(this)}
              customerID = {this.getCustomerID.bind(this)} />
            case 'futureBookings':
              return <FutureBookings bookingList = {this.state.bookingList} 
              customerID = {this.state.customerID}
              activePage = {this.changeActivePage.bind(this)}
              selectedBooking = {this.getSelectedBooking.bind(this)} /> 
            case 'cityDetails':
              return <CityDetails selectedBooking = {this.state.selectedBooking}
                                  city =  {this.state.city}
                                  dateFrom = {this.state.dateFrom}
                                  dateTo = {this.state.dateTo}
                                  adultsNo = {this.state.adultsNo}
                                  kidsNo = {this.state.kidsNo}
                                  roomsNo = {this.state.roomsNo}
                                  kidsAgeList = {this.state.kidsAgeList}
                                  starRatingList = {this.state.starRatingList}
                                  guestRatingList = {this.state.guestRatingList}
                                  propertyList = {this.state.propertyList}
                                  costList = {this.state.costList}
                                  landmarksList = {this.state.landmarksList}
                                  activePage = {this.changeActivePage.bind(this)}
                                  city_list = {this.getCityDetailsList.bind(this)}
                                  preferences_list = {this.getPreferencesList.bind(this)}/>
            case 'preferences':
              return <Preferences city = {this.state.city}
                                  starRatingList = {this.state.starRatingList}
                                  guestRatingList = {this.state.guestRatingList}
                                  propertyList = {this.state.propertyList}
                                  costList = {this.state.costList}
                                  landmarksList = {this.state.landmarksList}
                                  activePage = {this.changeActivePage.bind(this)}
                                  preferences_list = {this.getPreferencesList.bind(this)}/>
            case 'recommendations':
              return <Recommendations customerID = {this.state.customerID} 
                                      selectedBooking = {this.state.selectedBooking}
                                      city = {this.state.city}
                                      dateTo = {this.state.dateTo}
                                      dateForm = {this.state.dateFrom}
                                      adultsNo = {this.state.adultsNo}
                                      kidsNo = {this.state.kidsNo}
                                      roomsNo = {this.state.roomsNo}
                                      starRatingList = {this.state.starRatingList}
                                      guestRatingList= {this.state.guestRatingList}
                                      costList = {this.state.costList}
                                      propertyList = {this.state.propertyList}
                                      landmarksList = {this.state.landmarksList}
                                      activePage = {this.changeActivePage.bind(this)}/>
            case 'feedback':
              return <Feedback activePage = {this.changeActivePage.bind(this)}
                               booked = {this.getBooked.bind(this)}
                               bookingID = {this.getBookingID.bind(this)}
                               reasons = {this.getSelectedReasons.bind(this)}/>
            case 'thanks':
              return <Thanks activePage = {this.changeActivePage.bind(this)}/>
            default:
                console.info("i am being refreshed")
              return <CustomerDetails activePage = {this.changeActivePage.bind(this)}/>
          }
    }

    addUserProfile = () => {
        if (this.state.username !== ''){
            return( 
            <div className="center">
                <Avatar name={this.state.username} size="50" round={true} />
                <p>  {this.state.username}</p>
            </div>

            )
        }
    }
    render() {
      
        return (
        <div className="App">
            <header className="jumbotron">
            <div className="col-2 float-right ">
                    {this.addUserProfile()}
            </div>
            <div className="text-center col-10">
                    <h2>Hotels Recommendation Portal</h2>
                    <p>Cross-Sell Hotels with AI empowered Recommendation Engine!</p>
                    
            </div>
               
 
            </header>
            <div class="container body-page col-8">
                {this.renderActivePage(this.state.activePage)}
            </div>
            <footer className="container text-center">
                <p>&copy; Seera Group 2020. All rights reserved</p>
            </footer>
        </div>
        
        )
  }
}

export default App