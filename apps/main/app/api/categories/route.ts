import { getAllCategories } from "@repo/db";
import { Category } from "@repo/types";

/**
 * GET endpoint for categories                                                                                      
 * @url /api/categories
 * @returns Category list
 */
export async function GET() {
  try {
    const category: Category[] = (await getAllCategories()).map(cat => ({
      ...cat,
      image_url: cat.image_url ?? undefined,
      description: cat.description ?? undefined,
    }));

    if (!category || category.length === 0) {
      return Response.json({ error: "No categories found" }, { status: 404 });
    }

    return Response.json(category, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories", error);
    return Response.json({ error: "Error fetching categories" }, { status: 500 });
  }
}
