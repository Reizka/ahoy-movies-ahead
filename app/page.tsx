
export default function Page() {
  return <h1>Landing page</h1>
}


/*import { sql } from "@vercel/postgres";

export default async function Cart({
  params
}: {
  params: { user: string }
}): Promise<JSX.Element> {
  // Query to fetch all users, adjust based on actual table structure
  const { rows } = await sql`SELECT "user_id", "name" FROM "User"`; 

  console.log(rows);  // Logging the rows for debugging

  return (
    <div>
      <h2>Users</h2>
      {rows.map((row) => (
        <div key={row.user_id}>
          {row.name}
        </div>
      ))}
    </div>
  );
}
*/
