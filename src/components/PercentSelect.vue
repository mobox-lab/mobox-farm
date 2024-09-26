<template>
	<div class="aveage-box user-select-none">
		<div class="tac tab-content">
			<div style="padding:5px 10px;" class="tab-panel small cur-point notice-color" @click="selectCB(0.25)">25%</div>
		</div>
		<div class="tac tab-content">
			<div style="padding:5px 10px;" class="tab-panel small cur-point notice-color" @click="selectCB(0.5)">50%</div>
		</div>
		<div class="tac tab-content">
			<div style="padding:5px 10px;" class="tab-panel small cur-point notice-color" @click="selectCB(0.75)">75%</div>
		</div>
		<div class="tac tab-content">
			<div style="padding:5px 10px;" class="tab-panel small cur-point notice-color" @click="selectCB(1)">100%</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		selectCB: {
			required: true,
		}
	}
}
</script>