<template>
    <div class="rule">
        <div class="rule-title">{{ $t("MOMOMerge_03") }}</div>
        <p v-html="$t('MOMOMerge_04')"></p>
    </div>
</template>

<script>
import { CommonMethod } from "@/mixin";

export default {
    mixins: [CommonMethod],
    props: {},
    data() {
        return {};
    },
    components: {},
    methods: {},
    created() {},
};
</script>

<style lang="less" scoped>
.rule {
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(0deg, #0c213e 0%, #0c213e 100%), #000;
    overflow: hidden;
    border-radius: 10rem;
    box-sizing: border-box;
    .rule-title {
        margin-bottom: 16px;
    }
    p {
        line-height: 30px;
    }
}

@media (min-width: 1200px) {
    .rule {
        width: 600px;
        padding: 20px;
    }
}

@media (max-width: 1200px) and (min-width: 769px) {
    .rule {
        width: 900rem;
        padding: 13rem 24rem 28rem 24rem;
    }
}

@media (max-width: 769px) {
    .rule {
        width: 1200rem;
        padding: 33rem 50rem 50rem 50rem;
    }
}
</style>
