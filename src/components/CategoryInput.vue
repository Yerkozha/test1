<template>

    <div class="field">
        <span class="title">{{props.titleName}}:</span>

        <input v-if="!isObject(props.value)"  @blur="(event) => blurHandler(event, props.titleName)" :value="props.value" :type=" props.titleName === 'weight' ? 'number' : 'text' "  />
        <span v-else>
            <input  :value="value.width" type="number"/> x <input :value="value.height" type="number"/>
        </span>

    </div>
  
</template>

<script setup lang="ts">

import {defineProps} from 'vue';

import EventEmitter from './utils';

let EE = EventEmitter._getInstance()



const props = defineProps(['titleName','value', 'code']);

function blurHandler(value: FocusEvent, fieldName: string) {
    
    if(value.target instanceof HTMLInputElement) {

        EE.emit('changeValue', {
            type: props.code,
            fieldName,
            value: value.target.value 
        })
        
    }
	
}

function isObject <T>(value: T): boolean {
  return value != null 
  && 
  (value.constructor === Object || (!value.constructor && typeof value === 'object'))
}

</script>

<style lang="css">

</style>