import { redirect } from "next/navigation";

export default function CategoryPage({ params }: { params: { category: string } }) {
  // Placeholder behavior for now: all categories land on sale page.
  redirect(`/sale?category=${encodeURIComponent(params.category)}`);
}
