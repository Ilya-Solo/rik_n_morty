import axios, { AxiosInstance } from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "@/infrastructure/api/apiEndpoint";
import {
  EpisodeRepositoryInterface,
  EpisodeList,
  Episode,
} from "./episode-repository-interface";

export class EpisodeRepository implements EpisodeRepositoryInterface {
  private http: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL) {
    this.http = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getEpisodesList(page: string = "1"): Promise<EpisodeList> {
    try {
      const response = await this.http.get(
        `${API_ENDPOINTS.EPISODES.LIST}?page=${page}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Ошибка получения данных о персонажах");
    }
  }

  async getEpisodeById(id: string): Promise<Episode> {
    try {
      const response = await this.http.get(
        `${API_ENDPOINTS.EPISODES.DETAILS(id)}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Ошибка получения данных о персонаже");
    }
  }

  getEpisodeId(url: string): string {
    const parts = url.split("/");
    const id = parts.at(-1);
    if (!id) {
      throw new Error(`Невозможно определить ID из URL: ${url}`);
    }
    return id;
  }
}
