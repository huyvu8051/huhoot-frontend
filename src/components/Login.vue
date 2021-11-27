<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar color="primary">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              prepend-icon="person"
              name="username"
              label="Username"
              type="text"
              v-model="username"
              required
              v-on:keyup.enter.exact="submit"
              :error-messages="usernameErrors"
              @input="$v.username.$touch()"
              @blur="$v.username.$touch()"
            ></v-text-field>
            <v-text-field
              id="password"
              prepend-icon="lock"
              name="password"
              label="Password"
              type="password"
              v-model="password"
              required
              v-on:keyup.enter.exact="submit"
              :error-messages="passwordErrors"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="red" @click="clear" class="white--text">Clear</v-btn>
          <v-btn color="green" @click="submit" class="white--text">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import AuthenticationService from "@/services/AuthenticationService";
import { validationMixin } from "vuelidate";
import { required, maxLength, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    username: { required },
    password: { required, maxLength: maxLength(30), minLength: minLength(5) },
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username/E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength &&
        errors.push("Password must be at most 20 characters long");
      !this.$v.password.minLength &&
        errors.push("Password must be at least 5 characters long");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
  },
  data: () => ({
    valid: false,
    username: "",
    password: "",
  }),
  created() {
    this.$store.dispatch("setToken", null);
    this.$store.dispatch("setUsername", null);
    this.$store.dispatch("setFullName", null);
    this.$store.dispatch("setRoles", null);
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        this.login();
      }
    },
    clear() {
      this.$v.$reset();
      this.username = "";
      this.password = "";
    },
    login() {
      AuthenticationService.login({
        username: this.username,
        password: this.password,
      }).then((response) => {
        this.$store.dispatch("setToken", "Bearer " + response.data.jwt);
        this.$store.dispatch("setUsername", response.data.username);
        this.$store.dispatch("setRoles", response.data.authorities);

        this.$router.push({
          name: response.data.authorities[0].authority,
        });
      });
    },
  },
};
</script>
