import React, {Component} from 'react'

class Prefrences extends Component {
    constructor(props) {
        super(props);
        this.state = {
          city:this.props.city,
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
          landmarkList: [],
          propertyList: [],
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
        const {starRatingList, guestRatingList, propertyList, costList, landmarksList} = this.props
      if (this.props.starRatingList !== ""){
          this.setState({selectedStarRatingList: starRatingList})
          this.setState({selectedGuestRatingList: guestRatingList})
          this.setState({selectedCostList: costList})
          this.setState({selectedPropertyList: propertyList})
          this.setState({selectedLandmarkList: landmarksList})
      }
    }

    handleSubmit =  e => {
      e.preventDefault();
     
      var prefList = { 
          'starRatingList' : this.state.selectedStarRatingList , 
          'guestRatingList' : this.state.selectedGuestRatingList , 
          'propertyList' : this.state.selectedPropertyList,
          'costList' : this.state.selectedCostList,
          'landmarksList' : this.state.selectedLandmarkList
        };
      // Forward to next page 
      this.props.activePage('recommendations');
      this.props.preferences_list(prefList)
      
    }

    handleChange = e => {
      this.setState({[e.target.name]: e.target.value})
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

    getLandmarks = async () => {
       /* 
        this function will send API request to 
        get the landmarks based on city selected
      */

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
    }

    render() {
      return (
        <form className="" onSubmit={this.handleSubmit.bind(this)}>
            <h4>Preferences Page</h4>
              <p>Please check the customer hospitality preferences</p>
              <section className="inside-block">
              <section className="section-left">
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
                  <section className="section-right">
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
                      <label><b>Close To: </b></label>
                      {this.state.landmarkList.map((data) =>
                      <div class="form-check form-check">
                        <input class="form-check-input" type="checkbox" name="propertyList" 
                        onChange={this.handleLandmarkChange} value={data}/>
                        <label class="form-check-label" for="inlineCheckbox1">{data}</label>
                      </div>
                        )}
                     
                  </div>
                  </section>
                  <br/><br/><br/><br/>
                  <div className="form-group col-3 float-right">
                      <button className="btn btn-info btn-right btn-block" type="submit"> Continue</button>
                  </div>
                  </section>
                  <span className= "col-8"></span>
                  <br/><br/>
                  


            
        </form>
      )
  }
}

export default Prefrences