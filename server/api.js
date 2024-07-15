// api.js
import { buildClient } from '@datocms/cma-client-node';

export async function createAndPublishArticle(titel, auteur, datum, paragraaf) {
  const client = buildClient({ apiToken: process.env.CMA_token });

  const data = {
    data: {
      item: {
        itemType: '5555',
        title: titel,
        paragraaf: paragraaf,
        datum: datum,
        auteur: auteur
      },
    }
  };

  const response = await client.items.create(data.data.item);

  if (!response) {
    throw new Error('Er is een fout opgetreden bij het aanmaken van het artikel.');
  }

  const publishedItem = await client.items.publish(response.id);
  return publishedItem;
}
