let latestRecord: VSCodeStatusData | undefined;
function updateRecord(data: typeof latestRecord) {
  latestRecord = data;
}

export async function GET() {
  return new Response(JSON.stringify({ item: latestRecord }), {
    status: 200,
  });
}

export async function POST(req: Request) {
  const data = await req.json();
  updateRecord(data);
}
