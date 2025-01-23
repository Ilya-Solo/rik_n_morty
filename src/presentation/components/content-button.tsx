"use client";

import React from "react";
import { useCharacterService } from "@/core/providers/character-service-provider";
import { useTranslation } from "react-i18next";

interface ButtonProps {
  id: string;
}

const Button: React.FC<ButtonProps> = async ({ id }) => {
  const characterService = useCharacterService();
  const { t } = useTranslation("common");

  const character = await characterService.getCharacterById(id);
  const onClick = () => {
    console.log(character);
  };

  return <button onClick={onClick}>{t("welcome")}</button>;
};

export default Button;
