"use client";

import React from "react";
import { useCharacterService } from "@/core/providers/character-service-provider";

const Button: React.FC = () => {
  const characterService = useCharacterService();

  const onClick = async () => {
    const data = await characterService.getCharacterById(1);
    console.log(data);
  };

  return <button onClick={onClick}>Press on me</button>;
};

export default Button;
