<template>
	<div>
		<Default />
		<section v-if="data">
				<h1 v-if="data.article">{{ data.article.title }}</h1>
        <div class="subinfo">
          <h2 v-if="data.article">{{ data.article.auteur }}</h2>
				<time>{{ data.article.datum }}</time>
        </div>
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

const { data, error } = await useFetch('https://graphql.datocms.com', {
	method: 'POST',
	headers: {
		Authorization: `Bearer ${runtimeConfig.public.datoCmsToken}`
	},
	body: {
		query: QUERY,
		variables: {
			id: id
		}
	},
	transform: ({ data, errors }) => {
		if (errors) {
			console.error(errors);
			return { error: 'An error occurred while fetching data.' };
		}
		return data;
	}
});

definePageMeta({
	layout: 'default'
});

console.log(data);
</script>

<style scoped>
section {
	width: fit-content;
	background-color: var(--color-default);
	padding: var(--unit-default);
	border-radius: var(--unit-micro);
	box-shadow: var(--shadow-default);
  margin: auto;
}

.subinfo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  align-items: center;
}

h1 {
	max-width: 75%;
}

time {
  width: fit-content;
  display: block;
  margin: 1rem 0;
}

@media (min-width: 40rem) {
  section {
    width: 50%;
  }
}
</style>
