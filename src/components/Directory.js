import React, { Component } from "react";
import Employees from "./Employees.js";
import Search from "./Search.js";
import Api from "../utils/Api";
import "../styles/Directory.css";

class Directory extends Component {
  state = {
    employees: [],
    empSort: [],
    search: "",
    sorted: false,
  };

  // Will execute the code when the components are in the DOM
  componentDidMount = () => {
    Api.getUsers().then((results) => {
      this.setState({
        employees: results.data.results,
      });
    });
  };

  //The search term will be implemented to sort employees 
  // empSort will render a match
  sortEmp = () => {
    let { employees, search } = this.state;
    let empSort = employees.filter((sorted) => {
      return (
        sorted.name.first.toLowerCase().includes(search.toLowerCase()) ||
        sorted.name.last.toLowerCase().includes(search.toLowerCase()) ||
        sorted.email.toLowerCase().includes(search.toLowerCase())
      );
    });
    this.setState({ empSort });
  };

  // Sort will be activated 
  startSort = (event) => {
    this.setState({ search: event.target.value }, () => {
      this.sortEmp();
      this.setState({ sorted: true });
    });
  };

  render = () => {
    return (
      <div className="background">
        <div className="jumbotron jumbotron-fluid">
          <h2 className="display-4">Employee Directory</h2>
          <p> Search for an employee by entering their name or email below.</p>
          <Search name="search" startSort={this.startSort} label="Search" />
        </div>

        <div className="container-fluid">
          <table className="table table-dark table-striped table-hover table-bordered table-condensed">
            <thead className="thead">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date of Birth</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {