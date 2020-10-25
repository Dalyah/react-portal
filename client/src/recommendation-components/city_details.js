import React, {Component} from 'react'

class CityDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            dateFrom: '',
            dateTo: '',
            adultsNo: '2',
            kidsNo: '0',
            roomsNo: '1'
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      componentWillMount(){
        const {selectedBooking, city, dateFrom, dateTo, adultsNo, kidsNo, roomsNo} = this.props
        if (this.props.city !== ""){
            this.setState({city: city})
            this.setState({dateFrom: dateFrom})
            this.setState({dateTo: dateTo})
            this.setState({adultsNo: adultsNo})
            this.setState({kidsNo: kidsNo})
            this.setState({roomsNo: roomsNo})
        }
    }
    handleSubmit =  e => {
        e.preventDefault();
        var cityList = { 
            'city' : this.state.city , 
            'dateFrom' : this.state.dateFrom , 
            'dateTo' : this.state.dateTo,
            'adultsNo' : this.state.adultsNo,
            'kidsNo' : this.state.kidsNo,
            'roomsNo' : this.state.roomsNo
          };
        // Forward to next page 
        this.props.activePage('preferences');
        this.props.city_list(cityList)
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        
    return (
      <form className="form-group" onSubmit={this.handleSubmit.bind(this)}>
          <h4>City Details Page</h4>
          <section className="inside-block">
            <p>Please enter the city and hotel details</p>
                <div className="form-group">
                    <label>City</label>
                    <input type="text" className="form-control" name="city"
                    value = {this.state.city}  onChange={this.handleChange} 
                    placeholder = "" required/>
                </div>
                <div className="form-group">
                    <label>From</label>
                    <input type="date" className="form-control" name="dateFrom"
                    onChange={this.handleChange}  value = {this.state.dateFrom}
                    placeholder = "yyyy-mm-dd" required/>
                </div>
                <div className="form-group">
                    <label>To</label>
                    <input type="date" className="form-control"  name="dateTo" 
                    onChange={this.handleChange} value = {this.state.dateTo} 
                    placeholder = "yyyy-mm-dd" required/>
                </div>
                <div className="form-group">
                    <label>Number of Adults</label>
                    <input type="number" className="form-control"  name="adultsNo" 
                    onChange={this.handleChange} min="1" max="20" value= {this.state.adultsNo} 
                    placeholder="2"required/>
                </div>
                <div className="form-group">
                    <label>Number of Children</label>
                    <input type="number" className="form-control"  name="kidsNo" 
                    onChange={this.handleChange} min="0" max="20" value={this.state.kidsNo}
                     placeholder="0" required/>
                </div>
                <div className="form-group">
                    <label>Number of Rooms</label>
                    <input type="number" className="form-control"  name="roomsNo" 
                    onChange={this.handleChange} min="1" max="20" value = {this.state.roomsNo} 
                    placeholder="1" required/>
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

export default CityDetails