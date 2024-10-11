import Customer from "@/models/Customer";
import dbConnect from "@/lib/db";

export async function GET() {
  await dbConnect();
  const customers = await Customer.find().sort({ memberNumber: 1 });
  return new Response(JSON.stringify(customers), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const customer = new Customer(body);
  await customer.save();
  return new Response(JSON.stringify(customer), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request) {
  await dbConnect();
  const body = await request.json();
  const customer = await Customer.findByIdAndUpdate(body._id, body, {
    new: true, // Return the updated document
    runValidators: true, // Validate before updating
  });
  return new Response(JSON.stringify(customer), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
