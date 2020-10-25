import React, {Component} from 'react'

class FutureBookings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedBooking: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    handleSubmit =  e => {
        e.preventDefault();
        // Forward to next page (city_details) with the selected Booking data
        this.props.activePage('cityDetails');
        this.props.selectedBooking(this.state.selectedBooking);
    }
    
    handleChange = e => {
        this.setState({selectedBooking: e.target.value});
    }
  
  
    render() {
        const {bookingList, customerID} = this.props
        console.info(bookingList)
        console.info(customerID)
        return (
        <form className="form-group" onSubmit={this.handleSubmit}>
            <h4>Future Bookings Page</h4>
            <section className="inside-block">
                <p>Your customer with the customer ID: <b>{customerID} </b>has the following future bookings.</p>
                <p> Please select one booking</p>
                {bookingList.map((data) =>
                     
                <div className="radio">
                    <label>
                        <input type="radio" value={data} name="bookingList"
                        onChange={this.handleChange} />
                        {data}
                    </label>
                </div>
                 )}

                <div className="form-group col-3 float-right">
                    <button className="btn btn-info btn-right btn-block" type="submit"> Continue</button>
                </div>
                <span className= "col-8"></span>
            </section>
            
        </form>
        )
  }
}

export default FutureBookings