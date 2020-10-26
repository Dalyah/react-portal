import React, {Component} from 'react'

class CustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerID: '',
            bookings: []};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount() {
        this.getFutureBookings();
      }

      getFutureBookings = async () => {
        /* 
        this function will send API request to 
        get the future bookings based on customer ID
        */

        const response = await fetch('/getFutureBookingsByID', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ customerID: this.state.customerID }),
        });
        console.info(response)
        const body = await response.json();
        console.info(body);
        console.info(body.futureBookings);
        this.setState({ bookings: body.futureBookings });
        }


    handleSubmit =  e => {
        e.preventDefault();
        // Forward to next page with future bookings data
        this.props.activePage('futureBookings');
        this.props.bookingList(this.state.bookings);
        this.props.customerID(this.state.customerID);
    }

    handleChange = e => {
        this.setState({customerID: e.target.value});
    }

    render() {
    return (
      <form className="form-group" onSubmit={this.handleSubmit.bind(this)}>
          <h4>Customer Details Page</h4>
          <section className="inside-block">
            <p>Please enter the customer ID (Salesforce ID) you are serving 
                for cross-sell hotel booking!
            </p>
            <div className="form-group">
                <label>Case ID</label>
                <input type="text" className="form-control"  name="customerID" 
                onChange={this.handleChange} value = {this.state.customerID} required/>
            </div>

            <div className="form-group col-3 float-right">
                <button className="btn btn-info btn-right btn-block" type="submit"> Continue</button>
            </div>
            <span className= "col-8"></span>
          </section>
          
      </form>
    )
  }
}

export default CustomerDetails