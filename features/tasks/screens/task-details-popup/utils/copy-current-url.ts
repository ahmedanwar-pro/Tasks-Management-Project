export async function copyCurrentUrl(): Promise<void> {
  const currentHref = window.location.href;

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(currentHref);
    return;
  }

  const textArea = document.createElement('textarea');
  textArea.value = currentHref;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}
