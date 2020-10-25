import React, {Component} from 'react'

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {  reasonsList:["Recommender returned zero results",
                                    "Couldn't find a hotel within budget",
                                    "Customer needs more time to make a decision",
                                    "Recommended hotels don't match the preferences" ],
                        booked:"",
                        bookingID:"",
                        selectedReasons: [] };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    handleSubmit =  e => {
        e.preventDefault();
        // Save feedback results

        // Forward to next page with future bookings data
        this.props.activePage('thanks');
        this.props.booked(this.state.booked);
        this.props.bookingID(this.state.bookingID);
        this.props.reasons(this.state.selectedReasons);

    }

    handleBookedChange = e => {
        this.setState({[e.target.name]: e.target.value});
        if (e.target.value === "yes"){// make reasonsList empty
            this.setState({selectedReasons: []});
        }
        else{ // make bookingId empty
            this.setState({bookingID: ""});
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleReasonChange = e => {
        if (e.target.checked){
            this.setState({selectedReasons : [...this.state.selectedReasons, e.target.value]})
          }
          else{
            var array = [...this.state.selectedReasons]; // make a separate copy of the array
            var index = array.indexOf(e.target.value)
            if (index !== -1) {
              array.splice(index, 1);
              this.setState({selectedReasons: array});
            }
          }
    }

    renderNextQuestion = () => {
        if (this.state.booked === "yes" ) {
            return (
            <div className="form-group">
            <label><b>Would you please enter the booking ID from HUB?</b></label>
            <input className="form-control" type="text" name="bookingID"  onChange={this.handleChange}/>
            
        </div>)
        }
        else if (this.state.booked === "no"){
            return (
            <div className="form-group">
            <label><b>Could you please check the reasons that prevent the customer
                 from completing the booking?</b></label>
            {this.state.reasonsList.map((data) =>
                  <div class="form-check form-check">
                    <input class="form-check-input" type="checkbox" name="reasonsList" 
                    onChange={this.handleReasonChange} value={data}/>
                    <label class="form-check-label" for="inlineCheckbox1">{data}</label>
                  </div>
                    )}
            </div> )

        }
        else{
            return <div></div>
        }
    }

    render() {
    return (
      <form className="form-group" onSubmit={this.handleSubmit.bind(this)}>
          <h4>Feedback Page</h4>
          <section className="inside-block">
            <p>Thanks for using Cross-Sell Recommendation Portal,
                 we appreciate you taking a few minutes to fill the below survey. 
            </p>
            <br></br>
            <div className="form-group">
                <label><b>Did the customer book one of the recommended hotels?</b></label>
                <div class="radio">
                    <label><input type="radio" name="booked" value= "yes" 
                    onChange={this.handleBookedChange}/>Yes</label>
                </div>
                <div class="radio">
                    <label><input type="radio" name="booked" value= "no" 
                    onChange={this.handleBookedChange}/>No</label>
                </div>
            </div>
            {this.renderNextQuestion()}
            
            <div className="form-group col-3 float-right">
                <button className="btn btn-info btn-right btn-block" type="submit"> Submit</button>
            </div>
            <span className= "col-8"></span>
          </section>

          
      </form>
    )
  }
}

export default Feedback