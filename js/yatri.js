  // Automatically move focus to the next input field after entering a number
  $('.otp_input').on('keyup', function () {
    if (this.value.length === this.maxLength) {
        $(this).next('.otp_input').focus();
    }
});


