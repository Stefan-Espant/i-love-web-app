<script setup>

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
const { data, error } = await useFetch('https://graphql.datocms.com', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${runtimeConfig.public.datoCmsToken}`,
  },
  body: {
    query: QUERY,
  },
  transform: ({ data, errors }) => { 
    if(errors) throw new errors;
    
    return data;
   },
});

definePageMeta({
    layout: 'default'
})
</script>

<template>
  <div>
    <Default />
    <Intro />
    <SearchBar />
    <articleCard {{ data }} />
  </div>
</template>

<style scoped>

</style>
