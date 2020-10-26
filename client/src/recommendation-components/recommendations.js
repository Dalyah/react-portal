import React, {Component} from 'react'

class Recommendations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerID: '',
            selectedBooking: '',
            city: '',
            dateFrom: '',
            dateTo: '',
            adultsNo: '',
            kidsNo: '',
            roomsNo: '',
            starRating: '', 
            guestRating: '', 
            propertyList: [],
            cost: '',
            landmarksList: [],
            recommendationsList: []};
    
        this.handleAnotherCity = this.handleAnotherCity.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      componentWillMount(){
        this.getRecommendations();
    }

    getRecommendations = async() => {
      /* 
        this function will send API request to 
        get the hotel recommendation List based 
        on all inputs user entered
      */
     const { customerID, selectedBooking, city, dateTo, dateFrom, adultsNo,
      kidsNo, roomsNo, starRatingList, guestRatingList, propertyList, costList,
      landmarksList} = this.props

     const response = await fetch('/getRecommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerID: customerID, selectedBooking: selectedBooking,
         city: city, dateTo: dateTo, dateFrom: dateFrom, adultsNo: adultsNo,
        kidsNo: kidsNo, roomsNo: roomsNo, starRatingList: starRatingList,
         guestRatingList: guestRatingList, propertyList: propertyList, costList: costList,
        landmarksList: landmarksList}),
    });
    const body = await response.json();
    console.info(body);
    console.info(body.recommendationsList);
    this.setState({recommendationsList: body.recommendationsList})

    }

    handleSubmit =  e => {
        e.preventDefault();
        // Forward to next page "feedback page"
        this.props.activePage('thanks');
    }

    handleAnotherCity = e => {
        this.props.activePage('cityDetails');
    }

    render() {
    return (
      <form className="form-group" onSubmit={this.handleSubmit.bind(this)}>
          <h4>Recommendations Page</h4>
          <section className="inside-block">
            <p>Here is a list of the recommended hotels for the customer {this.props.customerID}
            </p>
            <ul>
                {this.state.recommendationsList.map((data) =>
                     <li>{data[0]} , <a href={data[1]}>Full Details</a></li>
                 )}
            </ul>
            <div className="form-group">
                <label>Another hotel/city to stay in within this trip?</label>
                <div className="float-right col-5">
                <button className="btn btn-info yes-no-btn" type="button"
                        onClick={this.handleAnotherCity.bind(this)}>Yes</button>
                <button className="btn btn-info yes-no-btn" type="submit"> No </button>
            </div>
            <span className= "col-8"></span>
               
                
            </div>
            
            
          </section>
          
      </form>
    )
  }
}

export default Recommendations