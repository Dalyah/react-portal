import React, {Component} from 'react'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username:'',
                       password: '',
                       validLogin: false,
                       error: false};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }


    validateLogin = async() => {
        /* 
         this function will validate user
         credentials
       */
 
       const response = await fetch('/validateUser', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ username: this.state.username,
                                password: this.state.password}),
       });
       console.info(response);
       const body = await response.json();
       console.info(body);
       console.info(body.validLogin);
       this.setState({validLogin: body.validLogin})
     }
    handleSubmit = async e => {
        e.preventDefault();
        
        await this.validateLogin();
        if (this.state.validLogin){
          this.setState({error: false});
          this.props.activePage('customerDetails');
          this.props.username(this.state.username);
        }
        else {
          this.setState({error: true});
        }
        

    }
    renderErrorMsg = () => {
        if (this.state.error){
            return (
                <div className="alert alert-danger" role="alert">
                Error using username or password!</div>)
        }


    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
    return (
      <form className="form-group" onSubmit={this.handleSubmit.bind(this)}>
          <h4>Login Page</h4>
          <section className="inside-block">
            <p>Please enter your login credentials</p>
            <br></br>
            {this.renderErrorMsg()}
            <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" name="username"
                    value = {this.state.username}  onChange={this.handleChange} 
                    placeholder = "username" required/>
            </div>
            <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password"
                    value = {this.state.password}  onChange={this.handleChange} 
                    placeholder = "password" required/>
            </div>
            <div className="">
                <button className="btn btn-info float-center btn-block" type="submit">Login</button>
            </div>
            <span className= "col-8"></span>
          </section>

          
      </form>
    )
  }
}

export default Login