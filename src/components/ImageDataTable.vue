<template>
  <ImageWrapper :src="src" height="60px" width="100px" />
</template>

<script>
import ImageWrapper from "@/components/ImageWrapper"
export default {
  components:{
    ImageWrapper
  },
  props: {
    src: String,
  },
};
</script>

<style>
</style>