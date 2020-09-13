import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const withSession = Component => props => {
  const { data, loading, refetch } = useQuery(GET_CURRENT_USER);

  if (loading) return <div>Loading...</div>
  console.log(data);
  return (
    <Component {...props} refetch={refetch} session={data} />
  );
};

export default withSession;