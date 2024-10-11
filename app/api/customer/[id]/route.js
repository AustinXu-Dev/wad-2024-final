import Customer from "@/models/Customer";
import dbConnect from "@/lib/db";

export async function GET(request, { params }) {
  await dbConnect();
  const { id } = params;
  const customer = await Customer.findById(id);

  if (!customer) {
    return new Response(JSON.stringify({ message: "Customer not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(customer), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      return new Response(JSON.stringify({ message: "Customer not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Customer deleted", customer }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting customer:", error); // Log the error
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}