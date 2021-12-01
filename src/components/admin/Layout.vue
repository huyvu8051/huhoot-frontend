<template>
  <div>
    <Navigation />
    <Header />
    <v-main>
      <v-container fluid fill-height rounded-lg>
        <v-layout align-center justify-center>
          <router-view />
        </v-layout>
      </v-container>
    </v-main>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import Header from "@/components/admin/Header";
import Navigation from "@/components/admin/Navigation";
export default {
    components:{
        Navigation,
        Header,
        Footer
    }
};
</script>

<style>
</style>