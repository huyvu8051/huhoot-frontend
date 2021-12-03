<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Change Password</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          prepend-icon="lock"
          name="oldPassword"
          label="oldPassword"
          type="password"
          v-model="oldPassword"
          counter="50"
          required
          :error-messages="oldPasswordErrors"
          @input="$v.oldPassword.$touch()"
          @blur="$v.oldPassword.$touch()"
        ></v-text-field>
        <v-text-field
          id="password"
          prepend-icon="lock"
          name="password"
          label="Password"
          type="password"
          v-model="password"
          counter="50"
          required
          :error-messages="passwordErrors"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>
        <v-text-field
          id="confirmPassword"
          prepend-icon="lock"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          v-model="confirmPassword"
          counter="50"
          required
          v-on:keyup.enter.exact="submit"
          :error-messages="confirmPasswordErrors"
          @input="$v.confirmPassword.$touch()"
          @blur="$v.confirmPassword.$touch()"
        >
        </v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="submit">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import StudentAccountService from "@/services/StudentAccountService";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs,
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    oldPassword: {
      required,
      maxLength: maxLength(50),
      minLength: minLength(5),
    },
    password: { required, maxLength: maxLength(50), minLength: minLength(5) },
    confirmPassword: { sameAsPassword: sameAs("password") },
  },
  components: {},
  computed: {
    oldPasswordErrors() {
      const errors = [];
      if (!this.$v.oldPassword.$dirty) return errors;
      !this.$v.oldPassword.required && errors.push("oldPassword is required");
      !this.$v.oldPassword.maxLength &&
        errors.push("Old Password must be at most 50 characters long");
      !this.$v.oldPassword.minLength &&
        errors.push("Old Password must be at least 5 characters long");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength &&
        errors.push("Password must be at most 50 characters long");
      !this.$v.password.minLength &&
        errors.push("Password must be at least 5 characters long");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.sameAsPassword &&
        errors.push("Confirm Password must be same as password.");
      return errors;
    },
  },
  data: () => ({
    valid: false,
    oldPassword: "",
    password: "",
    confirmPassword: "",
  }),
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        this.changePassword();
      }
    },
    clear() {
      this.$v.$reset();
      this.oldPassword = "";
      this.password = "";
      this.confirmPassword = "";
    },
    changePassword() {
      
      StudentAccountService.updatePassword({
        oldPassword: this.oldPassword,
        password: this.password,
      }).then(() => {
          this.$eventBus.$emit("nofication", {
            message: "Change password successful!!!",
          });
          this.clear();
        })
        .catch((error) => {
          this.$eventBus.$emit("nofication", {
            message: error.response.data,
            status: "error",
          });
        })
        
    },
  },
};
</script>
