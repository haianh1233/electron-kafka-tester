import apiClient from "./apiClient";

export const getCluster = (id) => apiClient.get(`/clusters/${id}`);

export const getClusterHealth = (id) => apiClient.get(`/clusters/${id}/health`);

export const getClusters = () => apiClient.get("/clusters");

export const addCluster = (data) => apiClient.post("/clusters", data);

export const deleteCluster = (id) => apiClient.delete(`/clusters/${id}`);