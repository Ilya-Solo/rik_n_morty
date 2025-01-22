export const API_BASE_URL = "https://rickandmortyapi.com/api";

export const API_ENDPOINTS = {
  CHARACTERS: {
    LIST: "/character",
    DETAILS: (id: number) => `/character/${id}`,
  },
  EPISODES: {
    LIST: "/episode",
    DETAILS: (id: number) => `/episode/${id}`,
  },
  LOCATIONS: {
    LIST: "/location",
    DETAILS: (id: number) => `/location/${id}`,
  },
};
