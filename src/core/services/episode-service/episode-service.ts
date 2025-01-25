import {
  Episode,
  EpisodeList,
  EpisodeServiceInterface,
} from "./episode-service-interface";

import { EpisodeRepository } from "@/core/repositories/episode-repository";

export default class EpisodeService implements EpisodeServiceInterface {
  private characterRepository: EpisodeRepository;

  constructor() {
    this.characterRepository = new EpisodeRepository();
  }

  async getEpisodeById(id: string): Promise<Episode> {
    return this.characterRepository.getEpisodeById(id);
  }

  async getEpisodesList(page: string = "1"): Promise<EpisodeList> {
    return this.characterRepository.getEpisodesList(page);
  }

  getEpisodeId(url: string): string {
    return this.characterRepository.getEpisodeId(url);
  }
}
