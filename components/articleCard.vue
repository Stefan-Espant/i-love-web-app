<template>
    <section>
        <h2 hidden>Kies een I love web </h2>
        <article>
            <h2>Accessible interactions</h2>
            <h3>Door: Hans Worst</h3>
            <time>28 november 2022</time>
            <a href="article/[id]">Lees meer ...</a>
        </article>
    </section>
</template>

<script setup>
const QUERY = `
        allArticles {
          id
          datum
          auteur
          title
          paragraaf(markdown: true)
          _createdAt
          _status
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
        if (errors) throw new errors;

        return data;
    },
});
</script>

<style scoped>
article {
    width: var(--unit-full);
    background-color: var(--color-default);
    padding: var(--unit-default);
    display: grid;
    grid-template-columns: 1fr;
    border-radius: var(--unit-micro);
    box-shadow: var(--shadow-default);
}

article a {
    width: clamp(fit-content, var(--unit-deca), 100%);
    background-color: var(--color-secundary);
    color: var(--color-default);
    padding: var(--unit-micro);
    text-align: center;
    text-decoration: none;
}

@media (min-width: 20rem) {
    article {
        width: 20rem;
    }
}
</style>
