export const API_BASE_URL = "https://rickandmortyapi.com/api";

export const API_ENDPOINTS = {
  CHARACTERS: {
    LIST: "/character",
    DETAILS: (id: string) => `/character/${id}`,
  },
  EPISODES: {
    LIST: "/episode",
    DETAILS: (id: string) => `/episode/${id}`,
  },
  LOCATIONS: {
    LIST: "/location",
    DETAILS: (id: string) => `/location/${id}`,
  },
};
