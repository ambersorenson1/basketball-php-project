import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  // @ts-ignore
  return (
    <div>
      <QueryClientProvider client={queryClient}></QueryClientProvider>
    </div>
  );
}

export default App;
