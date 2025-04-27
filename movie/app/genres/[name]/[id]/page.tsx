import MovieList from "@/components/movie-list";
import type { MovieType } from "@/types/MovieTypes";

async function fetchMovies(id: string): Promise<MovieType[]> {
    const res = await fetch(
		`https://api.themoviedb.org/3/discover/movie?with_genres=${id}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.TMDB_KEY}`,
			},
		}
	);

    const data = await res.json();
    return data.results;
}

export default async function Genres({
	params,
}: {
	params: Promise<{ name: string; id: string }>;
}) {
    const { id, name } = await params;
	const movies = await fetchMovies(id);

	return (
		<div>
			<h2 className="font-bold mb-4 pb-2 border-b">{name}</h2>
			<MovieList movies={movies} />
		</div>
	);
}
