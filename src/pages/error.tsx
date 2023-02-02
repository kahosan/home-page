'use client'; // Error components must be Client components

import { useEffect } from 'react';

export default function ErrorHandler({
  error
}: {
  error: Error
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <h3>{error.message}</h3>
  );
}
