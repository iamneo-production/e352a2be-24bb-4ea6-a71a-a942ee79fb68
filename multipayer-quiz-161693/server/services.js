
const Axios = require("axios");

const getTriviaQuestions = () => {
  return Axios.get(`http://localhost:8080/questions`)
    .then((res) => {
      // console.log("Response from server:", res.data);
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

const updateUserdata = async (id, data) => {
  const url = `http://localhost:8080/users/${id}`;
  console.log(`Sending PUT request to: ${url}`);
  console.log('Data to send:', data);

  try {
    const response = await Axios.put(url, data);

    if (response.status === 200) {
      console.log('Update successful:', response.data);
      return response.data;
    } else {
      console.error('Update failed with status code:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};


const findUserByEmail = async (email) => {
    try {
        const response = await Axios.get('http://localhost:8080/users', {
            params: {
                email: email
            },
        });

        if (response.data.length > 0) {
            return response.data[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error finding user:', error);
        return null;
    }
};

module.exports = {
  getTriviaQuestions,
  updateUserdata,
  findUserByEmail
};
