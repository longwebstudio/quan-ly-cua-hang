// src/boot/apollo.js
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";

const httpLink = createHttpLink({
  uri: "https://www.amycos.vn/wordpress/siE2Tnd2dwjgMPdkd8331BB7PpCPhvDp",
});

// ... (other configurations, like authMiddleware if needed)

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink, // Or use 'link' if you have middleware
  cache,
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

export default async ({ app }) => {
  await app.runWithContext(async () => {
    // Use app.runWithContext
    app.use(apolloProvider);
  });
};
