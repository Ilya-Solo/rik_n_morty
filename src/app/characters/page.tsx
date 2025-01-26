"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCharacterService } from "@/core/providers/character-service-provider";
import { Character } from "@/core/services/character-service";

export default function CharacterSelectionPage() {
  const characterService = useCharacterService();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Считываем параметр "?page=..." из URL.
  // Если его нет, выставляем 1 по умолчанию.
  const initialPage = parseInt(searchParams.get("page") || "1", 10) || 1;

  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загружаем данные при изменении текущей страницы.
  useEffect(() => {
    async function loadCharacters() {
      try {
        setLoading(true);
        setError(null);

        // Предполагаем, что ваш сервис возвращает
        // { info: { pages: number }, results: Character[] }
        const data = await characterService.getCharacters(
          currentPage.toString()
        );
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCharacters();
  }, [characterService, currentPage]);

  // Когда currentPage изменился, нужно обновить URL:
  // "?page=currentPage"
  useEffect(() => {
    // Сформируем новый URL с параметром page
    router.replace(`?page=${currentPage}`);
  }, [currentPage, router]);

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
      <section className="character-selection-page">
        <h1>Выбор персонажа (Страница {currentPage})</h1>

        {loading && <div className="loading">Загрузка персонажей...</div>}
        {error && <div className="error">Ошибка: {error}</div>}

        {!loading && !error && (
          <div className="characters-list">
            {characters.map((char) => (
              <a
                key={char.id}
                href={`/characters/${char.id}`} // Или Link из next/link, если хотите SPA-навигацию
                className="character-card"
              >
                <img
                  src={char.image}
                  alt={char.name}
                  className="character-image"
                />
                <h2 className="character-name">{char.name}</h2>
                <p className="character-status">Статус: {char.status}</p>
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
        .character-selection-page {
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

        .characters-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 16px;
          margin-bottom: 30px;
        }

        .character-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: inherit;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 10px;
          background-color: #f9f9f9;
          transition: box-shadow 0.3s;
        }

        .character-card:hover {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .character-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
          margin-bottom: 8px;
        }

        .character-name {
          font-size: 1.1rem;
          margin-bottom: 4px;
        }

        .character-status {
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
