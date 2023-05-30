import React, { Component } from "react";
import swal from "sweetalert";
import { Button, TextField, Link } from "@material-ui/core";
import { withRouter } from "./utils";
const axios = require("axios");

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm_password: ''
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  register = () => {
    if (this.state.password === '') {
      return swal({
        text: "Password cant be null",
        icon: "error",
        type: "error"
      });
    }
    if (this.state.username === '') {
      return swal({
        text: "Username cant be null",
        icon: "error",
        type: "error"
      });
    }
    if (this.state.password !== this.state.confirm_password) {
      return swal({
        text: "Passowrds Do not Match",
        icon: "error",
        type: "error"
      });
    }
    axios.post('http://localhost:2000/register', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      // this.props.history.push('/');
      this.props.navigate("/");
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

  render() {
    return (
      <div className="section" style={{ marginTop: '200px' }}>
        <div>
          <h2>Register an account</h2>
        </div>


        <div className="container">
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="firstName"
            value={this.state.firstName}
            onChange={this.onChange}
            placeholder="First Name"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="lastName"
            value={this.state.lastName}
            onChange={this.onChange}
            placeholder="Last Name"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="email"
            autoComplete="off"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            placeholder="Email"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="confirm_password"
            value={this.state.confirm_password}
            onChange={this.onChange}
            placeholder="Confirm Password"
            required
          />
          <br /><br />
          <div className="forgot-password"><a href="#">Forgot Password?</a></div>

          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username === '' && this.state.password === ''}
            onClick={this.register}
          >
            Register
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            // href="/"
            component="button"
            style={{ fontFamily: "inherit", fontSize: "inherit" }}
            onClick={() => {
              this.props.navigate("/");
            }}
          >
            Login
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
