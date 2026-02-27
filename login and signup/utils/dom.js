function focusById(id) {
  try {
    const el = document.getElementById(id);
    if (el && typeof el.focus === 'function') el.focus();
  } catch (error) {
    console.error('focusById error:', error);
  }
}

function scrollIntoViewIfExists(sectionId) {
  try {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    else window.location.href = `index.html#${sectionId}`;
  } catch (error) {
    console.error('scrollIntoViewIfExists error:', error);
  }
}