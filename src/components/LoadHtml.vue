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
  <div class="updated-component">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'UpdatedComponent',
  data() {
    return {
      message: 'Component updated'
    }
  }
}
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

  methods: {
    // Method for: perf: ⚡ reduce component re-renders
    perf______reduce_component_re_renders() {
      this.('perf______reduce_component_re_renders-event', {
        timestamp: Date.now(),
        message: 'perf: ⚡ reduce component re-renders'
      });
    },
    
    async handleperf______reduce_component_re_renders() {
      try {
        const result = await this.apiCall('/perf______reduce_component_re_renders');
        this.('perf______reduce_component_re_renders-success', result);
      } catch (error) {
        this.('perf______reduce_component_re_renders-error', error);
      }
    }
  },
<template>
  <div class="updated-component">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'UpdatedComponent',
  data() {
    return {
      message: 'Component updated'
    }
  }
}
</script>
