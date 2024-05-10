"use client";

import { useState } from "react";
import { useQuery } from "react-query";

import MoviesTable from "./_components/Table";
import MovieCreate from "./_components/MovieCreate";
import MovieFilters from "./_components/MovieFilters";
import { GetMoviesParams } from "@lib/types";
import { getMovies } from "@lib/api";
import LoadingSpinner from "@components/LoadingSpinner";

const DashboardMoviesPage = () => {
  const [movieFilters, setMovieFilters] = useState<GetMoviesParams>({
    createdAt: "desc",
  });

  const { data, isLoading } = useQuery(["movies", movieFilters], () => getMovies(movieFilters), {
    keepPreviousData: true,
  });

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-4xl">Фильмы</h2>
        <div className="flex justify-between">
          <MovieFilters setFilters={setMovieFilters} />
          <MovieCreate />
        </div>
      </div>
      {isLoading ? (
        <div className="mt-36">
          <LoadingSpinner size={50} />
        </div>
      ) : (
        <MoviesTable setFilters={setMovieFilters} moviesResponse={data} />
      )}
    </div>
  );
};

export default DashboardMoviesPage;
