<template>
  <div class="login-container">
    <form @submit.prevent="submitForm">
      <h2>Sign In</h2>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="username" id="username" v-model="loginDetails.username" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="loginDetails.password" required>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-submit">Submit</button>
        
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginDetails: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    submitForm() {
      // Handle the form submission
      console.log(this.loginDetails);
      // Perform login logic here...
      // If login is successful:
      this.$router.push('/transaction');
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}

h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  text-align: center;
}

.btn-submit {
  padding: 10px 20px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.links a {
  display: block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
}
</style>
