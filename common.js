function navigateTo(page) {
    window.location.href = page;
  }
  
  function startVoice() {
    if (annyang) {
      const commands = {
        'hello': () => alert('Hello World'),
        'change the color to *color': color => document.body.style.backgroundColor = color,
        'navigate to *page': page => navigateTo(`${page.toLowerCase()}.html`)
      };
      annyang.addCommands(commands);
      annyang.start();
    }
  }
  
  function stopVoice() {
    if (annyang) {
      annyang.abort();
    }
  }
  