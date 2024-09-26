
// user login and value set in localstorage
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const mobile = document.getElementById('mobile').value;

    if(username && mobile) {
      localStorage.setItem('username',username);
      localStorage.setItem('mobile',mobile);
      console.log("Mobile stored in localStorage:", localStorage.getItem('mobile')); // Debugging

      window.location.href = 'otp.html';
    }
  });