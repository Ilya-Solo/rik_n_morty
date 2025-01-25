import React from "react";
import { Character } from "@/core/repositories/character-repository";
import EpisodeCard from "./episode-element";

export default function CharacterPage({ character }: { character: Character }) {
  const { name, species, gender, status, image, episode } = character;

  return (
    <>
      <section className="character-page">
        <div className="character-main">
          <img className="character-avatar" src={image} alt={name} />
          <div className="character-info">
            <h1 className="character-name">{name}</h1>
            <div className="character-status">{status}</div>
            <div className="character-species">{species}</div>
            <div className="character-gender">{gender}</div>
          </div>
        </div>
        {episode && episode.length > 0 && (
          <div className="episode-list">
            <h2>Episodes</h2>
            <ul>
              {episode.map((ep) => (
                <li key={ep}>
                  <EpisodeCard episodeUrl={ep} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <style>{`
        .character-page {
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
          font-family: Arial, sans-serif;
        }
        .character-main {
          display: flex;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .character-avatar {
          max-width: 200px;
          border-radius: 8px;
          margin-right: 20px;
        }
        .character-info {
          flex: 1;
        }
        .character-name {
          font-size: 2rem;
          color: #0e6b50;
          margin-bottom: 10px;
        }
        .character-status,
        .character-species, 
        .character-gender {
          font-size: 1.1rem;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .episode-list h2 {
          font-size: 1.25rem;
          margin-bottom: 10px;
          color: #0e6b50;
        }
        .episode-list ul {
          list-style: inside disc;
          margin: 0;
          padding: 0;
        }
        .episode-list li {
          list-style: none;
          margin-bottom: 5px;
        }
      `}</style>
    </>
  );
}
