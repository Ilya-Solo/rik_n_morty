import { z } from "zod";

export interface CharacterRepositoryInterface {
  getCharacters: (page: string) => Promise<CharacterPage>;
  getCharacterById: (id: string) => Promise<Character>;
  getCharacterId: (url: string) => string;
}

const PaginationInfoSchema = z.object({
  count: z.number(),
  pages: z.number(),
  next: z.string().url().nullable(),
  prev: z.string().url().nullable(),
});

export const LocationSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

export const CharacterSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(["Alive", "Dead", "unknown"]),
  species: z.string(),
  type: z.string().optional(),
  gender: z.enum(["Male", "Female", "Genderless", "unknown"]),
  origin: LocationSchema,
  location: LocationSchema,
  image: z.string().url(),
  episode: z.array(z.string().url()),
  url: z.string().url(),
  created: z.string(),
});

const CharacterPageSchema = z.object({
  info: PaginationInfoSchema,
  results: z.array(CharacterSchema),
});

export type Character = z.infer<typeof CharacterSchema>;
export type CharacterPage = z.infer<typeof CharacterPageSchema>;
