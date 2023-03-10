import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TeamForm from './Components/Team/TeamForm';

const queryClient = new QueryClient();

function App() {
  // @ts-ignore
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <TeamForm />
      </QueryClientProvider>
    </div>
  );
}

export default App;
