import { useMutation } from '@apollo/client';
import { addRecipeMutation } from './graphql/queries'

export const useSubmitRecipe = () => {
  const [addRecipe] = useMutation(addRecipeMutation);

  return {
    addRecipe: input => addRecipe({ variables: { input } })
  }
};