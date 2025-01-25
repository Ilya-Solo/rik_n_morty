import React from "react";
import CharacterService from "@/core/services/character-service/character-service";
import CharacterPage from "@/presentation/components/character-page";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const characterService = new CharacterService();
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const character = await characterService.getCharacterById(id);

  return <CharacterPage character={character} />;
}
