export default async function Consultants({ searchParams }: { searchParams: Promise<{ search: string }>}) {
    const params = await searchParams
    const response = await fetch(`https://sharp.kurz.fyi/api/consultants/search?q=${params.search}`)
    const data = await response.json()
    return <div>consultants page {JSON.stringify(params)} e {JSON.stringify(data)}</div>;
}
