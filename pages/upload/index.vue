<template>
  <Default />

  <div>
    <section>
      <h1>Upload een post</h1>
      <form @submit.prevent="handleSubmit">
        <fieldset>
          <legend>info post</legend>
          <label for="title">
            Titel:
            <input v-model="titel" type="text" id="title" name="title" required />
          </label>
          <label for="auteur">
            Auteur:
            <input v-model="auteur" type="text" id="auteur" name="auteur" required />
          </label>
          <label for="datum">
            Datum:
            <input v-model="datum" type="date" id="datum" name="datum" required />
          </label>
        </fieldset>
        <fieldset>
          <legend>content post</legend>
          <label for="paragraaf">
            Content:
            <textarea v-model="paragraaf" id="paragraaf" name="paragraaf" required></textarea>
          </label>
        </fieldset>
        <button type="submit">Verzenden</button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const titel = ref('');
const auteur = ref('');
const datum = ref('');
const paragraaf = ref('');

async function handleSubmit() {
  try {
    console.log("Submitting new article...");

    const response = await fetch('./api/createArticle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          article: {
            titel: titel.value,
            auteur: auteur.value,
            datum: datum.value,
            paragraaf: paragraaf.value
          },
        },
      }),
    });

    console.log(response)

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const newItem = await response.json();
    console.log('Artikel aangemaakt en gepubliceerd:', newItem);
  } catch (error) {
    console.error('Error in handleSubmit:', error);
  }
}
</script>

<style scoped>
form {
  display: grid;
  gap: 1rem;
}

input,
textarea {
  margin-top: 0.5rem;
}

textarea {
  min-height: 10rem;
}

fieldset {
  border: none;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  gap: 1rem;
}

legend {
  visibility: hidden;
}

section {
  padding: 1rem;
}

button {
  margin-left: auto;
  width: fit-content;
  padding: 0.75rem 1rem;
}

@media (min-width: 40rem) {
  fieldset:first-of-type {
    grid-auto-flow: column;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  fieldset:last-of-type {
    grid-auto-flow: column;
    grid-template-columns: 1fr;
  }
}
</style>
