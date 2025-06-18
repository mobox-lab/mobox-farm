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
<<<<<<< HEAD
  <div class="updated-component">
    <p>{{ message }}</p>
=======
  <div class="fixed-component">
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-else class="success-message">
      {{ success }}
    </div>
>>>>>>> feature/dark-mode
  </div>
</template>

<script>
export default {
<<<<<<< HEAD
  name: 'UpdatedComponent',
  data() {
    return {
      message: 'Component updated'
=======
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
>>>>>>> feature/dark-mode
    }
  }
}
</script>
<<<<<<< HEAD

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
=======
>>>>>>> feature/dark-mode
