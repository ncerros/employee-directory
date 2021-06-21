import axios from "axios";

export default {
    // Fetch users
    getUsers: function () {
      return axios.get("https://randomuser.me/api/?results=250&nat=gb");
    },
  };

