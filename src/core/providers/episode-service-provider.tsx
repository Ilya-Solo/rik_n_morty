"use client";

import React, { createContext, useContext, ReactNode, useRef } from "react";
import EpisodeService from "@/core/services/episode-service/episode-service";

interface EpisodeServiceContextType {
  episodeService: EpisodeService;
}

const EpisodeServiceContext = createContext<
  EpisodeServiceContextType | undefined
>(undefined);

export const EpisodeServiceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const episodeServiceRef = useRef<EpisodeService | null>(null);

  if (!episodeServiceRef.current) {
    episodeServiceRef.current = new EpisodeService();
  }

  return (
    <EpisodeServiceContext.Provider
      value={{ episodeService: episodeServiceRef.current }}
    >
      {children}
    </EpisodeServiceContext.Provider>
  );
};

export const useEpisodeService = (): EpisodeService => {
  const context = useContext(EpisodeServiceContext);
  if (!context) {
    throw new Error(
      "useEpisodeService must be used within a EpisodeServiceProvider"
    );
  }
  return context.episodeService;
};
