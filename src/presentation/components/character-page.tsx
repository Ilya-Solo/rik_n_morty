import React from "react";
import { Character } from "@/core/repositories/character-repository";

export default function CharacterPage({ character }: { character: Character }) {
  const { name, species, status, image, episode } = character;

  return (
    <section>
      <h1>{name}</h1>
      <img src={image} alt={name} />
      <div>{status}</div>
      <div>{species}</div>
      {episode && (
        <ul>
          {episode.map((epis) => (
            <li key={epis}>{epis}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
