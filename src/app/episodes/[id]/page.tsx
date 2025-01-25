import React from "react";
import EpisodeService from "@/core/services/episode-service/episode-service";
import EpisodePage from "@/presentation/components/episode-page";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const episodeService = new EpisodeService();
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const episode = await episodeService.getEpisodeById(id);

  return <EpisodePage episode={episode} />;
}
