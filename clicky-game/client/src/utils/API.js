import axios from "axios";

export default {
  //Get the users
  getScores: function() {
    return axios.get("/api/scores")
  },
  getScore: function(id) {
    return axios.get("/api/scores/" + id)
  },
  deleteScore: function(id) {
    return axios.delete("/api/scores/" + id)
  },
  updateScore: function(id, scoreData){
    return axios.put("/api/scores/" + id, scoreData)
  },
  saveUser: function(scoreData){
    return axios.post("/api/scores", scoreData)
  },
  updateAll: function(scoreData){
    return axios.put("/api/scores", scoreData)
  }
};