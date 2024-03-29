import React, { Component } from "react";
import "./op.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { graphql, compose, withApollo } from 'react-apollo';
import { Query } from "react-apollo";
import { getBuyerProfile } from '../../queries/queries';
import { UpdateBuyerMutation } from '../../mutation/mutations'

//Define a Login Component
class BuyerProfile extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      username: "",
      email: "",
      phone: "",
      imagePath: "",
      emailcookie: cookie.load("email"),
      authFlag: false
    };
    //Bind the handlers to this class
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }
  //username change handler to update state variable with the text entered by the user
  usernameChangeHandler = e => {
    this.setState({
      username: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };

  phoneChangeHandler = e => {
    this.setState({
      phone: e.target.value
    });
  };
  //submit Login handler to send a request to the node backend
  submitUpdate = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    // const data = {
    //   username: this.state.username,
    //   email: this.state.email,
    //   phone: this.state.phone,


    // };
    // //set the with credentials to true
    // axios.defaults.withCredentials = true;
    // //make a post request with the user data
    // axios.post("http://localhost:3001/buyerprofile", data).then(response => {
    //   console.log("Status Code : ", response.status);
    //   if (response.status === 200) {
    //     this.setState({
    //       authFlag: true
    //     });
    //   } else {
    //     this.setState({
    //       authFlag: false
    //     });
    //   }
    // });

    this.props.UpdateBuyerMutation({
      variables: {
        email: this.state.email,
        name: this.state.username,
        phone: this.state.phone,
      }

      //refetchQueries: [{ query: getBooksQuery }]
    }).then(res => {
      console.log("properties", res);
      // window.location.reload()
    });
  };


  componentDidMount() {
    // axios.get('http://localhost:3001/buyerprofile', {
    //   params: {
    //     emailcookie: this.state.emailcookie
    //   }
    // })
    //   .then((response) => {
    //     console.log(response.data)

    //     this.setState({
    //       username: response.data.username,
    //       email: response.data.email,
    //       phone: response.data.phone,
    //       imagePath: "http://localhost:3001/profilepics/" + response.data.profileimage + ""


    //     })
    //   });

    this.props.client.query({
      query: getBuyerProfile,
      // this.props.getBuyerProfile({
      variables: {
        email: this.state.emailcookie
      }
    }).then(response => {
      console.log("get buyerprofile", response);
      this.setState({
        username: response.data.getBuyerProfile[0].name,
        email: response.data.getBuyerProfile[0].email,
        phone: response.data.getBuyerProfile[0].phone
        // travelers: res.data.propertytraveler,
        // status: 200
      })
    }).catch(e => {
      console.log("error", e);
      this.setState({
        status: 400
      })
    })
  }

  //Image change handler
  imageChangeHandler = e => {
    // console.log('image change handle name: ' + e.target.name)
    // console.log('image change handle value: ' + e.target.files[0])
    this.setState({
      file: e.target.files[0]
    })
  }

  //Upoad image function:

  uploadImage = e => {
    e.preventDefault()
    // var headers = new Headers();
    const formData = new FormData()
    console.log(this.state.file.name)
    // var imagedata = document.querySelector('input[type="file"]').files[0];
    formData.append('myImage', this.state.file, this.state.file.name)
    formData.append('emailcookie', this.state.emailcookie)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios
      .post('http://localhost:3001/buyerprofileuploadimage', formData, config)
      .then(response => {
        console.log('The file is successfully uploaded')
        console.log(response.data.filename)
        this.setState({
          imagePath: "http://localhost:3001/profilepics/" + response.data.filename + ""

        })
      })
      .catch(error => { })
    // prevent page from refresh
  }

  render() {
    //redirect based on successful login
    let redirectVar = null;
    if (cookie.load("cookie")) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div>
        {/* {redirectVar} */}
        <div class="row">
          <div className="profile-img">

            <div class="col-md-10.5">
              <img
                // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                src={this.state.imagePath}
                id="icon"
                style={{ WebkitBorderRadius: "50%" }}
                alt="User Icon"
              />
            </div>
          </div>
        </div>


        <br></br>
        <div style={{ marginLeft: "45%" }}><input type="file" onChange={this.imageChangeHandler}></input></div>
        <br></br>
        <form onSubmit={this.uploadImage} enctype='multipart/form-data' style={{ textAlign: "Center" }}>
          <input type="submit" value="Update Picture" />
        </form>
        <div class="wrapper fadeInDown">
          <div id="formContent">
            <form onSubmit>
              <input
                onChange={this.usernameChangeHandler}
                type="text"
                id="username"
                class="fadeIn second"
                name="username"
                placeholder="Username"
                value={this.state.username}
              />
              <input
                onChange={this.emailChangeHandler}
                type="text"
                id="email"
                class="fadeIn second"
                name="email"
                placeholder="Email"
                disabled
                value={this.state.email}
              />

              <input
                onChange={this.phoneChangeHandler}
                type="text"
                id="phone"
                class="fadeIn third"
                name="phone"
                placeholder="Phone Number"
                value={this.state.phone}
              />
              <input type="submit" onClick={this.submitUpdate} class="fadeIn fourth" value="Update Profile!" />
            </form>


          </div>
        </div>
      </div >
    );
  }
}
//export Login Component
// export default Login;

export default compose(
  withApollo,
  graphql(getBuyerProfile, { name: "getBuyerProfile" }),
  graphql(UpdateBuyerMutation, { name: "UpdateBuyerMutation" })
)(BuyerProfile);