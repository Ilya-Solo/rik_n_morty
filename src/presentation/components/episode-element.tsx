"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useEpisodeService } from "@/core/providers/episode-service-provider";
import { Episode } from "@/core/services/episode-service";

interface EpisodeElementProps {
  episodeUrl: string;
}

export default function EpisodeElement({ episodeUrl }: EpisodeElementProps) {
  const episodeService = useEpisodeService();
  const [episodeData, setEpisodeData] = useState<Episode | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEpisode() {
      try {
        setLoading(true);
        setError(null);

        const episodeId = episodeService.getEpisodeId(episodeUrl);
        const data = await episodeService.getEpisodeById(episodeId);
        setEpisodeData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadEpisode();
  }, [episodeService, episodeUrl]);

  if (loading) {
    return <div>Загрузка эпизода...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!episodeData) {
    return null;
  }

  const episodeId = episodeService.getEpisodeId(episodeUrl);

  return (
    <Link href={`/episodes/${episodeId}`} className="episode-link">
      <div className="episode-block">
        <h2 className="episode-name">{episodeData.name}</h2>
        <p className="episode-code">Код эпизода: {episodeData.episode}</p>
        <p className="episode-airdate">Дата выхода: {episodeData.air_date}</p>
      </div>

      <style jsx>{`
        .episode-link {
          text-decoration: none;
          color: inherit;
        }
        .episode-block {
          margin: 20px 0;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
          max-width: 600px;
          transition: box-shadow 0.3s;
        }
        .episode-block:hover {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }
        .episode-name {
          font-size: 1.3rem;
          margin-bottom: 5px;
          color: #0e6b50;
        }
        .episode-code,
        .episode-airdate {
          margin: 4px 0;
          font-weight: bold;
        }
      `}</style>
    </Link>
  );
}
