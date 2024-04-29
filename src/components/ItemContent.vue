<template>
	<div class="content">
		<span class="header"> {{ item.name }}</span>

		<div class="detail" v-for="attr in props.item.attributes" :key="attr.code" >

			<CategoryInput v-for="[k, v] of Object.entries(attr)" :key="k" :titleName="k" :value="v" :code="attr.code" />

		</div>

		<div class="add">
			<label>
				type
				<select ref="selectRef">
					<option value="color">color</option>
					<option value="size">size</option>
					<option value="weight">weight</option>
				</select>
			</label>

			<button @click="emit('click', selectRef.value)">
				Add
			</button>
		</div>

	</div>
</template>

<script setup lang="ts">

import {defineProps, defineEmits, ref, onMounted} from "vue";

import CategoryInput from './CategoryInput.vue';
import EventEmitter from "./utils";

let EE = EventEmitter._getInstance();




const props = defineProps<{
	item: {
		id: number;
		name: string;
		attributes: {
			code: string;
			name: string;
			[key: string]: string
		}[];
	}
}>();

onMounted(() => {
    EE.on('changeValue', ( newVal: any ) => {
		
        for( const el of props.item.attributes ) {
			if( newVal.type === el.code ) {
				el[newVal.fieldName] = newVal.value
				console.log(el[newVal.fieldName], 'new val', newVal.value)
			}
		}	

    })
})

const emit = defineEmits(['click']);

const selectRef = ref<HTMLSelectElement>();



</script>

<style scoped lang="css">
.header {
	font-weight: bold;
}
.content {
	display: flex;
	flex-direction: column;
	padding: 20px;
	gap: 20px;
}
.detail {
	padding: 10px;
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.field {
	display: flex;
	gap: 5px;
}
.title {
	font-weight: bold;
}
.add {
	display: flex;
	gap: 10px;
}
</style>
