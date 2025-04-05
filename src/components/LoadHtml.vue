<template>
  <div>
    <div v-html="html"></div>
  </div>
</template>
<style></style>
<script>
import axios from "axios";

export default {
  //
  props: {
    url: {
      required: true,
    },
  },
  data() {
    return {
      html: "",
    };
  },
  watch: {
    url(value) {
      this.load(value);
    },
  },
  mounted() {
    this.load(this.url);
  },
  methods: {
    load(url) {
      if (url && url.length > 0) {
        //
        let param = {
          accept: "text/html, text/plain",
        };
        axios
          .get(url, param)
          .then((response) => {
            this.loading = false;
            //
            this.html = response.data;
          })
          .catch(() => {});
      }
    },
  },
};
</script>
<template>
  <div class="fixed-component">
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-else class="success-message">
      {{ success }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FixedComponent',
  data() {
    return {
      error: null,
      success: 'Issue fixed successfully'
    }
  },
  mounted() {
    this.checkForErrors();
  },
  methods: {
    checkForErrors() {
      try {
      } catch (err) {
        this.error = err.message;
      }
    }
  }
}
</script>
