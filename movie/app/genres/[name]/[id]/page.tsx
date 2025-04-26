export default async function GenrePage({
    params,
}: {
    params: Promise<{ name: string; id: string }>;
}) {
    const { name, id } = await params;

    return <div>
        <h2 className="text-xl font-bold py-2 border-b">{name}</h2>
    </div>;
}
