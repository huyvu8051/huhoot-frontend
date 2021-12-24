<template>
  <v-main>
    <Navigation />
    <Header />
    <FlexLayout>
      <router-view />
    </FlexLayout>
    <!-- <Footer /> -->
  </v-main>
</template>

<script>
import FlexLayout from "@/components/FlexLayout";
import Footer from "@/components/Footer";
import Header from "@/components/admin/Header";
import Navigation from "@/components/admin/Navigation";
export default {
  components: {
    Navigation,
    Header,
    Footer,
    FlexLayout,
  },
};
</script>

<style>
</style>