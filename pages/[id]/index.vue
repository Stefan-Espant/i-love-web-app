<template>
  <div>
    <Default />
    <section v-if="data">
      <h1 v-if="data.article">{{ data.article.title }}</h1>
      <h2 v-if="data.article">{{ data.article.auteur }}</h2>
      <time>{{ data.article.datum }}</time>
      <p>{{ data.article.paragraaf }}</p>
    </section>
    <div v-if="!data && !error">Loading...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script setup>
const QUERY = `
  query GetArticle($id: ItemId) {
    article(filter: { id: { eq: $id } }) {
      id
      datum
      auteur
      title
      paragraaf
      _createdAt
      _status
    }
  }
`;

const id = useRoute().params.id;
const runtimeConfig = useRuntimeConfig();

const { data, error } = await useFetch("https://graphql.datocms.com", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${runtimeConfig.public.datoCmsToken}`,
  },
  body: {
    query: QUERY,
    variables: {
      id: id,
    },
  },
  transform: ({ data, errors }) => {
    if (errors) {
      console.error(errors);
      return { error: "An error occurred while fetching data." };
    }
    return data;
  },
});

definePageMeta({
  layout: "default",
});

console.log(data);
</script>

<style scoped>
section {
  padding: var(--unit-default);
}

h1 {
  max-width: 75%;
}
</style>