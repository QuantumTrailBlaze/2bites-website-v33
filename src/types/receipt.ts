/**
 * @interface NutritionalInfo
 * @description Represents the nutritional information for a receipt.
 * @property {string} id - Unique identifier for the nutritional information (UUID).
 * @property {number | null} calories_kcal - Calories in kilocalories.
 * @property {number | null} protein_g - Protein content in grams.
 * @property {number | null} carbohydrates_g - Carbohydrates content in grams.
 * @property {number | null} fats_g - Fats content in grams.
 * @property {number | null} fiber_g - Fiber content in grams.
 * @property {number | null} sugars_g - Sugars content in grams.
 * @property {number | null} sodium_mg - Sodium content in milligrams.
 */
export interface NutritionalInfo {
  id: string;
  calories_kcal: number | null;
  protein_g: number | null;
  carbohydrates_g: number | null;
  fats_g: number | null;
  fiber_g: number | null;
  sugars_g: number | null;
  sodium_mg: number | null;
}

/**
 * @interface Receipt
 * @description Represents a food receipt or recipe.
 * @property {string} id - Unique identifier for the receipt (UUID).
 * @property {string | null} nutritional_info_id - Foreign key to nutritional information, can be null.
 * @property {string} language - Language of the receipt (e.g., 'en', 'es').
 * @property {string} slug - URL-friendly slug for the receipt.
 * @property {string} title - Title of the receipt.
 * @property {string | null} perfect_for - Description of who the receipt is perfect for.
 * @property {string | null} image_url - URL of the receipt's image.
 * @property {string | null} image_alt_text - Alt text for the receipt's image.
 * @property {string | null} prep_time - Preparation time for the receipt.
 * @property {string | null} calories - Calorie information as a string.
 * @property {any[]} ingredients - JSONB array of ingredients.
 * @property {any[]} benefits - JSONB array of benefits.
 * @property {string | null} how_to_prepare - Instructions on how to prepare the receipt.
 * @property {string | null} quote - A quote related to the receipt.
 * @property {string[] | null} tags - JSONB array of tags associated with the receipt.
 * @property {string | null} category - Category of the receipt.
 * @property {NutritionalInfo | null} nutritional_info - Nested nutritional information object, can be null.
 */
export interface Receipt {
  id: string;
  nutritional_info_id: string | null;
  language: string;
  slug: string;
  title: string;
  perfect_for: string | null;
  image_url: string | null;
  image_alt_text: string | null;
  prep_time: string | null;
  calories: string | null;
  ingredients: any[]; // Assuming jsonb can be an array of any type, adjust if more specific structure is known
  benefits: any[];    // Assuming jsonb can be an array of any type, adjust if more specific structure is known
  how_to_prepare: string | null;
  quote: string | null;
  tags: string[] | null; // Assuming jsonb is an array of strings for tags
  category: string | null;
  nutritional_info: NutritionalInfo | null;
}
