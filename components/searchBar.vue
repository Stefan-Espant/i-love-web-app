<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const router = useRouter();

const handleSearch = () => {
  if (searchQuery.value.trim()) {
	router.push({ path: '/', query: { q: searchQuery.value } });
  }
};
</script>

<template>
	<section class="searchbar">
	  <form @submit.prevent="handleSearch">
		<button type="submit">
		  <figure>
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			  <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C6.94943 0 5.90914 0.206926 4.93853 0.608964C3.96793 1.011 3.08601 1.60028 2.34315 2.34315C1.60028 3.08601 1.011 3.96793 0.608964 4.93853C0.206926 5.90914 0 6.94942 0 8C0 9.05058 0.206926 10.0909 0.608964 11.0615C1.011 12.0321 1.60028 12.914 2.34315 13.6569C3.08601 14.3997 3.96793 14.989 4.93853 15.391C5.90914 15.7931 6.94943 16 8 16C9.05057 16 10.0909 15.7931 11.0615 15.391C11.7226 15.1172 12.3425 14.7565 12.9054 14.3196L18.2929 19.7071C18.6834 20.0976 19.3166 20.0976 19.7071 19.7071C20.0976 19.3166 20.0976 18.6834 19.7071 18.2929L14.3196 12.9054C14.7565 12.3425 15.1172 11.7226 15.391 11.0615C15.7931 10.0909 16 9.05057 16 8C16 6.94943 15.7931 5.90914 15.391 4.93853C14.989 3.96793 14.3997 3.08601 13.6569 2.34315C12.914 1.60028 12.0321 1.011 11.0615 0.608964C10.0909 0.206926 9.05058 0 8 0ZM5.7039 2.45672C6.43185 2.15519 7.21207 2 8 2C8.78793 2 9.56815 2.15519 10.2961 2.45672C11.0241 2.75825 11.6855 3.20021 12.2426 3.75736C12.7998 4.31451 13.2417 4.97595 13.5433 5.7039C13.8448 6.43185 14 7.21207 14 8C14 8.78793 13.8448 9.56815 13.5433 10.2961C13.2417 11.0241 12.7998 11.6855 12.2426 12.2426C11.6855 12.7998 11.0241 13.2417 10.2961 13.5433C9.56815 13.8448 8.78793 14 8 14C7.21207 14 6.43185 13.8448 5.7039 13.5433C4.97595 13.2417 4.31451 12.7998 3.75736 12.2426C3.20021 11.6855 2.75825 11.0241 2.45672 10.2961C2.15519 9.56815 2 8.78793 2 8C2 7.21207 2.15519 6.43185 2.45672 5.7039C2.75825 4.97595 3.20021 4.31451 3.75736 3.75736C4.31451 3.20021 4.97595 2.75825 5.7039 2.45672Z" fill=""/>
			</svg>
			<figcaption>zoeken</figcaption>
		  </figure>
		</button>
		<label for="searchbar" hidden>Zoek een artikel</label>
		<input id="searchbar" type="search" v-model="searchQuery" />
	  </form>
	</section>
  </template>
  
  <style scoped>
  .searchbar {
	padding: var(--unit-default);
  }
  
  form {
	width: var(--unit-full);
	height: inherit;
	display: flex;
	flex-direction: row-reverse;
	gap: var(--unit-default);
	margin: auto;
  }
  
  form label {
	width: inherit;
  }
  </style>
  