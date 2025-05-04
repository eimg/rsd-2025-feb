import { MovieType } from "@/types/MovieTypes";
import MovieList from "@/components/movie-list";

async function fetchSearch(q: string): Promise<MovieType[]> {
	const res = await fetch(
		`https://api.themoviedb.org/3/search/movie?query=${q}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.TMDB_KEY}`,
			},
		}
	);

	const data = await res.json();
	return data.results;
}

export default async function Search({
	searchParams,
}: {
	searchParams: { q: string };
}) {
	const q = searchParams.q;
    const movies = await fetchSearch(q);

	return <div>
        <h2 className="mb-4 pb-2 border-b">Search: {q}</h2>
        <MovieList movies={movies} />
    </div>;
}
