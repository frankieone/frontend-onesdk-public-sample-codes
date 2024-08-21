<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
	label: String,
	path: String
})
</script>

<template>
	<RouterLink
		:key="props.path"
		:to="props.path"
		class="button"
	>
		{{ props.label }}
	</RouterLink>
</template>

<style scoped>
.button {
	color: blue;
	background-color: white;
	padding: 8px 4px;
	border: 1px solid;
	margin-right: 4px;
	text-decoration: none;
}

.router-link-active {
	color: white;
	background-color: blue;
}
</style>