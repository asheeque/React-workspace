const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const fetchUserTasks = async () => {

  const token = localStorage.getItem("TOKEN")
  try {
    const response = await fetch(`${apiBaseUrl}/users/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTaskFromDB = async (taskId) => {

  const token = localStorage.getItem("TOKEN")
  try {
    const response = await fetch(`${apiBaseUrl}/users/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
};


export const addUserTask = async (task) => {
    const token = localStorage.getItem("TOKEN")
    
    try {
      const response = await fetch(`${apiBaseUrl}/users/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(task)
      });
  
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }
  };


  export const changeTaskStatusOnDB = async (taskId,status) => {

    const token = localStorage.getItem("TOKEN")
    // const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const body = {
      "status":status
    }
    try {
      const response = await fetch(`${apiBaseUrl}/users/tasks/${taskId}/status`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
  
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  export const addSubTaskToDB = async (body) => {

    const token = localStorage.getItem("TOKEN")
  
    try {
      const response = await fetch(`${apiBaseUrl}/subtasks`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
  
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  
  export const changeSubtaskStatusOnDB = async (subtaskId,status) => {

    const token = localStorage.getItem("TOKEN")
    
    const body = {
      "newStatus":status,
      "subtaskId":subtaskId
    }
    try {
      const response = await fetch(`${apiBaseUrl}/subtasks/update-status`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };


  export const deleteSubtaskFromDB = async (subtaskId) => {

    const token = localStorage.getItem("TOKEN");
    
    try {
      const response = await fetch(`${apiBaseUrl}/subtasks/${subtaskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
  
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  export const updateUserTask = async (taskId,body) => {
    const token = localStorage.getItem("TOKEN")
    try {
      const response = await fetch(`${apiBaseUrl}/users/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
  
      const data = await response.json();
      // console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }
  };