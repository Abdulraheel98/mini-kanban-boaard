import { onError } from "@apollo/client/link/error";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import config from '../../config'; 


  

const httpLink = new HttpLink({ uri: config.graphqlEndpoint });

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message }) =>
        console.error(` Message: ${message}`)
      );
    }

    if (networkError) console.error(`[Network error]: ${networkError}`);
  });


  
  
  const combinedLink = from([
    errorLink,
    httpLink,
  ]);

 const client = new ApolloClient({
    link: combinedLink,
    cache: new InMemoryCache(),
  });

  export default client;