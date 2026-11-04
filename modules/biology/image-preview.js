(function () {
  'use strict';
  const dialog = document.querySelector('#image-preview');
  if (!dialog) return;
  document.addEventListener('click',event => {
    const button = event.target.closest('button[data-image-preview]');
    if (!button) return;
    const source = document.querySelector(button.dataset.imagePreview);
    const hint = document.querySelector(button.dataset.previewHint);
    if (!source || !source.getAttribute('src')) return;
    const image = dialog.querySelector('img');
    image.src = source.src;
    image.alt = source.alt;
    dialog.querySelector('#image-preview-hint').textContent = hint?.textContent || '';
    if (!dialog.open) dialog.showModal();
  });
  dialog.addEventListener('click',event => {if (event.target === dialog) dialog.close();});
})();
