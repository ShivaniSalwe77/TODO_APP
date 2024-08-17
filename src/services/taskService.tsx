import axios from 'axios';

interface TaskDetails {
  itemId: number;
  taskName: string;
  taskDescription: string;
  dueDate: string;
  createdOn: string;
  isCompleted: boolean;
  tags: string;
  completedOn: string;
}
const BASE_URL = 'https://freeapi.miniprojectideas.com/api/JWT';

export const getAllTasks = async () => {
  const response = await axios.get(`${BASE_URL}/GetAllTaskList`);
  return response.data.data;
};

export const deleteTask = async (itemId: number) => {
  const url = `${BASE_URL}/DeleteTask?itemId=${itemId}`;
  const response = await axios.delete(url);
  return response.status === 200;
};

export const createNewTask = async (taskDetails: TaskDetails) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/CreateNewTask`,
      taskDetails,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Fetching API error', error);
    throw error;
  }
};

export const updateTask = async (taskDetails: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/UpdateTask`, taskDetails, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fetching API error', error);
    throw error;
  }
};
