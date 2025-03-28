/* Ejemplo de como se ve el elemento en el DOM:
```html
<div class="terminalContainer">
  <div class="terminal">
    <input class="terminalInput" />
    <div class="inputViewBox">
      <span class="inputPrefix">~/user:</span><span class="inputView"></span><span class="cursor"> </span>
    </div>
    <div class="outputContainer"></div>
  </div>
</div>
```
*/
class Terminal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Create all elements -----------------------------------
    const terminalContainer = document.createElement("div");
    terminalContainer.className = "terminalContainer";

    const terminal = document.createElement("div");
    terminal.className = "terminal";

    const terminalInput = document.createElement("input");
    terminalInput.className = "terminalInput";

    const inputViewBox = document.createElement("div");
    inputViewBox.className = "inputViewBox";

    const inputPrefix = document.createElement("span");
    inputPrefix.textContent = "user@terminal.me:~$ ";
    inputPrefix.className = "inputPrefix";

    const inputView = document.createElement("span");
    inputView.className = "inputView";

    const endCursor = document.createElement("span");

    const outputContainer = document.createElement("div");
    outputContainer.className = "outputContainer";

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "styles.css";

    // Element logic -----------------------------------
    terminalInput.addEventListener("input", () => {
      inputView.textContent = terminalInput.value;
    });

    terminalInput.addEventListener("focus", () => {
      inputView.textContent = terminalInput.value;
      terminalInput.setSelectionRange(
        terminalInput.value.length,
        terminalInput.value.length
      );
      endCursor.classList.add("cursor");
      endCursor.textContent = " ";
    });

    terminalInput.addEventListener("blur", () => {
      inputView.textContent = terminalInput.value;
      endCursor.classList.remove("cursor");
      endCursor.textContent = "";
    });

    terminalContainer.addEventListener("click", () => {
      terminalInput.focus();
    });

    const handleCommand = (command) => {
      const output = document.createElement("div");
      output.className = "output";

      const newElement = document.createElement("span");
      newElement.textContent = `${command}`;
      newElement.className = "command";

      output.appendChild(inputPrefix.cloneNode(true));
      output.appendChild(newElement);
      outputContainer.appendChild(output);
      terminalInput.value = "";
      inputView.textContent = "";

      if (command === "help") {
        const help = document.createElement("p");
        help.innerHTML = `
          <span class="command">help</span> <span class="description">- Show this message</span>
          <br>
          <span class="command">clear</span> <span class="description">- Clear the terminal</span>
          <br>
          <span class="command">echo</span> <span class="description">- Print arguments</span>
          <br>
          <span class="command">ls</span> <span class="description">- List directory contents</span>
          <br>
          <span class="command">cd</span> <span class="description">- Change the shell working directory</span>
          <br>
          <span class="command">pwd</span> <span class="description">- Print name of current/working directory</span>
          <br>
          <span class="command">cat</span> <span class="description">- Concatenate files and print on the standard output</span>
          <br>
          <span class="command">mkdir</span> <span class="description">- Make directories</span>
          <br>
          <span class="command">touch</span> <span class="description">- Create files</span>
          <br>
          <span class="command">rm</span> <span class="description">- Remove files or directories</span>
          <br>
          <span class="command">mv</span> <span class="description">- Move files</span>
          <br>
          <span class="command">cp</span> <span class="description">- Copy files</span>
          <br>
          <span class="command">clear</span> <span class="description">- Clear the terminal</span>
          <br>
          <span class="command">exit</span> <span class="description">- Close the terminal</span>
        `;
        outputContainer.appendChild(help);
        return;
      }
    };

    const handleCursor = (index, end) => {
      if (end == index) end += 1;
      const text = inputView.textContent;
      if (index >= text.length) {
        inputView.innerHTML = text;
        endCursor.classList.add("cursor");
        return;
      }

      const before = text.slice(0, index);
      const highlight = text.slice(index, end);
      const after = text.slice(end);

      endCursor.classList.remove("cursor");
      inputView.innerHTML = `${before}<span class="cursor">${highlight}</span>${after}`;
    };

    terminalInput.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        // TODO: Implement history
        event.preventDefault();
        return;
      }
      if (event.key === "ArrowLeft") {
        var index = terminalInput.selectionStart - 1;
        if (index < 0) {
          index = 0;
        }
        handleCursor(index, index);
        return;
      }
      if (event.key === "ArrowRight") {
        const index = terminalInput.selectionStart + 1;
        handleCursor(index, index);
        return;
      }
      if (event.key === "Enter") {
        const command = terminalInput.value.trim();
        handleCommand(command);
        return;
      }
    });

    terminalInput.addEventListener("keyup", (_) => {
      const index = terminalInput.selectionStart;
      const end = terminalInput.selectionEnd;
      handleCursor(index, end);
    });

    // Initial command -----------------------------------
    const command = this.getAttribute("command");
    if (command) handleCommand(command);

    // Autofocus -----------------------------------
    if (this.getAttribute("autofocus") == "true") {
      terminalInput.autofocus = true;
    }

    // Append elements -----------------------------------
    this.shadowRoot.appendChild(link);
    this.shadowRoot.appendChild(terminalContainer);
    terminalContainer.appendChild(terminal);
    terminal.appendChild(terminalInput);
    terminal.appendChild(inputViewBox);
    inputViewBox.appendChild(inputPrefix);
    inputViewBox.appendChild(inputView);
    inputViewBox.appendChild(endCursor);
    terminal.appendChild(outputContainer);
  }
}

customElements.define("terminal-component", Terminal);
