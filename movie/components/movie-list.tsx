import Link from "next/link";

import type { MovieType } from "@/types/MovieTypes";

const poster = "http://image.tmdb.org/t/p/w342";

export default async function MovieList({ movies }: { movies: MovieType[] }) {
	return (
		<div className="flex flex-wrap gap-4">
			{movies.map(movie => {
				return (
					<div
						key={movie.id}
						className="w-[200px] mb-4 flex flex-col items-center">
						<Link href={`/movie/${movie.id}`}>
							<img
                                className="hover:scale-105 transition-all"
								src={poster + movie.poster_path}
								alt={movie.title}
							/>
						</Link>
						<div className="font-bold text-center">
							{movie.title}
						</div>
						<div className="text-sm">
							{movie.release_date.split("-")[0]}
						</div>
					</div>
				);
			})}
		</div>
	);
}
