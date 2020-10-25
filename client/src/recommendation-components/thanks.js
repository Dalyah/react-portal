import React, {Component} from 'react'

class Thanks extends Component {
    constructor(props) {
        super(props);
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    handleSubmit =  e => {
        e.preventDefault();
        window.location.reload(false);
        //this.props.activePage('customerDetails');

    }

    handleChange = e => {
        this.setState({customerID: e.target.value});
    }

    render() {
    return (
      <form className="form-group" onSubmit={this.handleSubmit.bind(this)}>
          <section className="container text-center">
          <h4>Thanks for using the cross-sell Portal!</h4>
          <br></br>
            <div className="form-group col-5 container text-center">
                <button className="btn btn-info btn-block" type="submit"> Home</button>
            </div>
            <span className= "col-8"></span>
        </section>
          
      </form>
    )
  }
}

export default Thanks