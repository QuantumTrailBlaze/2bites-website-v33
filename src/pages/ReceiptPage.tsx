import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabaseClient';
import { Receipt } from '@/types/receipt';

const ReceiptPage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const { i18n } = useTranslation();
  const [receiptData, setReceiptData] = useState<Receipt | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReceipt = async () => {
      if (!slug) {
        setError("No receipt slug provided.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setReceiptData(null);

      try {
        const { data, error } = await supabase
          .from('receipts')
          .select('*, nutritional_info(*)')
          .eq('slug', slug)
          .eq('language', i18n.language)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setReceiptData(data as Receipt);
        } else {
          setError("Receipt not found.");
        }
      } catch (err) {
        console.error("Error fetching receipt:", err);
        setError(`Failed to load receipt: ${(err as Error).message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipt();
  }, [slug, i18n.language]);

  return (
    <main className="relative bg-background text-foreground min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Receipt Details</h1>
          {loading && <p className="text-xl text-primary">Loading receipt...</p>}
          {error && <p className="text-xl text-destructive">{error}</p>}
          {receiptData && (
            <div className="mt-8 p-6 bg-card rounded-lg shadow-lg text-card-foreground max-w-2xl mx-auto">
              <h2 className="text-3xl font-semibold mb-4 text-primary">{receiptData.title}</h2>
              {receiptData.image_url && (
                <img
                  src={receiptData.image_url}
                  alt={receiptData.image_alt_text || receiptData.title}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
              )}
              <p className="text-lg mb-2"><span className="font-medium">Perfect For:</span> {receiptData.perfect_for || 'N/A'}</p>
              <p className="text-lg mb-2"><span className="font-medium">Prep Time:</span> {receiptData.prep_time || 'N/A'}</p>
              <p className="text-lg mb-2"><span className="font-medium">Calories:</span> {receiptData.calories || 'N/A'}</p>
              
              {receiptData.ingredients && receiptData.ingredients.length > 0 && (
                <div className="text-left mt-4">
                  <h3 className="text-2xl font-semibold mb-2 text-secondary">Ingredients:</h3>
                  <ul className="list-disc list-inside text-lg">
                    {receiptData.ingredients.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {receiptData.benefits && receiptData.benefits.length > 0 && (
                <div className="text-left mt-4">
                  <h3 className="text-2xl font-semibold mb-2 text-secondary">Benefits:</h3>
                  <ul className="list-disc list-inside text-lg">
                    {receiptData.benefits.map((benefit: string, index: number) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              {receiptData.how_to_prepare && (
                <div className="text-left mt-4">
                  <h3 className="text-2xl font-semibold mb-2 text-secondary">How to Prepare:</h3>
                  <p className="text-lg whitespace-pre-wrap">{receiptData.how_to_prepare}</p>
                </div>
              )}

              {receiptData.nutritional_info && (
                <div className="text-left mt-4 p-4 bg-muted rounded-md">
                  <h3 className="text-2xl font-semibold mb-2 text-muted-foreground">Nutritional Information:</h3>
                  <ul className="text-lg">
                    <li><span className="font-medium">Calories:</span> {receiptData.nutritional_info.calories_kcal || 'N/A'} kcal</li>
                    <li><span className="font-medium">Protein:</span> {receiptData.nutritional_info.protein_g || 'N/A'} g</li>
                    <li><span className="font-medium">Carbohydrates:</span> {receiptData.nutritional_info.carbohydrates_g || 'N/A'} g</li>
                    <li><span className="font-medium">Fats:</span> {receiptData.nutritional_info.fats_g || 'N/A'} g</li>
                    <li><span className="font-medium">Fiber:</span> {receiptData.nutritional_info.fiber_g || 'N/A'} g</li>
                    <li><span className="font-medium">Sugars:</span> {receiptData.nutritional_info.sugars_g || 'N/A'} g</li>
                    <li><span className="font-medium">Sodium:</span> {receiptData.nutritional_info.sodium_mg || 'N/A'} mg</li>
                  </ul>
                </div>
              )}

              {receiptData.quote && (
                <blockquote className="mt-6 text-xl italic text-muted-foreground border-l-4 border-primary pl-4">
                  "{receiptData.quote}"
                </blockquote>
              )}

              {receiptData.tags && receiptData.tags.length > 0 && (
                <div className="mt-4 text-left">
                  <h3 className="text-xl font-semibold mb-2 text-secondary">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {receiptData.tags.map((tag, index) => (
                      <span key={index} className={`px-3 py-1 rounded-full text-sm ${tag.iconColorClass || 'bg-accent text-accent-foreground'}`}>
                        {tag.text}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {!loading && !error && !receiptData && slug && (
            <p className="text-xl text-muted-foreground">No receipt found for slug: <span className="font-semibold text-primary">{slug}</span> in language: <span className="font-semibold text-primary">{i18n.language}</span>.</p>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ReceiptPage;
