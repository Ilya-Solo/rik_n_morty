"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCharacterService } from "@/core/providers/character-service-provider";
import { Character } from "@/core/services/character-service";

interface CharacterElementProps {
  characterUrl: string;
}

export default function CharacterElement({
  characterUrl,
}: CharacterElementProps) {
  const characterService = useCharacterService();
  const [characterData, setCharacterData] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCharacter() {
      try {
        setLoading(true);
        setError(null);

        const characterId = characterService.getCharacterId(characterUrl);

        const data = await characterService.getCharacterById(characterId);
        setCharacterData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCharacter();
  }, [characterService, characterUrl]);

  if (loading) {
    return <div>Загрузка персонажа...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!characterData) {
    return null;
  }

  const characterId = characterService.getCharacterId(characterUrl);

  return (
    <Link href={`/characters/${characterId}`} className="character-link">
      <div className="character-block">
        <img
          className="character-image"
          src={characterData.image}
          alt={characterData.name}
        />
        <div className="character-details">
          <h2 className="character-name">{characterData.name}</h2>
          <p className="character-status">Статус: {characterData.status}</p>
          <p className="character-species">Вид: {characterData.species}</p>
          <p className="character-gender">Пол: {characterData.gender}</p>
        </div>
      </div>

      <style jsx>{`
        .character-link {
          text-decoration: none;
          color: inherit; /* Ссылки будут наследовать цвет от .character-block */
        }

        .character-block {
          display: flex;
          align-items: flex-start;
          margin: 20px 0;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
          max-width: 600px;
          transition: box-shadow 0.3s;
        }

        .character-block:hover {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        .character-image {
          max-width: 100px;
          border-radius: 8px;
          margin-right: 15px;
        }

        .character-details {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .character-name {
          font-size: 1.2rem;
          margin-bottom: 5px;
          color: #0e6b50;
        }

        .character-status,
        .character-species,
        .character-gender {
          margin: 2px 0;
          font-weight: bold;
        }
      `}</style>
    </Link>
  );
}
