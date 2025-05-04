import type { MovieType } from "@/types/MovieTypes";
import type { PersonType } from "@/types/PersonTypes";
import Person from "@/components/person";

async function fetchMovie(id: string): Promise<MovieType> {
	const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
		headers: {
			Authorization: `Bearer ${process.env.TMDB_KEY}`,
		},
	});

	return await res.json();
}

async function fetchCast(id: string): Promise<PersonType[]> {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${id}/credits`,
		{
			headers: {
				Authorization: `Bearer ${process.env.TMDB_KEY}`,
			},
		}
	);

	const data = await res.json();
	return data.cast;
}

const backdrop = "http://image.tmdb.org/t/p/w1280";

export default async function Movie({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const movie = await fetchMovie(id);
	const persons = await fetchCast(id);

	return (
		<div>
			<h2 className="mb-4 pb-2 border-b font-bold text-lg">
				{movie.title} ({movie.release_date.split("-")[0]})
			</h2>
			<img
				src={backdrop + movie.backdrop_path}
				alt={movie.title}
			/>
			<div className="mt-4">{movie.overview}</div>

			<h2 className="my-4 pb-2 border-b font-bold text-lg">Cast</h2>
			<div className="flex flex-wrap gap-4">
				{persons.map(person => {
					return <Person key={person.id} person={person} />;
				})}
			</div>
		</div>
	);
}

