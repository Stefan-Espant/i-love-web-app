<template>
	<section class="all-articles">
		<h2 hidden>Kies een I love web</h2>
		<article v-for="article in data.allArticles" :key="article.id">
		<h2>
            {{ article.title }}
        </h2>
        <div>
		    <p>{{ article.auteur }}</p>
		    <time>{{ article.datum}}</time>
        </div>
		<a href="article/id">Lees meer ...</a>
		</article>
	</section>
</template>

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
		Authorization: `Bearer ${runtimeConfig.public.datoCmsToken}`
	},
	body: {
		query: QUERY
	},
	transform: ({ data, errors }) => {
		if (errors) throw new errors();

		return data;
	}
});

console.log(data);
</script>

<style scoped>
article {
	width: var(--unit-full);
    background-color: var(--color-default);
    padding: var(--unit-default);
    display: grid;
    gap: var(--unit-default);
    grid-template-columns: 1fr;
    grid-template-rows: 4rem 1rem 3rem;
    border-radius: var(--unit-micro);
    box-shadow: var(--shadow-default);
}

article h2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

a {
	width: clamp(fit-content, var(--unit-deca), 100%);
	background-color: var(--color-secundary);
	color: var(--color-default);
	padding: var(--unit-micro);
	text-align: center;
	text-decoration: none;
    margin-top: var(--unit-default);
	border-radius: var(--unit-micro);
}

a:hover {
    background-color: var(--color-default);
    color: var(--color-secundary);
}

a:focus {
	border: 2px solid var(--color-secundary);
    background-color: var(--color-default);
    color: var(--color-secundary);
}

.all-articles {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--unit-default);
    padding: var(--unit-default);
}

@media (min-width: 22rem) {
	article {
		width: 20rem;
	}

	.all-articles {
        width: fit-content;
        grid-template-columns: 20rem;
        margin: 0 auto;
    }
}

@media (min-width: 45rem) {
	.all-articles {
        width: fit-content;
        grid-template-columns: 20rem 20rem;
        margin: 0 auto;
    }
}

@media (min-width: 72rem) {
	.all-articles {
        grid-template-columns: 20rem 20rem 20rem;
    }
}
</style>
