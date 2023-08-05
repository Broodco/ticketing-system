import PageHeader from "@/components/PageHeader";

export default function MyTickets() {
  return (
    <>
      <PageHeader title={"My tickets"} />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          List of tickets here
        </div>
      </main>
    </>
  );
}
