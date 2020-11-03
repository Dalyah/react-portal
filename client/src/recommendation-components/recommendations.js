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
            landmark: '',
            availableHotels:[],
            recommendationsList: [],
            hotelURLs: []};
    
        this.handleAnotherCity = this.handleAnotherCity.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      componentWillMount(){
        this.getAvailableHotels();
        this.getHotelsAroundLnadmark();
        this.getRecommendations();
    }


    getAvailableHotels = async() => {
      /* 
        this function will send Unify API request to 
        get the available hotels List based 
        on all inputs user entered
      */
     const { customerID, selectedBooking, city, dateFrom, dateTo, adultsNo,
      kidsNo, roomsNo,kidsAgeList, starRatingList, guestRatingList, propertyList, costList,
      landmark} = this.props
      try{

      
     const response = await fetch('/getAvailableHotels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerID: customerID, selectedBooking: selectedBooking,
         city: city, dateFrom: dateFrom, dateTo: dateTo, adultsNo: adultsNo,
        kidsNo: kidsNo, roomsNo: roomsNo, kidsAgeList:kidsAgeList, starRatingList: starRatingList,
         guestRatingList: guestRatingList, propertyList: propertyList, costList: costList,
        landmark: landmark}),
    });
    const body = await response.json();
    console.info(body);
    console.info(body.availableHotels);
    this.setState({availableHotels: body.availableHotels})
    }
    catch(error){
      console.log(error);
    }

    }

    getHotelsAroundLnadmark = async() => {
      /* 
        this function will filter the available hotels
        who are within 1KM of landmark
      */
     const landmark = this.props.landmark;
     // calculate landmark lat & log

     // loop through avaliableHotels
        //return lat & log of hotel
        //calculate distance between hotel & landmarl
        // filter hotels based on diatance

    // store results in new state to be passed to getRecommendation
      
    }

    generateURL = hotelIds => {
      var hotelURLs = [];
      hotelIds.forEach( id =>{
        var url = "https://ae.almosafer.com/en/hotel/details/atg/"+id;
        hotelURLs.push(url);
      });
      this.setState({hotelURLs: hotelURLs});
    }

    getRecommendations = async() => {
      /* 
        this function will send API request to 
        get the hotel recommendation List based 
        on all inputs user entered
      */
     const { customerID, city} = this.props

     const response = await fetch('/getRecommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ caseID: customerID, city: city,
                             hotelsList: this.state.availableHotels}),
    });
    const body = await response.json();
    console.info(body);
    console.info(body.recommendationsList);
    this.setState({recommendationsList: body.recommendationsList})
    this.generateURL(this.state.recommendationsList)

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
              /*
                {this.state.recommendationsList.map((data) =>
                     <li>{data[0]} , <a href={data[1]}>Full Details</a></li>
                 )}
             */
            {this.state.recommendationsList.forEach((data, index) => 
                <li>{data} , <a href={this.state.hotelURLs[index]}>Full Details</a></li>
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