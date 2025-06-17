window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("content");

  setTimeout(() => {
    preloader.style.transition = "opacity 1s ease";
    preloader.style.opacity = 0;

    setTimeout(() => {
      preloader.style.pointerEvents = "none";
      preloader.style.zIndex = "-3";
      preloader.style.display = "none";
      content.style.display = "block";
    }, 100);
  }, 1000);
});

document.addEventListener('DOMContentLoaded', function() {
    const textInputs = document.querySelectorAll('input[type="text"], textarea');
    textInputs.forEach(input => {
        const minLength = input.getAttribute('minlength') || 0;
        const maxLength = input.getAttribute('maxlength') || Infinity;
        
        input.addEventListener('input', function() {
            validateTextInput(this, minLength, maxLength);
        });
    });
    
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('input', function() {
            validateEmail(this);
        });
    });
    
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            validatePhone(this);
        });
    });
    
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
});

function validateTextInput(input, minLength, maxLength) {
    const value = input.value.trim();
    const isValid = value.length >= minLength && value.length <= maxLength;
    
    input.classList.remove('is-valid', 'is-invalid');
    
    if (value.length === 0) return;
    
    if (isValid) {
        input.classList.add('is-valid');
    } else {
        input.classList.add('is-invalid');
    }
    
    return isValid;
}

function validateEmail(input) {
    const email = input.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(email);
    
    input.classList.remove('is-valid', 'is-invalid');
    
    if (email.length === 0) return;
    
    if (isValid) {
        input.classList.add('is-valid');
    } else {
        input.classList.add('is-invalid');
    }
    
    return isValid;
}

function validatePhone(input) {
    const phone = input.value.trim();
    const regex = /^[0-9]{10,13}$/;
    const isValid = regex.test(phone);
    
    input.classList.remove('is-valid', 'is-invalid');
    
    if (phone.length === 0) return;
    
    if (isValid) {
        input.classList.add('is-valid');
    } else {
        input.classList.add('is-invalid');
    }
    
    return isValid;
}

function validateForm(form) {
    let isValid = true;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.type === 'text' || input.tagName === 'TEXTAREA') {
            const minLength = input.getAttribute('minlength') || 0;
            const maxLength = input.getAttribute('maxlength') || Infinity;
            if (!validateTextInput(input, minLength, maxLength)) isValid = false;
        } else if (input.type === 'email') {
            if (!validateEmail(input)) isValid = false;
        } else if (input.type === 'tel') {
            if (!validatePhone(input)) isValid = false;
        } else if (input.type === 'password' && input.id !== 'regConfirmPassword') {
            if (!validatePassword(input)) isValid = false;
        } else if (input.type === 'password' && input.id === 'regConfirmPassword') {
            const passwordInput = form.querySelector('#regPassword');
            if (!validateConfirmPassword(input, passwordInput)) isValid = false;
        } else if (input.type === 'checkbox' && input.required) {
            if (!input.checked) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        }
    });
    
    return isValid;
}

document.addEventListener('DOMContentLoaded', function() {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    passwordInputs.forEach(input => {
        input.addEventListener('input', function() {
            validatePassword(this);
        });
    });
});

function validatePassword(input) {
    const password = input.value;
    const strengthBar = input.nextElementSibling?.querySelector('.password-strength-bar');
    const feedback = input.nextElementSibling?.nextElementSibling;
    
    input.classList.remove('is-valid', 'is-invalid');
    if (strengthBar) strengthBar.style.width = '0%';
    if (feedback) feedback.style.display = 'none';
    
    if (password.length === 0) return;
    
    let strength = 0;

    if (password.length >= 8) strength += 25;

    if (/[a-z]/.test(password)) strength += 25;
    
    if (/[A-Z]/.test(password)) strength += 25;
    
    if (/[0-9]/.test(password)) strength += 25;
    
    if (strengthBar) {
        strengthBar.style.width = strength + '%';
        
        if (strength < 50) {
            strengthBar.style.backgroundColor = '#dc3545';
        } else if (strength < 75) {
            strengthBar.style.backgroundColor = '#fd7e14';
        } else {
            strengthBar.style.backgroundColor = '#28a745';
        }
    }

    const isValid = password.length >= 8 && 
                   /[a-z]/.test(password) && 
                   /[A-Z]/.test(password) && 
                   /[0-9]/.test(password);
    
    if (isValid) {
        input.classList.add('is-valid');
    } else {
        input.classList.add('is-invalid');
        if (feedback) feedback.style.display = 'block';
    }
    
    return isValid;
}

function validateConfirmPassword(confirmInput, passwordInput) {
    const confirmPassword = confirmInput.value;
    const password = passwordInput.value;
    
    confirmInput.classList.remove('is-valid', 'is-invalid');
    
    if (confirmPassword.length === 0) return false;
    
    if (confirmPassword === password) {
        confirmInput.classList.add('is-valid');
        return true;
    } else {
        confirmInput.classList.add('is-invalid');
        return false;
    }
}

document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    const passwordInput = document.getElementById('regPassword');
    const confirmInput = document.getElementById('regConfirmPassword');
    
    const isPasswordValid = validatePassword(passwordInput);
    const isConfirmValid = validateConfirmPassword(confirmInput, passwordInput);
    
    if (!isPasswordValid || !isConfirmValid) {
        e.preventDefault();
    }
});
