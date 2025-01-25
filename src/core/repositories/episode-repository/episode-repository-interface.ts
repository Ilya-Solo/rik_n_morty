import { z } from "zod";

export interface EpisodeRepositoryInterface {
  getEpisodesList: (page: string) => Promise<EpisodeList>;
  getEpisodeById: (id: string) => Promise<Episode>;
  getEpisodeId: (url: string) => string;
}

export const EpisodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  air_date: z.string(),
  episode: z.string(),
  characters: z.array(z.string().url()),
  url: z.string().url(),
  created: z.string().datetime(),
});

export type Episode = z.infer<typeof EpisodeSchema>;

export const EpisodeListInfoSchema = z.object({
  count: z.number(),
  pages: z.number(),
  next: z.string().url().nullable(),
  prev: z.string().url().nullable(),
});

export const EpisodeListSchema = z.object({
  info: EpisodeListInfoSchema,
  results: z.array(EpisodeSchema),
});

export type EpisodeList = z.infer<typeof EpisodeListSchema>;
