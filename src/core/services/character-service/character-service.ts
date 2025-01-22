import {
  Character,
  CharacterPage,
  CharacterServiceInterface,
} from "./character-service-interface";

import { CharacterRepository } from "@/core/repositories/character-repository";

export default class CharacterService implements CharacterServiceInterface {
  private characterRepository: CharacterRepository;

  constructor() {
    this.characterRepository = new CharacterRepository();
  }

  async getCharacterById(id: number): Promise<Character> {
    return this.characterRepository.getCharacterById(id);
  }

  async getCharacters(page: number = 1): Promise<CharacterPage> {
    return this.characterRepository.getCharacters(page);
  }
}
