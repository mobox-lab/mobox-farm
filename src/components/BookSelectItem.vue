<template>
	<div>
		<div v-for="item in data" class="dib por tac" :class="`${ data.length > 1 ? 'col-md-3 col-xs-3' : 'col-md-12' }`" :key="item.prototype" >
			<PetItemSmall
					:key="item.prototype.toString() + item.tokenId + item.num"
					v-bind:data="item"
					v-bind:selectProtoTypes="selectProtoTypes"
					:onSelectChange="onSelectChange"
			/>
		</div>
	</div>
</template>

<script>
import { PetItemSmall } from "@/components";

export default {
	components:{PetItemSmall},
	props: ["data","selectProtoTypes","onSelectChange"],
	computed:{
		
	},
	methods:{

	}
};
</script>

