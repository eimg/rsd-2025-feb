import MovieList from "@/components/movie-list";
import type { MovieType } from "@/types/MovieTypes";

async function fetchPopular(): Promise<MovieType[]> {
    const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_KEY}`
        }
    });

    const data = await res.json();
    return data.results;
}

export default async function Home() {
    const popular = await fetchPopular();

	return (
		<div>
            <h2 className="font-bold mb-4 pb-2 border-b">Popular</h2>
            <MovieList movies={popular} />
		</div>
	);
}
