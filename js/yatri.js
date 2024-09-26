

// // document.getElementById('y_editProfileBtn').addEventListener('click', function() {
// //   // Get current values from the profile form
// //   const name = document.getElementById('y_name').value;
// //   const email = document.getElementById('y_email').value;
// //   const mobile = document.getElementById('y_mobile').value;

// //   // Set the values in the edit form
// //   document.getElementById('y_editName').value = name;
// //   document.getElementById('y_editEmail').value = email;
// //   document.getElementById('y_editMobile').value = mobile;

// //   // Switch to the edit profile form
// //   document.getElementById('profileForm').style.display = 'none';
// //   document.getElementById('editProfileForm').style.display = 'block';

// //   // Change the modal title to "Edit Profile"
// //   document.getElementById('y_profileModalLabel').innerText = 'Edit Profile';
// // });

// // document.getElementById('y_saveProfileBtn').addEventListener('click', function() {
// //   // Here you can add your save functionality, e.g., send the data to a server

// //   // Optionally, reset the fields or update them with new values
// //   const name = document.getElementById('y_editName').value;
// //   const email = document.getElementById('y_editEmail').value;
// //   const mobile = document.getElementById('y_editMobile').value;

// //   // Log the values (or send them to your server)
// //   console.log("Saved Name:", name);
// //   console.log("Saved Email:", email);
// //   console.log("Saved Mobile:", mobile);

// //   // Close the modal
// //   const modal = bootstrap.Modal.getInstance(document.getElementById('y_profileModal'));
// //   modal.hide();

// //   // Reset the forms and switch back to the profile view if needed
// //   document.getElementById('editProfileForm').style.display = 'none';
// //   document.getElementById('profileForm').style.display = 'block';

// //   // Change the modal title back to "Profile"
// //   document.getElementById('y_profileModalLabel').innerText = 'Profile';
// // });


// // // offcanvas model 

// // document.getElementById('y_mobile_editProfileBtn').addEventListener('click', function() {
// //   // Get current values from the mobile profile form
// //   const name = document.getElementById('y_mobile_name').value;
// //   const email = document.getElementById('y_mobile_email').value;
// //   const mobile = document.getElementById('y_mobile_mobile').value;

// //   // Set the values in the edit form
// //   document.getElementById('y_mobile_editName').value = name;
// //   document.getElementById('y_mobile_editEmail').value = email;
// //   document.getElementById('y_mobile_editMobile').value = mobile;

// //   // Switch to the edit profile form
// //   document.getElementById('mobileProfileForm').style.display = 'none';
// //   document.getElementById('mobileEditProfileForm').style.display = 'block';

// //   // Change the modal title to "Edit Profile"
// //   document.getElementById('y_mobileProfileModalLabel').innerText = 'Edit Profile';
// // });

// // document.getElementById('y_mobile_saveProfileBtn').addEventListener('click', function() {
// //   // Here you can add your save functionality, e.g., send the data to a server

// //   // Optionally, reset the fields or update them with new values
// //   const name = document.getElementById('y_mobile_editName').value;
// //   const email = document.getElementById('y_mobile_editEmail').value;
// //   const mobile = document.getElementById('y_mobile_editMobile').value;

// //   // Log the values (or send them to your server)
// //   console.log("Saved Name:", name);
// //   console.log("Saved Email:", email);
// //   console.log("Saved Mobile:", mobile);

// //   // Close the modal
// //   const modal = bootstrap.Modal.getInstance(document.getElementById('y_mobileProfileModal'));
// //   modal.hide();

// //   // Reset the forms and switch back to the profile view
// //   document.getElementById('mobileEditProfileForm').style.display = 'none';
// //   document.getElementById('mobileProfileForm').style.display = 'block';

// //   // Change the modal title back to "Profile"
// //   document.getElementById('y_mobileProfileModalLabel').innerText = 'Profile';
// // });

// Function to check login status
function checkLoginStatus() {
    const username = localStorage.getItem('username');
    const mobile = localStorage.getItem('mobile');

    const userDropdown = document.getElementById('userDropdown');
    const loginButton = document.getElementById('loginButton');

    if (!userDropdown || !loginButton) {
        console.error("User dropdown or login button not found. Retrying in 1 second...");
        setTimeout(checkLoginStatus, 1000);
        return;
    }

    if (username && mobile) {
        userDropdown.style.display = 'block';
        loginButton.style.display = 'none';
        const usernameDisplay = document.getElementById('usernameDisplay');
        if (usernameDisplay) {
            usernameDisplay.textContent = username;
        } else {
            console.error("Username display element not found");
        }
        setupLogoutListener();
    } else {
        userDropdown.style.display = 'none';
        loginButton.style.display = 'block';
    }
}

// Function to handle logout
function handleLogout() {
    localStorage.removeItem('username');
    localStorage.removeItem('mobile');
    localStorage.removeItem('email'); 
    checkLoginStatus();
}

// Function to setup logout listener
function setupLogoutListener() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.removeEventListener('click', handleLogout);
        logoutBtn.addEventListener('click', handleLogout);
    } else {
        console.error("Logout button not found");
    }
}

// Function to populate the profile modal with user data
function populateModel() {
    const userName = localStorage.getItem('username');
    const mobileNo = localStorage.getItem('mobile');
    const email = localStorage.getItem('email') || '';

    document.getElementById('y_name').value = userName;
    document.getElementById('y_mobile').value = mobileNo;
    document.getElementById('y_email').value = email;

    document.getElementById('y_editName').value = userName;
    document.getElementById('y_editEmail').value = email;
    document.getElementById('y_editMobile').value = mobileNo;
}

// Function to toggle between profile view and edit view
function toggleProfileForms() {
    const profileForm = document.getElementById('profileForm');
    const editProfileForm = document.getElementById('editProfileForm');

    if (profileForm.style.display !== 'none') {
        profileForm.style.display = 'none';
        editProfileForm.style.display = 'block';
    } else {
        profileForm.style.display = 'block';
        editProfileForm.style.display = 'none';
    }
}

// Function to handle the update action
function handleUpdate() {
    const newName = document.getElementById('y_editName').value;
    const newMobile = document.getElementById('y_editMobile').value;
    const newEmail = document.getElementById('y_editEmail').value;

    localStorage.setItem('username', newName);
    localStorage.setItem('mobile', newMobile);
    localStorage.setItem('email', newEmail);

    // Update the display immediately
    document.getElementById('usernameDisplay').textContent = newName;

    // Close the modal
    const profileModal = document.getElementById('y_profileModal');
    const modalInstance = bootstrap.Modal.getInstance(profileModal);
    modalInstance.hide();

    // Refresh the login status
    checkLoginStatus();
}

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded");

    checkLoginStatus();

    const profileModal = document.getElementById('y_profileModal');
    if (profileModal) {
        profileModal.addEventListener('show.bs.modal', populateModel);
    }

    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function () {
            toggleProfileForms();
            const modalInstance = new bootstrap.Modal(profileModal);
            modalInstance.show(); 
        });
    }

    const saveProfileBtn = document.getElementById('y_saveProfileBtn');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', handleUpdate);
    }

    window.addEventListener('storage', function (e) {
        if (e.key === 'username' || e.key === 'mobile' || e.key === 'email') {
            checkLoginStatus();
            populateModel();
        }
    });
});

// Additional check to handle cases where the script might run before DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkLoginStatus);
} else {
    checkLoginStatus();
}