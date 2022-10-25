import {
  Card,
  Page,
  Layout,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';
import createApp from '@shopify/app-bridge';

import { ResourcePicker }  from '@shopify/app-bridge/actions';
import {authenticatedFetch, getSessionToken} from '@shopify/app-bridge-utils';

const config = {
  apiKey: '0c0c550ed3f1008d7e62c6b2aff0e206',
  host: new URLSearchParams(location.search).get("host"),
  forceRedirect: true
};
const app = createApp(config);

const sessionToken = await getSessionToken(app);

const client = new ApolloClient({
  link: new HttpLink({
    credentials: "same-origin",
    fetch: authenticatedFetch(app),
  }),
  cache: new InMemoryCache(),
})

console.log(client);

export default function HomePage() {
  const picker = ResourcePicker.create(app, {
    resourceType: ResourcePicker.ResourceType.Product
  });

  picker.subscribe(ResourcePicker.Action.SELECT, (payload) => {
    console.log(payload.selection);
  });

  const openProductModal = () => {
    picker.dispatch(ResourcePicker.Action.OPEN);
  }

  return (
    <Page narrowWidth>
      <TitleBar title="App name" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <button
              onClick={openProductModal}
            >Get Products</button>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}