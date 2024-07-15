// server/api/createArticle.js
import { defineEventHandler, readBody, createError } from 'h3';
import { createAndPublishArticle } from '../../api';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { titel, auteur, datum, paragraaf } = body;

  try {
    const newItem = await createAndPublishArticle(titel, auteur, datum, paragraaf);
    return {
      statusCode: 200,
      body: newItem,
    };
  } catch (error) {
    console.error('Error in API route:', error.message);
    console.error('Stack trace:', error.stack);
    return createError({
      statusCode: 500,
      statusMessage: 'Er is een fout opgetreden bij het aanmaken van het artikel.',
    });
  }
});
