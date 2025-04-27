import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Next Movie",
	description: "Next.js Movie App",
};

type GenresType = {
	id: number;
	name: string;
};

async function getGenres(): Promise<GenresType[]> {
	const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
		headers: {
			Authorization: `Bearer ${process.env.TMDB_KEY}`,
		},
	});

	const data = await res.json();
	return data.genres;
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const genres = await getGenres();

    async function search(data: FormData) {
        "use server";
        const q = data.get("q");
        redirect(`/search?q=${q}`);
    }

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<div className="p-4 border-b flex items-center justify-between">
					<h1 className="text-2xl font-bold">Next Movie</h1>
					<form className="flex items-center gap-2" action={search}>
						<Input placeholder="Search Movies..." name="q" />
						<Button type="submit">Search</Button>
					</form>
				</div>
				<div className="flex">
					<div className="w-[250px] flex flex-col gap-1 p-4 border-r">
						<Button
							variant="outline"
							className="justify-start"
							asChild>
							<Link
								href="/"
								className="flex items-center gap-2">
								<svg
									width="15"
									height="15"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
										fill="currentColor"
										fillRule="evenodd"
										clipRule="evenodd"></path>
								</svg>
								All Genres
							</Link>
						</Button>
						{genres.map(genre => {
							return (
								<Button
									variant="outline"
									key={genre.id}
									className="justify-start"
									asChild>
									<Link
										href={`/genres/${genre.name}/${genre.id}`}
										className="flex items-center gap-2">
										<svg
											width="15"
											height="15"
											viewBox="0 0 15 15"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
												fill="currentColor"
												fillRule="evenodd"
												clipRule="evenodd"></path>
										</svg>
										{genre.name}
									</Link>
								</Button>
							);
						})}
					</div>
					<div className="flex-grow p-4">{children}</div>
				</div>
			</body>
		</html>
	);
}
