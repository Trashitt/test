function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fakeSignIn({ name, password, remember }) {
  try {
    await wait(900 + Math.floor(Math.random() * 700));

    const trimmed = String(name || '').trim();
    const pwd = String(password || '');

    // Special-case example credentials removed.

    if (pwd.toLowerCase().includes('123')) {
      return { ok: false, message: 'That password is too common. Try something stronger.' };
    }

    if (Math.random() < 0.12) {
      return { ok: false, message: 'Temporary server issue. Please try again.' };
    }

    return { ok: true, user: { name: trimmed }, remember: !!remember };
  } catch (e) {
    return { ok: false, message: 'Network error. Please try again.' };
  }
}

async function fakeOAuthSignIn({ provider }) {
  try {
    await wait(700 + Math.floor(Math.random() * 800));
    if (Math.random() < 0.10) return { ok: false, message: 'Popup blocked. Please allow popups and try again.' };
    return { ok: true, provider: provider || 'Provider' };
  } catch (e) {
    return { ok: false, message: 'Network error. Please try again.' };
  }
}async function fakeSignUp({ name, email, area, password, confirm }) {
  try {
    await wait(900 + Math.floor(Math.random() * 700));

    const trimmed = String(name || '').trim();
    const mail = String(email || '').trim();
    const areaTrim = String(area || '').trim();
    const pwd = String(password || '');

    if (pwd.toLowerCase().includes('123')) {
      return { ok: false, message: 'That password is too common. Try something stronger.' };
    }
    if (!mail) {
      return { ok: false, message: 'Email is required.' };
    }
    if (!areaTrim) {
      return { ok: false, message: 'Area is required.' };
    }
    if (pwd !== String(confirm || '')) {
      return { ok: false, message: 'Passwords do not match.' };
    }
    if (Math.random() < 0.12) {
      return { ok: false, message: 'Temporary server issue. Please try again.' };
    }

    return { ok: true, user: { name: trimmed, email: mail, area: areaTrim } };
  } catch (e) {
    return { ok: false, message: 'Network error. Please try again.' };
  }
}
