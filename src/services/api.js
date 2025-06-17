// src/services/api.js
const API_URL = 'http://192.168.68.137:3001';  // Backend server IP

export const todoApi = {
  // Get all todos
  getAll: async () => {
    const response = await fetch(`${API_URL}/todos`);
    return response.json();
  },

  // Create new todo
  create: async (name) => {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    return response.json();
  },

  // Update todo (mark as completed)
  update: async (id) => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isCompleted: true }),
    });
    return response.json();
  },

  // Edit todo name
  edit: async (id, newName) => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newName }),
    });
    return response.json();
  },

  // Delete todo
  delete: async (id) => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};