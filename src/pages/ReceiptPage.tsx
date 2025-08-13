import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ReceiptPage = () => {
  const { slug } = useParams<{ slug?: string }>(); // Get the slug parameter

  return (
    <main className="relative bg-background text-foreground min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Receipt Details</h1>
          {slug ? (
            <p className="text-xl text-muted-foreground">Showing details for receipt with slug: <span className="font-semibold text-primary">{slug}</span></p>
          ) : (
            <p className="text-xl text-muted-foreground">No specific receipt slug provided.</p>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ReceiptPage;
