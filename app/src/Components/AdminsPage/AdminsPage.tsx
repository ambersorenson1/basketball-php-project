import React, { useEffect, useState } from 'react';
import CreateTournaments from './CreateTournaments/CreateTournaments';
import GetAllTournaments from './GetAllTournaments/GetAllTournaments';

const AdminsPage = () => {
  return (
    <div>
      <CreateTournaments />
      <GetAllTournaments />
    </div>
  );
};
export default AdminsPage;
