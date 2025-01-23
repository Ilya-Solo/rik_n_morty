"use client";

import React, { createContext, useContext, ReactNode, useRef } from "react";
import CharacterService from "@/core/services/character-service/character-service";

interface CharacterServiceContextType {
  characterService: CharacterService;
}

const CharacterServiceContext = createContext<
  CharacterServiceContextType | undefined
>(undefined);

export const CharacterServiceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const characterServiceRef = useRef<CharacterService | null>(null);

  if (!characterServiceRef.current) {
    characterServiceRef.current = new CharacterService();
  }

  return (
    <CharacterServiceContext.Provider
      value={{ characterService: characterServiceRef.current }}
    >
      {children}
    </CharacterServiceContext.Provider>
  );
};

export const useCharacterService = (): CharacterService => {
  const context = useContext(CharacterServiceContext);
  if (!context) {
    throw new Error(
      "useCharacterService must be used within a CharacterServiceProvider"
    );
  }
  return context.characterService;
};
