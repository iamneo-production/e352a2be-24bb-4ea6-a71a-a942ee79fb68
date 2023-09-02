
// const fetch = require("node-fetch");
const Axios = require("axios");

const getTriviaQuestions = () => {
  return Axios.get(`http://localhost:8080/questions`)
    .then((res) => {
      console.log("Response from server:", res.data);
      return res.data})
    // .then((json) => {
    //   if (json.response_code !== 0) {
    //     throw new Error(`Error Code  with ${json.response_code}`);
    //   } else {
    //     return json.results;
    //   }
    // })
    .catch((err) => {
      throw new Error(err.message || "Get trivia questions failed");
    });
};

const postDataToServer=(data)=>{
  return Axios.post(`http://localhost:8080/users/`,data)
              .then((res)=>{console.log(res.data)
                    return res.data})
              .catch((err)=>{
                  throw new Error(err.message || "posting the data failed");
              });

}

module.exports = {
  getTriviaQuestions,
  postDataToServer
};
