import React from "react";
import { Episode } from "@/core/repositories/episode-repository";
import CharacterElement from "./character-element";

export default function EpisodePage({ episode }: { episode: Episode }) {
  const { name, air_date, episode: code, characters } = episode;

  return (
    <>
      <section className="episode-page">
        <div className="episode-main">
          <div className="episode-info">
            <h1 className="episode-name">{name}</h1>
            <div className="episode-code">Код: {code}</div>
            <div className="episode-date">Дата выхода: {air_date}</div>
          </div>
        </div>
        {characters && characters.length > 0 && (
          <div className="character-list">
            <h2>Персонажи</h2>
            <ul>
              {characters.map((charUrl) => (
                <li key={charUrl}>
                  <CharacterElement characterUrl={charUrl} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <style>{`
        .episode-page {
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
          font-family: Arial, sans-serif;
        }

        .episode-main {
          display: flex;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .episode-info {
          flex: 1;
        }

        .episode-name {
          font-size: 2rem;
          color: #0e6b50;
          margin-bottom: 10px;
        }

        .episode-code,
        .episode-date {
          font-size: 1.1rem;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .character-list h2 {
          font-size: 1.25rem;
          margin-bottom: 10px;
          color: #0e6b50;
        }

        .character-list ul {
          list-style: inside disc;
          margin: 0;
          padding: 0;
        }

        .character-list li {
          list-style: none;
          margin-bottom: 5px;
        }
      `}</style>
    </>
  );
}
