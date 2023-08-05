import PageHeader from "@/components/layout/PageHeader";
import NewTicketForm from "@/components/forms/NewTicketForm";
import { User } from "@prisma/client";

export default function Create() {
  const createNewTicket = async ({
    title,
    assignee,
    content,
  }: {
    title: String;
    assignee: User;
    content: String;
  }) => {
    "use server";

    const hostname =
      process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_URL}`
        : `${process.env.HOST}`;

    try {
      const body = {
        title: title,
        assignee: assignee,
        content: content,
      };

      await fetch(`${hostname}/api/tickets/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageHeader title={"Create new ticket"} />
      <main>
        <div className="mx-auto max-w-7xl py-6 px-6 lg:px-8">
          <NewTicketForm
            users={[
              { id: "aaa", name: "Fake user 1" },
              { id: "bbb", name: "Fake user 2" },
            ]}
            createNewTicket={createNewTicket}
          />
        </div>
      </main>
    </>
  );
}
