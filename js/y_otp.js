  // Automatically move focus to the next input field after entering a number
  const inputs = document.querySelectorAll('.otp_input');

  inputs.forEach((input, index) => {
      input.addEventListener('input', () => {
          // If a value is entered, move to the next input
          if (input.value.length === 1 && index < inputs.length - 1) {
              inputs[index + 1].focus();
          }
      });

      input.addEventListener('keydown', (e) => {
          // Handle backspace key
          if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
              inputs[index - 1].focus();
          }
      });
  });


//otp ganerate and verify
document.addEventListener('DOMContentLoaded', function() {
    const mobile = localStorage.getItem('mobile');
    // console.log("Mobile from localStorage:", mobile);

    if(mobile) {
        document.getElementById('mobileNumber').textContent = `+91 ${mobile}`;
    }

    function ganerateOtp() {
        return Math.floor(1000 + Math.random() * 9000);
    }
    const ganeratedOtp = ganerateOtp();
    console.log("ganeratedOtp",ganeratedOtp);

    document.getElementById('otpForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const otpInputs = document.querySelectorAll('.otp_input');
        let enteredOtp = '';
        otpInputs.forEach(input => enteredOtp +=  input.value);
        // console.log("Entered OTP:", enteredOtp); 

        if(enteredOtp === ganeratedOtp.toString()) {
            window.location.href = './index.html';
        } else {
            alert('Incorrect OTP. Please try again.');
        }
    })
});