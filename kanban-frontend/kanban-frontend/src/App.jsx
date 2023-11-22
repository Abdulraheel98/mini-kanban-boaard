import DndComponent from "./components/dndComponent";
import { AppProvider } from "./components/apicontext";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/Apollo_client";
import Header from "./components/header";

import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <Header />
        <DndComponent />
      </AppProvider>
    </ApolloProvider>
  );
}

export default App;
