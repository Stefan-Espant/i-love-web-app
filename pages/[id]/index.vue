<script setup>
import { ref, computed, watch } from 'vue';
import { useFetch, useRuntimeConfig, useRoute } from '@nuxtjs/composition-api';
import SearchBar from '~/components/SearchBar.vue';

const QUERY = `
{
  allArticles {
    id
    datum
    auteur
    title
    paragraaf(markdown: true)
    _createdAt
    _status
  }
}
`;

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const searchQuery = ref(route.query.q || '');

const { data, error } = await useFetch('https://graphql.datocms.com', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${runtimeConfig.public.datoCmsToken}`,
  },
  body: {
    query: QUERY,
  },
});

const filteredData = computed(() => {
  if (searchQuery.value) {
    return data.value.allArticles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return data.value.allArticles;
});

watch(
  () => route.query.q,
  (newQuery) => {
    searchQuery.value = newQuery || '';
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <Default />
    <Intro />
    <SearchBar />
    <div v-if="error">Er is een fout opgetreden: {{ error.message }}</div>
    <articleCard v-if="data" :articles="filteredData" />
  </div>
</template>

<style scoped>
</style>
