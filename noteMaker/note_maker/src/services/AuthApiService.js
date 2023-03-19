const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const registerUser = async (body) => {
//   const token = localStorage.getItem("TOKEN");
//   console.log(token);
  try {
    const response = await fetch(`${apiBaseUrl}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
