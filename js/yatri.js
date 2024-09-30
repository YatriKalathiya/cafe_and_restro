    // Function to check login status
    function checkLoginStatus() {
        const username = localStorage.getItem('username');
        const mobile = localStorage.getItem('mobile');

        const userDropdown = document.getElementById('userDropdown');
        const loginButton = document.getElementById('loginButton');
        const usernameDisplay = document.getElementById('usernameDisplay');

        // Add selectors for mobile menu elements
        const mobileUserDropdown = document.querySelector('#offcanvasMenu .user-section #userDropdown');
        const mobileLoginButton = document.querySelector('#offcanvasMenu .user-section #loginButton');
        const mobileUsernameDisplay = document.querySelector('#offcanvasMenu #usernameDisplay');

        if (!userDropdown || !loginButton || !usernameDisplay) {
            setTimeout(checkLoginStatus, 1000);
            return;
        }

        if (username && mobile) {
            // Update desktop menu
            userDropdown.style.display = 'block';
            loginButton.style.display = 'none';
            usernameDisplay.textContent = username;

            // Update mobile menu
            if (mobileUserDropdown) mobileUserDropdown.style.display = 'block';
            if (mobileLoginButton) mobileLoginButton.style.display = 'none';
            if (mobileUsernameDisplay) mobileUsernameDisplay.textContent = username;

            setupLogoutListener();
            setupEditProfileListener();
            const saveProfileBtn = document.getElementById('y_saveProfileBtn');
            if (saveProfileBtn) {
                saveProfileBtn.removeEventListener('click', handleUpdate);
                saveProfileBtn.addEventListener('click', handleUpdate);
            }
        } else {
            // Update desktop menu
            userDropdown.style.display = 'none';
            loginButton.style.display = 'block';

            // Update mobile menu
            if (mobileUserDropdown) mobileUserDropdown.style.display = 'none';
            if (mobileLoginButton) mobileLoginButton.style.display = 'block';
        }
    }

    // Function to handle logout
    function handleLogout() {
        localStorage.removeItem('username');
        localStorage.removeItem('mobile');
        localStorage.removeItem('email');

        const profileForm = document.getElementById('profileForm');
        const editProfileForm = document.getElementById('editProfileForm');
        if (profileForm && editProfileForm) {
            profileForm.style.display = 'block';
            editProfileForm.style.display = 'none';
        }
        const saveProfileBtn = document.getElementById('y_saveProfileBtn');
        if (saveProfileBtn) {
            saveProfileBtn.removeEventListener('click', handleUpdate);
            saveProfileBtn.addEventListener('click', handleUpdate);
        }

        const logoutModelEl = document.getElementById('logoutModal');
        const logoutModal = bootstrap.Modal.getInstance(logoutModelEl);
        if (logoutModal) {
            logoutModal.hide();
        }
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

    function setupEditProfileListener() {
        const editProfileBtn = document.getElementById('editProfileBtn');
        if (editProfileBtn) {
            editProfileBtn.removeEventListener('click', toggleProfileForms);
            editProfileBtn.addEventListener('click', toggleProfileForms);
        } else {
            console.error("Edit profile button not found");
        }
    }

    // Function to populate the profile modal with user data
    function populateModel() {
        const userName = localStorage.getItem('username');
        const mobileNo = localStorage.getItem('mobile');
        const email = localStorage.getItem('email') || '';

        // Delay population slightly to ensure modal elements are available
        setTimeout(() => {
            const nameField = document.getElementById('y_name');
            const mobileField = document.getElementById('y_mobile');
            const editNameField = document.getElementById('y_editName');
            const editEmailField = document.getElementById('y_editEmail');
            const editMobileField = document.getElementById('y_editMobile');

            if (nameField) nameField.value = userName || '';
            if (mobileField) mobileField.value = mobileNo || '';
            if (editNameField) editNameField.value = userName || '';
            if (editEmailField) editEmailField.value = email || '';
            if (editMobileField) editMobileField.value = mobileNo || '';
        }, 100);
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

        const profileModalEl = document.getElementById('y_profileModal');
        const profileModal = bootstrap.Modal.getInstance(profileModalEl);

        if (profileModal) {
            profileModal.hide();
        } else {
            console.error("Profile modal instance not found.");
        }

        checkLoginStatus();
    }

    // Function to toggle between profile view and edit view
    function toggleProfileForms() {
        const profileForm = document.getElementById('profileForm');
        const editProfileForm = document.getElementById('editProfileForm');

        if (profileForm && editProfileForm) {
            if (profileForm.style.display !== 'none') {
                profileForm.style.display = 'none';
                editProfileForm.style.display = 'block';
                populateModel();
                
            } else {
                profileForm.style.display = 'block';
                editProfileForm.style.display = 'none';
            }
        } else {
            console.error('Profile form or edit profile form not found.');
        }
    }

    function setupMobileMenuListeners() {
        console.log("Setting up mobile menu listeners.");

        const offcanvasMenu = document.getElementById('offcanvasMenu');
        if (!offcanvasMenu) {
            console.error("Offcanvas menu element not found.");
            return;
        }

        offcanvasMenu.addEventListener('click', function (event) {
            const target = event.target.closest('[data-bs-toggle="modal"]');
            if (target) {
                console.log("Modal trigger found:", target);
                event.preventDefault(); // Prevent default link behavior

                const targetModalId = target.getAttribute('data-bs-target');
                const targetModal = document.querySelector(targetModalId);

                if (targetModal) {
                    const modalInstance = new bootstrap.Modal(targetModal);
                    modalInstance.show();
                    console.log("Modal shown:", targetModalId);
                } else {
                    console.error("Target modal not found.");
                }
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        checkLoginStatus();
        populateModel();
        setupMobileMenuListeners();

        const offcanvasMenu = document.getElementById('offcanvasMenu');
        if (offcanvasMenu) {
            offcanvasMenu.addEventListener('shown.bs.offcanvas', function () {
                checkLoginStatus();
                console.log("Offcanvas menu shown on small screen.");
            });
        }

        const profileModal = document.getElementById('y_profileModal');
        if (profileModal) {
            profileModal.addEventListener('show.bs.modal', function () {
                populateModel();
            });
        }

        const editProfileBtn = document.getElementById('editProfileBtn');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', toggleProfileForms);
        }

        const saveProfileBtn = document.getElementById('y_saveProfileBtn');
        if (saveProfileBtn) {
            saveProfileBtn.addEventListener('click', handleUpdate);
        }

        window.addEventListener('storage', function (e) {
            if (e.key === 'username' || e.key === 'mobile' || e.key === 'email') {
                checkLoginStatus();
            }
        });
    });

    // Additional check to handle cases where the script might run before DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkLoginStatus);
        document.addEventListener('DOMContentLoaded', populateModel);
    } else {
        checkLoginStatus();
    }

    // Call checkLoginStatus when the offcanvas menu is opened
    const offcanvasMenu = document.getElementById('offcanvasMenu');
    if (offcanvasMenu) {
        offcanvasMenu.addEventListener('show.bs.offcanvas', checkLoginStatus);
    }

    document.addEventListener('DOMContentLoaded', function () {
        const totalItems = localStorage.getItem('total-items');
        console.log("totalItems", totalItems);

        const totalCartElement = document.getElementById('totalCart');
        if (totalCartElement && totalItems !== null) {
            totalCartElement.textContent = totalItems;
        }
    });