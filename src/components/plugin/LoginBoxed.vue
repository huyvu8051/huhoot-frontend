<template>
  <h-flex-layout>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10">
          <v-card class="elevation-6 mt-10">
            <v-window>
              <v-window-item>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-card-text class="mt-12">
                      <h4 class="text-center">Login in to Your Account</h4>
                      <h6 class="text-center grey--text">
                        Log in to your account so you can continue builiding
                        <br />and editing your onboarding flows
                      </h6>
                      <v-row align="center" justify="center">
                        <v-col cols="12" sm="8">
                          <v-text-field
                            label="Username"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            class="mt-16"
                            name="username"
                            id="txtUsername"
                            v-model="username"
                            required
                            v-on:keyup.enter.exact="submit"
                            :error-messages="usernameErrors"
                            @input="$v.username.$touch()"
                            @blur="$v.username.$touch()"
                          />
                          <v-text-field
                            label="Password"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            type="password"
                            id="txtPassword"
                            v-model="password"
                            required
                            v-on:keyup.enter.exact="submit"
                            :error-messages="passwordErrors"
                            @input="$v.password.$touch()"
                            @blur="$v.password.$touch()"
                          />
                          <v-row>
                            <v-col cols="12" sm="7">
                              <v-checkbox
                                label="Remember Me"
                                class="mt-n1"
                                color="blue"
                              >
                                <template v-slot:label>
                                  <span class="caption"> Stay signed in? </span>
                                </template>
                              </v-checkbox>
                            </v-col>
                            <v-col cols="12" sm="5">
                              <span class="caption blue--text">
                                Forgot password
                              </span>
                            </v-col>
                          </v-row>
                          <v-btn
                            color="blue"
                            dark
                            block
                            @click="submit"
                            rounded
                            id="btnLogin"
                          >
                            Login
                          </v-btn>

                          <h5 class="text-center grey--text mt-4 mb-3">
                            Or Login using
                          </h5>
                          <div
                            class="
                              d-flex
                              justify-space-between
                              align-center
                              mx-10
                              mb-16
                            "
                          >
                            <v-container>
                              <v-row>
                                <v-col class="mx-0 px-0 my-1 py-1">
                                  <v-btn depressed outlined color="grey">
                                    <svg
                                      style="
                                        width: 24px;
                                        height: 24px;
                                        color: red;
                                      "
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M23,11H21V9H19V11H17V13H19V15H21V13H23M8,11V13.4H12C11.8,14.4 10.8,16.4 8,16.4C5.6,16.4 3.7,14.4 3.7,12C3.7,9.6 5.6,7.6 8,7.6C9.4,7.6 10.3,8.2 10.8,8.7L12.7,6.9C11.5,5.7 9.9,5 8,5C4.1,5 1,8.1 1,12C1,15.9 4.1,19 8,19C12,19 14.7,16.2 14.7,12.2C14.7,11.7 14.7,11.4 14.6,11H8Z"
                                      />
                                    </svg>
                                  </v-btn>
                                </v-col>
                                <v-col class="mx-0 px-0 my-1 py-1">
                                  <v-btn depressed outlined color="grey">
                                    <svg
                                      style="
                                        width: 24px;
                                        height: 24px;
                                        color: blue;
                                      "
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"
                                      />
                                    </svg>
                                  </v-btn>
                                </v-col>
                                <v-col class="mx-0 px-0 my-1 py-1">
                                  <v-btn depressed outlined color="grey">
                                    <svg
                                      style="
                                        width: 24px;
                                        height: 24px;
                                        color: cyan;
                                      "
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"
                                      />
                                    </svg>
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-container>
                          </div>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" md="6" class="blue rounded-bl-xl">
                    <div style="text-align: center; padding: 180px 0">
                      <v-card-text class="white--text">
                        <h3 class="text-center">Don't Have an Account Yet?</h3>
                        <h6 class="text-center">
                          Let's get you all set up so you can start creating
                          your first<br />
                          onboarding experience
                        </h6>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn tile outlined dark>SIGN UP</v-btn>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </h-flex-layout>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import { validationMixin } from "vuelidate";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
export default {
  props: {
    source: String,
  },
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
<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
</style>