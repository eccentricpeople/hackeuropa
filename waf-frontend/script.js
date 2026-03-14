document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Element Selectors ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const adminLoginBtn = document.getElementById('admin-login-btn');
    const adminModal = document.getElementById('admin-modal');
    
    const adminPasswordInput = document.getElementById('admin-password-input');
    const accessDeniedMsg = document.getElementById('access-denied-msg');
    
    const infoPanel = document.getElementById('info-panel-overlay');
    const closeInfo = document.getElementById('close-info');
    const tableBody = document.getElementById('action-table-body');

    const mainInput = document.querySelector('.main-input');
    const brandTrigger = document.getElementById('brand-trigger');
    const logoTrigger = document.getElementById('logo-trigger');
    const aboutOverlay = document.getElementById('about-overlay');
    const closeAbout = document.getElementById('close-about');

    // --- 2. Admin Login & Security Logic ---

    const SECRET_PASSWORD = "admin123"; // Change your password here

    adminPasswordInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            if (adminPasswordInput.value === SECRET_PASSWORD) {
                // SUCCESS: Switch views
                adminModal.classList.remove('active');
                infoPanel.style.display = 'flex';
                
                // Reset login state
                accessDeniedMsg.style.display = 'none';
                adminPasswordInput.value = '';
            } else {
                // FAILURE: Show Access Denied Pill
                accessDeniedMsg.style.display = 'block';
                adminPasswordInput.value = ''; 
            }
        }
    });

    // --- 3. Table Interactions (Toggle & Double Click) ---

    if (tableBody) {
        // Single Click to Toggle Blocked/Accepted
        tableBody.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('status-pill')) {
                if (target.classList.contains('blocked')) {
                    target.classList.replace('blocked', 'accepted');
                    target.textContent = 'accepted';
                } else {
                    target.classList.replace('accepted', 'blocked');
                    target.textContent = 'blocked';
                }
            }
        });

        // Double Click Site to Open Link
        tableBody.addEventListener('dblclick', (e) => {
            if (e.target.classList.contains('site-cell')) {
                let url = e.target.textContent.trim();
                if (url) {
                    const protocol = /^https?:\/\//i.test(url) ? "" : "https://";
                    window.open(protocol + url, '_blank');
                }
            }
        });
    }

    // --- 4. Navigation & UI Logic ---
    
    // Toggle Hamburger Menu
    hamburgerBtn.addEventListener('click', (event) => {
        event.stopPropagation(); 
        dropdownMenu.classList.toggle('active');
    });

    // Open Admin Login Modal
    adminLoginBtn.addEventListener('click', () => {
        dropdownMenu.classList.remove('active');
        adminModal.classList.add('active');
        accessDeniedMsg.style.display = 'none';
        adminPasswordInput.focus();
    });

    // About Section
    const openAbout = () => aboutOverlay.classList.add('active');
    const hideAbout = () => aboutOverlay.classList.remove('active');

    if (brandTrigger) brandTrigger.addEventListener('click', openAbout);
    if (logoTrigger) logoTrigger.addEventListener('click', openAbout);
    if (closeAbout) closeAbout.addEventListener('click', hideAbout);

    // --- 5. Global Click Handler (Closing Overlays) ---
    
    document.addEventListener('click', (event) => {
        // Close dropdown
        if (!dropdownMenu.contains(event.target) && event.target !== hamburgerBtn) {
            dropdownMenu.classList.remove('active');
        }

        // Close Admin Modal on background click
        if (event.target === adminModal) {
            adminModal.classList.remove('active');
            accessDeniedMsg.style.display = 'none';
        }

        // Close About Modal on background click
        if (event.target === aboutOverlay) {
            hideAbout();
        }

        // Close Info Panel on background click
        if (event.target === infoPanel) {
            infoPanel.style.display = 'none';
        }
    });

    // Close Button for Info Panel
    if (closeInfo) {
        closeInfo.addEventListener('click', () => {
            infoPanel.style.display = 'none';
        });
    }

    // --- 6. Main Input Handling ---
    
    if (mainInput) {
        mainInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); 
                alert("TRATA Analysis Started for: " + mainInput.value);
                
                // Optional: Automatically add the scanned site to the admin table
                const newRow = document.createElement('tr');
                newRow.className = 'log-row';
                newRow.innerHTML = `
                    <td class="site-cell">${mainInput.value}</td>
                    <td class="action-cell"><span class="status-pill accepted">accepted</span></td>
                `;
                tableBody.appendChild(newRow);
            }
        });
    }
});