function validateDisplayName(value) {
  try {
    const v = String(value || '').trim();
    if (!v) return 'Please enter your name.';
    if (v.length < 2) return 'Name is too short.';
    if (v.length > 40) return 'Name is too long.';
    return '';
  } catch (error) {
    console.error('validateDisplayName error:', error);
    return 'Invalid name.';
  }
}

function validatePassword(value) {
  try {
    const v = String(value || '');
    if (!v) return 'Please enter your password.';
    if (v.length < 6) return 'Password must be at least 6 characters.';
    if (v.length > 64) return 'Password is too long.';
    return '';
  } catch (error) {
    console.error('validatePassword error:', error);
    return 'Invalid password.';
  }
}function validateEmail(value) {
  try {
    const v = String(value || '').trim();
    if (!v) return 'Please enter your email address.';
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(v)) return 'Please enter a valid email.';
    return '';
  } catch (error) {
    console.error('validateEmail error:', error);
    return 'Invalid email.';
  }
}

function validateArea(value) {
  try {
    const v = String(value || '').trim();
    if (!v) return 'Please enter your area.';
    if (v.length > 100) return 'Area description is too long.';
    return '';
  } catch (error) {
    console.error('validateArea error:', error);
    return 'Invalid area.';
  }
}

function validateConfirmPassword(password, confirm) {
  try {
    if (String(confirm || '') !== String(password || '')) {
      return 'Passwords do not match.';
    }
    return '';
  } catch (error) {
    console.error('validateConfirmPassword error:', error);
    return 'Invalid confirmation.';
  }
}
