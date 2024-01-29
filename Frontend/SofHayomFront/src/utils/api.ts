import axios from 'axios';

const API_BASE_URL = 'https://3b24-46-117-92-28.ngrok-free.app/api'; // Replace with your API base URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
});


// GET request
export const fetchSomething = async (): Promise<SomeType[]> => {
  try {
    const response = await apiService.get<SomeType[]>('/some-endpoint');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// POST request
export const createSomething = async (data: SomePostType): Promise<SomeResponseType> => {
  try {
    const response = await apiService.post<SomeResponseType>('/some-endpoint', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// PUT request
export const updateSomething = async (id: number, data: SomePutType): Promise<SomeResponseType> => {
  try {
    const response = await apiService.put<SomeResponseType>(`/some-endpoint/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// DELETE request
export const deleteSomething = async (id: number): Promise<void> => {
  try {
    await apiService.delete(`/some-endpoint/${id}`);
  } catch (error) {
    throw error;
  }
};

// Define types for your requests and responses
type SomeType = {   id: number;  name: string;};
type SomePostType = {   id: number;  name: string;};
type SomePutType = {   id: number;  name: string;};
type SomeResponseType = {   id: number;  name: string;};

export {API_BASE_URL}
export default apiService;
