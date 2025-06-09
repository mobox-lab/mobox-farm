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


const handleError = (error) => {
  console.error('Error occurred:', error);
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  return false;
};

const safeExecute = async (fn) => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};
export const securityEnhancement = (input) => {
  const sanitized = input.replace(/[<>"']/g, '');
  return sanitized;
};
