import { PersonType } from "@/types/PersonTypes";

async function fetchPerson(id: string): Promise<PersonType> {
    const res = await fetch(`https://api.themoviedb.org/3/person/${id}`, {
		headers: {
			Authorization: `Bearer ${process.env.TMDB_KEY}`,
		},
	});

    return await res.json();
}

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const person = await fetchPerson((await params).id);

	return Response.json(person);
}
