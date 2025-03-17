const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');


const registerForm = document.querySelector('.register form');
const loginForm = document.querySelector('.login form');
const registerEmail = document.querySelector('.register input[type="email"]');
const registerPassword = document.querySelector('.register input[type="password"]');
const registerUsername = document.querySelector('.register input[type="text"]');
const loginUsername = document.querySelector('.login input[type="text"]');
const loginPassword = document.querySelector('.login input[type="password"]');


registerBtn.addEventListener('click', () => {
  container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
  container.classList.remove('active');
});

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


function validatePassword(password) {
  const results = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  };
  

  const strength = Object.values(results).filter(Boolean).length;
  
  return {
    results,
    strength,
    isValid: strength >= 4 
  };
}


function createValidationElement(inputElement) {
  const validationDiv = document.createElement('div');
  validationDiv.className = 'validation-feedback';
  inputElement.parentNode.appendChild(validationDiv);
  return validationDiv;
}


registerEmail?.addEventListener('input', function() {
  let feedbackElement = this.parentNode.querySelector('.validation-feedback');
  if (!feedbackElement) {
    feedbackElement = createValidationElement(this);
  }
  
  if (this.value === '') {
    feedbackElement.textContent = '';
    return;
  }
  
  if (validateEmail(this.value)) {
  
    feedbackElement.textContent = '✓ Valid email format';
    feedbackElement.className = 'validation-feedback valid';
    setTimeout(() => {
      feedbackElement.style.opacity = '0';
      setTimeout(() => {
        feedbackElement.textContent = '';
      }, 300);
    }, 1500);
  } else {

    feedbackElement.style.opacity = '1';
    feedbackElement.textContent = '✗ Invalid email format';
    feedbackElement.className = 'validation-feedback invalid';
  }
});

registerPassword?.addEventListener('input', function() {
  let feedbackElement = this.parentNode.querySelector('.validation-feedback');
  if (!feedbackElement) {
    feedbackElement = createValidationElement(this);
    feedbackElement.innerHTML = `
      <div class="password-strength-meter">
        <div class="strength-bar"></div>
      </div>
      <ul class="password-requirements">
        <li data-requirement="length">8+ characters</li>
        <li data-requirement="lowercase">Lowercase letter</li>
        <li data-requirement="uppercase">Uppercase letter</li>
        <li data-requirement="number">Number</li>
        <li data-requirement="special">Special character</li>
      </ul>
    `;
  }
  
  if (this.value === '') {
    feedbackElement.style.display = 'none';
    return;
  }
  
  feedbackElement.style.display = 'block';
  feedbackElement.style.opacity = '1';
  const validation = validatePassword(this.value);
  

  const strengthBar = feedbackElement.querySelector('.strength-bar');
  const strengthPercentage = (validation.strength / 5) * 100;
  strengthBar.style.width = `${strengthPercentage}%`;
  

  if (validation.strength <= 2) {
    strengthBar.style.backgroundColor = '#ff4d4d'; 
  } else if (validation.strength <= 3) {
    strengthBar.style.backgroundColor = '#ffdd57';
  } else {
    strengthBar.style.backgroundColor = '#48c774'; 
  }
  

  const requirements = feedbackElement.querySelectorAll('.password-requirements li');
  requirements.forEach(item => {
    const requirement = item.getAttribute('data-requirement');
    if (validation.results[requirement]) {
      item.className = 'valid';
      item.innerHTML = `✓ ${item.textContent.replace('✓ ', '').replace('✗ ', '')}`;
    } else {
      item.className = 'invalid';
      item.innerHTML = `✗ ${item.textContent.replace('✓ ', '').replace('✗ ', '')}`;
    }
  });
  

  if (validation.isValid) {
    setTimeout(() => {
      feedbackElement.style.opacity = '0';
      setTimeout(() => {
        feedbackElement.style.display = 'none';
      }, 300);
    }, 1500);
  }
});


registerUsername?.addEventListener('input', function() {
  let feedbackElement = this.parentNode.querySelector('.validation-feedback');
  if (!feedbackElement) {
    feedbackElement = createValidationElement(this);
  }
  
  if (this.value === '') {
    feedbackElement.textContent = '';
    return;
  }
  
  if (this.value.length >= 3) {

    feedbackElement.textContent = '✓ Username valid';
    feedbackElement.className = 'validation-feedback valid';
    setTimeout(() => {
      feedbackElement.style.opacity = '0';
      setTimeout(() => {
        feedbackElement.textContent = '';
      }, 300);
    }, 1500);
  } else {

    feedbackElement.style.opacity = '1';
    feedbackElement.textContent = '✗ Username must be at least 3 characters';
    feedbackElement.className = 'validation-feedback invalid';
  }
});

registerForm?.addEventListener('submit', function(e) {

  const email = this.querySelector('input[type="email"]').value;
  const password = this.querySelector('input[type="password"]').value;
  const username = this.querySelector('input[type="text"]').value;
  
  if (!validateEmail(email) || validatePassword(password).strength < 3 || username.length < 3) {
    e.preventDefault();
    alert('Please fix the form errors before submitting');
  }
});

loginForm?.addEventListener('submit', function(e) {

  const username = this.querySelector('input[type="text"]').value;
  const password = this.querySelector('input[type="password"]').value;
  
  if (username.length < 3 || password.length < 8) {
    e.preventDefault();
    alert('Please enter valid credentials');
  }
});


document.querySelectorAll('.input-box input').forEach(input => {
  const icon = input.nextElementSibling; 
  
  
  input.addEventListener('focus', function() {
    icon.style.opacity = '0';
    icon.style.visibility = 'hidden';
  });
  

  input.addEventListener('blur', function() {
    if (this.value === '') {
      icon.style.opacity = '1';
      icon.style.visibility = 'visible';
    }
  });
  
  if (input.value !== '') {
    icon.style.opacity = '0';
    icon.style.visibility = 'hidden';
  }
});