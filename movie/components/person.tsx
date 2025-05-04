"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

import type { PersonType } from "@/types/PersonTypes";

type PersonDetailType = PersonType & {
	biography: string;
};

const profile = "http://image.tmdb.org/t/p/w185";

export default function Person({ person }: { person: PersonType }) {
	const [cast, setCast] = useState<undefined | PersonDetailType>();
	const [isLoading, setIsLoading] = useState(false);

	async function fetchCast() {
		setIsLoading(true);

		const res = await fetch(`http://localhost:3000/person/${person.id}`);
		setCast(await res.json());
		setIsLoading(false);
	}

	return (
		<Dialog>
			<div className="w-[120px] flex flex-col items-center mb-4">
				{person.profile_path ? (
					<DialogTrigger onClick={() => fetchCast()}>
						<img
							src={profile + person.profile_path}
							alt={person.name}
						/>
					</DialogTrigger>
				) : (
					<div className="w-full h-[180px] bg-gray-400"></div>
				)}
				<div className="font-bold text-center">{person.name}</div>
				<div className="text-sm text-center">{person.character}</div>
			</div>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{person.name}</DialogTitle>
					<DialogDescription>
						<div className="max-h-[300px] overflow-y-auto">     
                            {isLoading ? "Loading..." : cast?.biography}
                        </div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
