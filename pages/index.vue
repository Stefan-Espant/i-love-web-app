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
  article {
    title
    paragraaf(markdown: true)
    id
    datum
    auteur
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
    <!-- <SearchBar {{ data }} /> -->
    <articleCard {{ data }} />
  </div>
</template>

<style scoped>

</style>
