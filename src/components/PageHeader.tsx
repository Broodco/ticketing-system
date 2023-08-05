export default function PageHeader(props: { title: string }) {
  return (
    <header className="bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-xl font-semibold text-zinc-600">{props.title}</h1>
      </div>
    </header>
  );
}
