document.getElementById('collect-links').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        const collected = new Set();

        const handler = e => {
          const link = e.target.closest('a');
          if (link && link.href) {
            collected.add(link.href);
            link.style.outline = '2px solid red';
          }
        };

        document.body.addEventListener('mouseover', handler);

        alert('Hover over links to collect them. Press ESC to finish.');

        const stop = e => {
          if (e.key === 'Escape') {
            document.body.removeEventListener('mouseover', handler);
            document.removeEventListener('keydown', stop);
            console.log('Collected URLs:\n' + [...collected].join('\n'));
            alert('Done! Check the console in that tab.');
          }
        };

        document.addEventListener('keydown', stop);
      }
    });
  });
});
