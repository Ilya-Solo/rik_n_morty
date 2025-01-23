import axios, { AxiosInstance } from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "@/infrastructure/api/apiEndpoint";
import {
  CharacterRepositoryInterface,
  CharacterPage,
  Character,
} from "./character-repository-interface";

export class CharacterRepository implements CharacterRepositoryInterface {
  private http: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL) {
    this.http = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getCharacters(page: string = "1"): Promise<CharacterPage> {
    try {
      const response = await this.http.get(
        `${API_ENDPOINTS.CHARACTERS.LIST}?page=${page}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Ошибка получения данных о персонажах");
    }
  }

  async getCharacterById(id: string): Promise<Character> {
    try {
      const response = await this.http.get(
        `${API_ENDPOINTS.CHARACTERS.DETAILS(id)}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Ошибка получения данных о персонаже");
    }
  }
}
