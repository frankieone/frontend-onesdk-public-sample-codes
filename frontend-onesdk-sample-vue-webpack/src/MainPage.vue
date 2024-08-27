<script setup>
import ButtonNav from './components/ButtonNav.vue';
import { RouterView } from 'vue-router';
import { routes } from './routes';
</script>

<template>
	<nav>
		<ButtonNav 
			v-for="(item) in routes" 
			:key="item.path" 
			:path="item.path" 
			:label="item.title"
		/>
	</nav>

	<RouterView />
</template>

<style scoped>
nav { padding: 8px 0; }
</style>