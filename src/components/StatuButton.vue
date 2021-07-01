<template >
	<button @click="btnClick"  class="por" :class="[isDisable || isLoading?'disable-btn':'', btnType] " >
		<Loading v-if="isLoading" class="btn-loading" />
		<slot></slot>
	</button>
</template>
<script>
import { Loading } from '@/components';

export default {
	components: {Loading},
	props: {
		isDisable: {
			default : false,
		},
		isLoading: {
			default : false,
		},
		onClick: {
			require: true
		},
		btnType: {
			default: "btn-primary"
		}
	},
	methods:{
		btnClick(){
			if(this.isDisable || this.isLoading) return;
			this.onClick(); 
		}
	}
}
</script>
