import React, {Component} from 'react'
const axios = require('axios')

class CityDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            dateFrom: '',
            dateTo: '',
            adultsNo: '2',
            kidsNo: '0',
            roomsNo: '1',
            kidsAgeList: [],
            addresedKidsList:[],
            starRatingList: ['5', '4', '3', '2', '1'],
            guestRatingList: ['9+ Excellent',
                                '8+ Very Good',
                                '7+ Good',
                                '6+ Fair'],
            costList : ['0 - 250 SAR',
                '251 - 300 SAR', 
                '301 - 400 SAR',
                '401 - 550 SAR',
                '551 - 800 SAR',
                '> 800 SAR'],
            otherPropertyList:[],
            landmarkList: [],
            propertyList: [],
            selectedLandmark:'',
            selectedPropertyList: [],
            selectedLandmarkList: [],
            selectedStarRatingList: [],
            selectedGuestRatingList: [],
            selectedCostList: []
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    componentWillMount(){
        this.getLandmarks();
        this.getPropertyTypes();
        const {selectedBooking, city, dateFrom, dateTo, adultsNo, kidsNo, roomsNo, kidsAgeList,
               starRatingList, guestRatingList, propertyList, costList, landmark} = this.props
        if (this.props.city !== ""){
            this.setState({city: city})
            this.setState({dateFrom: dateFrom})
            this.setState({dateTo: dateTo})
            this.setState({adultsNo: adultsNo})
            this.setState({kidsNo: kidsNo})
            this.setState({roomsNo: roomsNo})
            this.setState({kidsAgeList: kidsAgeList})
            this.setState({selectedStarRatingList: starRatingList})
            this.setState({selectedGuestRatingList: guestRatingList})
            this.setState({selectedCostList: costList})
            this.setState({selectedPropertyList: propertyList})
            this.setState({selectedLandmark: landmark})
        }
    }
    handleSubmit =  e => {
        e.preventDefault();
        // add the others properties to list f others is selected
        if (this.state.selectedPropertyList.includes('Others')){
          console.info("hi i am getting others")
          var arr1 = this.state.selectedPropertyList;
          arr1.push.apply(arr1, this.state.otherPropertyList);
          this.setState({selectedPropertyList : arr1})
          console.info(this.state.selectedPropertyList)
        }
        var cityList = { 
            'city' : this.state.city , 
            'dateFrom' : this.state.dateFrom , 
            'dateTo' : this.state.dateTo,
            'adultsNo' : this.state.adultsNo,
            'kidsNo' : this.state.kidsNo,
            'roomsNo' : this.state.roomsNo,
            'kidsAgeList' : this.state.kidsAgeList
          };
        var prefList = { 
            'starRatingList' : this.state.selectedStarRatingList , 
            'guestRatingList' : this.state.selectedGuestRatingList , 
            'propertyList' : this.state.selectedPropertyList,
            'costList' : this.state.selectedCostList,
            'landmark' : this.state.selectedLandmark
          };

        // Forward to next page 
        this.props.activePage('recommendations');
        this.props.preferences_list(prefList)
        this.props.city_list(cityList)
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
        //if(e.target.name === 'dateFrom' || e.target.name === 'city'  ){
        if(e.target.name === 'dateFrom' ){
          this.getLandmarks();
        }
        
    }

    handlePropertyChange = e => {
        if (e.target.checked){
          this.setState({selectedPropertyList : [...this.state.selectedPropertyList, e.target.value]})
        }
        else{
          var array = [...this.state.selectedPropertyList];
          var index = array.indexOf(e.target.value)
          if (index !== -1) {
            array.splice(index, 1);
            this.setState({selectedPropertyList: array});
          }
        }
      }
  
      handleStarRatingChange = e => {
        if (e.target.checked){
          this.setState({selectedStarRatingList : [...this.state.selectedStarRatingList, e.target.value]})
        }
        else{
          var array = [...this.state.selectedStarRatingList];
          var index = array.indexOf(e.target.value)
          if (index !== -1) {
            array.splice(index, 1);
            this.setState({selectedStarRatingList: array});
          }
        }
      }
  
      handleGuestRatingChange = e => {
        if (e.target.checked){
          this.setState({selectedGuestRatingList : [...this.state.selectedGuestRatingList, e.target.value]})
        }
        else{
          var array = [...this.state.selectedGuestRatingList];
          var index = array.indexOf(e.target.value)
          if (index !== -1) {
            array.splice(index, 1);
            this.setState({selectedGuestRatingList: array});
          }
        }
      }
  
      handleCostChange = e => {
        if (e.target.checked){
          this.setState({selectedCostList : [...this.state.selectedCostList, e.target.value]})
        }
        else{
          var array = [...this.state.selectedCostList];
          var index = array.indexOf(e.target.value)
          if (index !== -1) {
            array.splice(index, 1);
            this.setState({selectedCostList: array});
          }
        }
      }
  
      handleLandmarkChange = e => {
        if (e.target.checked){
          this.setState({selectedLandmarkList : [...this.state.selectedLandmarkList, e.target.value]})
        }
        else{
          var array = [...this.state.selectedLandmarkList];
          var index = array.indexOf(e.target.value)
          if (index !== -1) {
            array.splice(index, 1);
            this.setState({selectedLandmarkList: array});
          }
        }
      }
      handleKidsAgeChange = (i, e)=> {
        if (this.state.addresedKidsList.includes(i)){
            var array = [...this.state.addresedKidsList];
            var array2 = [...this.state.kidsAgeList];
            var index = array.indexOf(i)
            if (index !== -1) {
                array2.splice(index, 1, e.target.value);
                this.setState({kidsAgeList: array2});
            }    

        }
        else{
            this.setState({addresedKidsList : [...this.state.addresedKidsList, i]})
            this.setState({kidsAgeList : [...this.state.kidsAgeList, e.target.value]})
        }
        
      }
  
      getLandmarks = async () => {
         /* 
          this function will send API request to 
          get the landmarks based on city selected
        */
        try {
        const response = await fetch('/getLandmarksByCity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ city: this.state.city }),
        });
        const body = await response.json();
        console.info(body);
        console.info(body.landmarks);

        this.setState({landmarkList: body.landmarks})
      }
      catch(error){
        console.log(error);
      }
        
      }
  
      getPropertyTypes = async () => {
         /* 
          this function will send API request to 
          get the property types List based on city selected
        */
  
       const response = await fetch('/getPropertyListByCity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: this.state.city }),
      });
      const body = await response.json();
      console.info(body);
      console.info(body.propertyList);
      this.setState({propertyList: body.propertyList})
      this.setState({otherPropertyList: body.otherPropertyList})
      console.info(body.otherPropertyList)
      }
      getName = i =>
      {
        return "kidAge"+i+""
      }

      renderKidsAgeBox = i => {
          return(                    
            <section className="kid-box">
            <input type="number" className="form-control"  name="kidage"
            onChange={(e) => this.handleKidsAgeChange(i, e)} min="0" max="11"
            placeholder="0" required/>
            </section>
            
      )
      }

      AddAgeBoxes = () => {
          var boxes = []
          var i;
          for (i = 0; i < this.state.kidsNo; i++) {
            boxes.push(this.renderKidsAgeBox(i))
      }
      return boxes
    }
  

    render() {
        
    return (
      <form className="form-group" onSubmit={this.handleSubmit.bind(this)}>
          <h4>City Details Page</h4>
          <section className="inside-block">
          <p>Please enter the city and hotel Preferences</p>
                    <div className="form-group">
                        <label><b>City</b></label>
                        <input type="text" className="form-control" name="city"
                        value = {this.state.city}  onChange={this.handleChange} 
                        placeholder = "" required/>
                    </div>
                <section className="section-left">
                
                    <div className="form-group">
                        <label><b>From</b></label>
                        <input type="date" className="form-control" name="dateFrom"
                        onChange={this.handleChange}  value = {this.state.dateFrom}
                        placeholder = "yyyy-mm-dd" required/>
                    </div>
                    <div className="form-group">
                        <label><b>Number of Adults</b></label>
                        <input type="number" className="form-control"  name="adultsNo" 
                        onChange={this.handleChange} min="1" max="20" value= {this.state.adultsNo} 
                        placeholder="2"required/>
                    </div>
                    <div className="form-group">
                        <label><b>Number of Rooms</b></label>
                        <input type="number" className="form-control"  name="roomsNo" 
                        onChange={this.handleChange} min="1" max="20" value = {this.state.roomsNo} 
                        placeholder="1" required/>
                    </div>
                    <div className="form-group">
                        <label><b>Star Rating</b></label>
                        {this.state.starRatingList.map((data) =>
                        <div class="form-check form-check">
                            <input class="form-check-input" type="checkbox" name="propertyList" 
                            onChange={this.handleStarRatingChange} value={data}/>
                            <label class="form-check-label" for="inlineCheckbox1">{data}</label>
                        </div>
                            )}
                        
                    </div>
                    <div className="form-group">
                        <label><b>Guest Rating</b></label>

                        {this.state.guestRatingList.map((data) =>
                        <div class="form-check form-check">
                            <input class="form-check-input" type="checkbox" name="propertyList" 
                            onChange={this.handleGuestRatingChange} value={data}/>
                            <label class="form-check-label" for="inlineCheckbox1">{data}</label>
                        </div>
                            )}
                    </div>
                    <div className="form-group">
                      <label><b>Close To: </b></label>
                      <select class="form-control" onChange={this.handleChange} name="selectedLandmark">
                      {this.state.landmarkList.map((data) =>
                            <option>{data}</option>
                        )}
                        </select>
                     
                  </div>
                </section>
                <section className="section-right">
                    <div className="form-group">
                        <label><b>To</b></label>
                        <input type="date" className="form-control"  name="dateTo" 
                        onChange={this.handleChange} value = {this.state.dateTo} 
                        placeholder = "yyyy-mm-dd" required/>
                    </div>
                    <div className="form-group">
                        <label><b>Number of Children</b></label>
                        <input type="number" className="form-control"  name="kidsNo" 
                        onChange={this.handleChange} min="0" max="6" value={this.state.kidsNo}
                        placeholder="0" required/>
                    </div>
                    <div className="form-group">
                        <label><b>Age of Children</b></label>
                        <br/>
                        {this.AddAgeBoxes()}
                        <br/>
                    </div>
                   

                   
                    <div className="form-group">
                      <label><b>Property Type </b></label>
                      {this.state.propertyList.map((data) =>
                      <div class="form-check form-check">
                        <input class="form-check-input" type="checkbox" name="propertyList" 
                        onChange={this.handlePropertyChange} value={data}/>
                        <label class="form-check-label" for="inlineCheckbox1">{data}</label>
                      </div>
                        )}
                  </div>
                  
                  <div className="form-group">
                        <label><b>Cost/Night</b></label>
                        {this.state.costList.map((data) =>
                        <div class="form-check form-check">
                            <input class="form-check-input" type="checkbox" name="propertyList" 
                            onChange={this.handleCostChange} value={data}/>
                            <label class="form-check-label" for="inlineCheckbox1">{data}</label>
                        </div>
                            )}
                    </div>
                </section>
                <div className="form-group col-3 float-right">
                        <button className="btn btn-info btn-right btn-block" type="submit"> Continue</button>
                </div>
                    <span className= "col-8"></span>
                    <br/><br/><br/><br/>

          </section>
          
      </form>
    )
  }
}

export default CityDetails