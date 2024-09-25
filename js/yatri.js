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



document.getElementById('y_editProfileBtn').addEventListener('click', function() {
  // Get current values from the profile form
  const name = document.getElementById('y_name').value;
  const email = document.getElementById('y_email').value;
  const mobile = document.getElementById('y_mobile').value;

  // Set the values in the edit form
  document.getElementById('y_editName').value = name;
  document.getElementById('y_editEmail').value = email;
  document.getElementById('y_editMobile').value = mobile;

  // Switch to the edit profile form
  document.getElementById('profileForm').style.display = 'none';
  document.getElementById('editProfileForm').style.display = 'block';
  
  // Change the modal title to "Edit Profile"
  document.getElementById('y_profileModalLabel').innerText = 'Edit Profile';
});

document.getElementById('y_saveProfileBtn').addEventListener('click', function() {
  // Here you can add your save functionality, e.g., send the data to a server

  // Optionally, reset the fields or update them with new values
  const name = document.getElementById('y_editName').value;
  const email = document.getElementById('y_editEmail').value;
  const mobile = document.getElementById('y_editMobile').value;

  // Log the values (or send them to your server)
  console.log("Saved Name:", name);
  console.log("Saved Email:", email);
  console.log("Saved Mobile:", mobile);

  // Close the modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('y_profileModal'));
  modal.hide();

  // Reset the forms and switch back to the profile view if needed
  document.getElementById('editProfileForm').style.display = 'none';
  document.getElementById('profileForm').style.display = 'block';

  // Change the modal title back to "Profile"
  document.getElementById('y_profileModalLabel').innerText = 'Profile';
});


// offcanvas model 

document.getElementById('y_mobile_editProfileBtn').addEventListener('click', function() {
  // Get current values from the mobile profile form
  const name = document.getElementById('y_mobile_name').value;
  const email = document.getElementById('y_mobile_email').value;
  const mobile = document.getElementById('y_mobile_mobile').value;

  // Set the values in the edit form
  document.getElementById('y_mobile_editName').value = name;
  document.getElementById('y_mobile_editEmail').value = email;
  document.getElementById('y_mobile_editMobile').value = mobile;

  // Switch to the edit profile form
  document.getElementById('mobileProfileForm').style.display = 'none';
  document.getElementById('mobileEditProfileForm').style.display = 'block';
  
  // Change the modal title to "Edit Profile"
  document.getElementById('y_mobileProfileModalLabel').innerText = 'Edit Profile';
});

document.getElementById('y_mobile_saveProfileBtn').addEventListener('click', function() {
  // Here you can add your save functionality, e.g., send the data to a server

  // Optionally, reset the fields or update them with new values
  const name = document.getElementById('y_mobile_editName').value;
  const email = document.getElementById('y_mobile_editEmail').value;
  const mobile = document.getElementById('y_mobile_editMobile').value;

  // Log the values (or send them to your server)
  console.log("Saved Name:", name);
  console.log("Saved Email:", email);
  console.log("Saved Mobile:", mobile);

  // Close the modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('y_mobileProfileModal'));
  modal.hide();

  // Reset the forms and switch back to the profile view
  document.getElementById('mobileEditProfileForm').style.display = 'none';
  document.getElementById('mobileProfileForm').style.display = 'block';

  // Change the modal title back to "Profile"
  document.getElementById('y_mobileProfileModalLabel').innerText = 'Profile';
});
