import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PortfolioSetting.css";

class PortfolioSetting extends React.Component {
  state = {
    query: "",
    data: [],
    filteredData: {},
  };

  handleInputChange = (event) => {
    const query = event.target.value;
    this.setState((prevState) => {
      const filteredData = prevState.data.filter((element) => {
        return element.username.toLowerCase().includes(query.toLowerCase());
      });

      return {
        query,
        filteredData,
      };
    });
  };

  getData = (e) => {
    e.preventDefault();
    const search = this.state.query;
    axios.get("/all/" + search).then((res) => {
      if (res.data) {
        const filteredData = res.data;
        this.setState({
          res,
          filteredData,
        });
      } else {
        const filteredData = { username: "No matching username" };
        this.setState({
          res,
          filteredData,
        });
      }
    });
  };

  render() {
    return (
      <>
        <div className="searchForm">
          <form onSubmit={this.getData}>
            <input
              placeholder="Search for..."
              value={this.state.query}
              onChange={this.handleInputChange}
            />
            <button
              className="btn btn-dark btn-lg btn-block mt-4"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <div>
          <button>Edit</button>
          <div className="resultsDiv">
            <h4>{this.state.filteredData.username} </h4>
          </div>
          <div className="resultsDiv">
            <h4>{this.state.filteredData.firstName} </h4>
          </div>
          <div className="resultsDiv">
            <h4>{this.state.filteredData.lastName} </h4>
          </div>
          <div className="resultsDiv">
            <h4>{this.state.filteredData.email} </h4>
          </div>
          <div className="resultsDiv">
            <h4>{this.state.filteredData.role} </h4>
          </div>
          <div className="resultsDiv">
            <h4>{this.state.filteredData.category} </h4>
          </div>
          <div className="resultsDiv">
            <h4>{this.state.filteredData.city} </h4>
          </div>
          <div className="resultsDiv">
            <h4>{this.state.filteredData.state} </h4>
          </div>
          <div className="resultsDiv">
            <h4>{this.state.filteredData.zipcode} </h4>
          </div>
        </div>
      </>
    );
  }
}

export default PortfolioSetting;
