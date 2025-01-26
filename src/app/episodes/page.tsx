"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEpisodeService } from "@/core/providers/episode-service-provider";
import { Episode } from "@/core/services/episode-service";

export default function EpisodeSelectionPage() {
  const episodeService = useEpisodeService();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Считываем "?page=..." из URL или выставляем 1
  const initialPage = parseInt(searchParams.get("page") || "1", 10) || 1;

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка эпизодов при изменении currentPage
  useEffect(() => {
    async function loadEpisodes() {
      try {
        setLoading(true);
        setError(null);

        // Сервис возвращает структуру { info, results }
        const data = await episodeService.getEpisodesList(
          currentPage.toString()
        );
        setEpisodes(data.results);
        setTotalPages(data.info.pages);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadEpisodes();
  }, [episodeService, currentPage]);

  // Обновляем URL при изменении currentPage, например "?page=2"
  useEffect(() => {
    router.replace(`?page=${currentPage}`);
  }, [currentPage, router]);

  // Хендлеры пагинации
  function handlePrev() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  return (
    <>
      <section className="episode-selection-page">
        <h1>Список эпизодов (Страница {currentPage})</h1>

        {loading && <div className="loading">Загрузка эпизодов...</div>}
        {error && <div className="error">Ошибка: {error}</div>}

        {!loading && !error && (
          <div className="episodes-list">
            {episodes.map((ep) => (
              <a
                key={ep.id}
                href={`/episodes/${ep.id}`} // или Link, если хотите SPA-навигацию
                className="episode-card"
              >
                <h2 className="episode-name">{ep.name}</h2>
                <p className="episode-code">Код: {ep.episode}</p>
                <p className="episode-airdate">Дата выхода: {ep.air_date}</p>
              </a>
            ))}
          </div>
        )}

        <div className="pagination-controls">
          <button onClick={handlePrev} disabled={currentPage <= 1}>
            Предыдущая
          </button>
          <span className="page-info">
            Страница {currentPage} из {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage >= totalPages}>
            Следующая
          </button>
        </div>
      </section>

      <style jsx>{`
        .episode-selection-page {
          max-width: 900px;
          margin: 40px auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
          color: #0e6b50;
        }

        .loading {
          text-align: center;
          color: #666;
          margin-bottom: 20px;
        }

        .error {
          text-align: center;
          color: red;
          margin-bottom: 20px;
        }

        .episodes-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 30px;
        }

        .episode-card {
          text-decoration: none;
          color: inherit;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 10px;
          background-color: #f9f9f9;
          transition: box-shadow 0.3s;
        }

        .episode-card:hover {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .episode-name {
          font-size: 1.1rem;
          margin-bottom: 4px;
          color: #0e6b50;
        }

        .episode-code,
        .episode-airdate {
          margin: 4px 0;
          font-weight: bold;
        }

        .pagination-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
        }

        button {
          padding: 8px 16px;
          background-color: #0e6b50;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .page-info {
          font-weight: bold;
        }
      `}</style>
    </>
  );
}
