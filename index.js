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
    inputPrefix.innerHTML =
      "<span class='user'>user</span>@<span class='user'>terminal.me</span>:~$ ";
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

      output.appendChild(inputPrefix.cloneNode(true));
      output.appendChild(newElement);
      outputContainer.appendChild(output);
      terminalInput.value = "";
      inputView.textContent = "";

      if (command === "help") {
        const help = document.createElement("p");
        help.innerHTML = `
          <span><span class="command">help</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="description">- Lists all available commands</span></span><br>
          <span><span class="command">welcome</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="description">- Displays a welcome message</span></span><br>
          <span><span class="command">whoami</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="description">- Tells you who I am and what I do</span></span><br>
          <span><span class="command">about</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="description">- A quick overview of my background and interests</span></span><br>
          <span><span class="command">contact</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="description">- Shows how to reach me (email, GitHub, etc.)</span></span><br>
          <span><span class="command">skills</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="description">- Lists the tech stack and tools I work with</span></span><br>
          <span><span class="command">experience</span>&nbsp;<span class="description">- Shows my work experience and projects</span></span><br>
          <span><span class="command">gui</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="description">- Switch to the graphical version of this portfolio</span></span><br>
          <span><span class="command">clear</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="description">- Clears the terminal</span></span><br>
        `;
        outputContainer.appendChild(help);
        return;
      }
      if (command === "clear" || command === "cl") {
        outputContainer.innerHTML = "";
        terminalInput.value = "";
        inputView.textContent = "";
        return;
      }
      if (command === "whoami") {
        const whoami = document.createElement("p");
        whoami.innerHTML = `I'm a software developer with a strong QA background, passionate about crafting robust backend systems and practical web solutions. 
          I thrive on clean code, clear goals, and continuous learning.`;
        outputContainer.appendChild(whoami);
        return;
      }
      if (command === "about") {
        const about = document.createElement("p");
        about.innerHTML = `Currently finishing my degree in Computer Engineering. I started my journey as a QA tester, which taught me the importance of precision and edge cases. 
          Over time, I transitioned into development, working with TypeScript, Node.js, and building web apps using modern frameworks like React and Remix.
          When I’m not coding, I’m probably learning something new, lifting weights, or reading a book.`;
        outputContainer.appendChild(about);
        return;
      }
      if (command === "contact") {
        const contact = document.createElement("p");
        contact.innerHTML = `
          You can reach me here:<br>
          &nbsp;&nbsp;&nbsp;&nbsp;📧 Email: <span id="email" class="link">nicolas.pp333@gmail.com</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;💻 GitHub: <a class="link" href="https://github.com/Nicolass2001" target="_blank">Nicolass2001</a><br>
          &nbsp;&nbsp;&nbsp;&nbsp;💼 LinkedIn: <a class="link" href="https://www.linkedin.com/in/nicolas-pereira-9b4b83259/" target="_blank">Nicolas Pereira</a>
        `;
        const email = contact.querySelector("#email");
        email.addEventListener("click", () => {
          navigator.clipboard.writeText("nicolas.pp333@gmail.com");
          email.textContent = "Copied to clipboard!";
        });
        outputContainer.appendChild(contact);
        return;
      }
      if (command === "skills") {
        const skills = document.createElement("p");
        skills.innerHTML = `
          Languages:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;JavaScript / TypeScript, HTML, CSS, SQL, C#, Java, Go (learning)<br>
          Frameworks:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;Node.js, Express, React, Remix, ASP.NET<br>
          Tools:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;Git, GitHub, PostgreSQL, SQLite, Docker, Jest, Postman, Playwright<br>
          Soft Skills:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;Teamwork, problem-solving, communication, adaptability<br>
        `;
        outputContainer.appendChild(skills);
        return;
      }
      if (command === "experience") {
        const experience = document.createElement("p");
        experience.innerHTML = `🔹 
          QA Software Tester (Previous Role)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;- Manual and exploratory testing for web applications<br>
            &nbsp;&nbsp;&nbsp;&nbsp;- Wrote detailed bug reports and test plans<br>
            &nbsp;&nbsp;&nbsp;&nbsp;- Collaborated with devs to improve product quality<br>
          <br>
          🔹 Personal Projects<br>
            &nbsp;&nbsp;&nbsp;&nbsp;- Fintrack: Expense tracker with budget group limits (TypeScript, Express, PostgreSQL)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;- Terminal Portfolio: You're looking at it 😉<br>
          <br>
          🔹 Always working on new ideas and improving old ones.
        `;
        outputContainer.appendChild(experience);
        return;
      }
      if (command === "gui") {
        const gui = document.createElement("p");
        gui.innerHTML = `Switching to graphical interface... launching ⏳`;
        outputContainer.appendChild(gui);
        setTimeout(() => {
          window.open("http://nicolaspereira.me", "_blank");
        }, 1000);
        return;
      }
      if (command === "welcome") {
        const welcome = document.createElement("pre");
        welcome.innerHTML = `  _   _ _           _             ____               _           
 | \\ | (_) ___ ___ | | __ _ ___  |  _ \\ ___ _ __ ___(_)_ __ __ _ 
 |  \\| | |/ __/ _ \\| |/ _\` / __| | |_) / _ \\ '__/ _ \\ | '__/ _\` |
 | |\\  | | (_| (_) | | (_| \\__ \\ |  __/  __/ | |  __/ | | | (_| |
 |_| \\_|_|\\___\\___/|_|\\__,_|___/ |_|   \\___|_|  \\___|_|_|  \\__,_|
`;
        const welcomeText = document.createElement("p");
        welcomeText.innerHTML = `
        Welcome to my terminal portfolio!<br>
        ---<br>
        Source code of this project can be found in <a class="link" href="https://github.com/Nicolass2001/terminal-portfolio" target="_blank">GitHub</a><br>
        ---<br>
        Type <span class="command">help</span> to lists all available commands<br>
        `;
        outputContainer.appendChild(welcome);
        outputContainer.appendChild(welcomeText);
        return;
      }
      const defaultOutput = document.createElement("p");
      defaultOutput.innerHTML = `<span class="command">${command}</span> <span class="description">- Command not found try </span> 
        <span class="command">help</span> <span class="description">for more information</span>`;
      outputContainer.appendChild(defaultOutput);
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
