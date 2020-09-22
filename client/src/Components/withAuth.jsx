import React from 'react';
import { useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';

import { GET_CURRENT_USER } from '../graphql/queries';

const withAuth = conditionFunc => Component => props => {
  const { data, loading } = useQuery(GET_CURRENT_USER);

  if (loading) return <div>Loading...</div>

  return conditionFunc(data) ? (
    <Component {...props}/>
  ) : (
    <Redirect to="/" />
  )
};


export default withAuth;