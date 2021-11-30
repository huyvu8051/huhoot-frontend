<template>
  <ImageWrapper :src="src" height="50px" width="90px"/>
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