import React, { Component } from "react";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {toast} from 'react-toastify';

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

export default class ResetPwd extends Component {
  constructor(props) {
    super(props);
    this.handleForm = this.handleForm.bind(this);
    this.onChangeCurrPwd = this.onChangeCurrPwd.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRePassword = this.onChangeRePassword.bind(this);
    
    this.state = {
     
    };
  }


  componentDidMount() {

    let user = authService.getUserForRestPwd();

    this.setState({
        userId:user.userId
    });

   
  }


  onChangeCurrPwd(e) {
    this.setState({
        currentPwd: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
        password: e.target.value
    });
  }

  onChangeRePassword(e) {
    this.setState({
        repassword: e.target.value
    });
  }

  handleForm(e) {
    e.preventDefault();

    
    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {

       // alert(JSON.stringify( this.state));

        authService.resetPassword(this.state.userId, this.state.currentPwd, 
            this.state.password,this.state.repassword).then(response => {

                userService.updateFinalizedLevel(this.state.userId,"3").then(response => {
                    toast("Password Reset Successful!");
                    this.setState({
                        loading: false
                        //message: "Password Reset Successful"
                      });
                });
            },
            error => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
      
                this.setState({
                  loading: false,
                  message: resMessage
                });
              }
            );

    }else{
        this.setState({
            loading: false
        });
    }
  }
  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleForm}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="currentPwd">Current Password</label>

              <Input
                type="hidden"
                className="form-control"
                name="userId"
                value={this.state.userId}
                validations={[required]}
              />

              <Input
                type="password"
                className="form-control"
                name="currentPwd"
                value={this.state.currentPwd}
                onChange={this.onChangeCurrPwd}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="repassword">Retype Password</label>
              <Input
                type="password"
                className="form-control"
                name="repassword"
                value={this.state.repassword}
                onChange={this.onChangeRePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Change Password</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}