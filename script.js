const content = document.querySelector("#content");
const head = document.querySelector("head");
const body = document.querySelector("body");

let currPage = "home";
if (window.location.pathname !== "/") {
  currPage = window.location.pathname.split("/")[1];
  console.log(currPage);
}

let pageStates = new Map();
const customComponents = new Map();

function addPage(page, state) {
  pageStates.set(page, state);
  console.log("Page added");
  rerender(page);
}

let clickEventEmitters = new Map();
let keydownEventEmitters = new Map();

function addEvents(funcs) {
  for (const func of funcs) {
    const [event, element] = func.name.split(/_(.*)/).slice(0, 2);
    if (event === "keydown") {
      keydownEventEmitters.set(element, func);
    } else if (event === "click") {
      clickEventEmitters.set(element, func);
    }
  }
}

const pageInitialized = new Map();

function addComponent(templateId, tag, contentProps = {}, styleProps = []) {
  const template = document.querySelector(`template[data-if="${templateId}"]`);
  console.log(Object.values(template.attributes).map((attr) => attr.name));
  const attrType = Object.values(template.attributes).map((attr) => attr.name);
  console.log(pageStates)
  if (attrType.includes("data-if")) {
    if (pageStates.get("notebook").showCard.get()) {
      const clone = template.content.cloneNode(true);
      const element = clone.children[1];
      const path = `components/${tag}.html`;
      fetch(path)
        .then((r) => r.text())
        .then((r) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(r, "text/html");
          for (const [key, value] of Object.entries(contentProps)) {
            doc.querySelector(`#${key}`).textContent = value;
          }

          const script = doc.querySelector("script");
          const section = doc.querySelector("section");
          section.setAttribute("data-id", templateId)

          template.parentElement.appendChild(doc.querySelector("section"));

          if (script) {
            const newScript = document.createElement("script");
            newScript.textContent = script.textContent;
            template.parentElement.appendChild(newScript);
          }
        });
    }
  }
  //for(const rule of styleProps){
  //    const [element, style, value] = rule.split("_")
  //    clone.querySelector(`#${element}`).style[style] = value;
  //}
}

const click_home_btn = () => {
  loadPage("home").then((r) =>
    r ? console.log("Page loaded") : console.log("Page not loaded")
  );
};

body.addEventListener("click", (event) => {
  if (clickEventEmitters.has(event.target.id)) {
    clickEventEmitters.get(event.target.id)();
  }
});

body.addEventListener("keydown", (event) => {
  if (keydownEventEmitters.has(event.target.id)) {
    keydownEventEmitters.get(event.target.id)(event);
  }
});

const pageComponents = new Map();
const stateComponents = new Map();

pageComponents.set("notebook", ["showCard"]);

function rerender(page) {
  if (pageStates.has(page)) {
    const pageState = pageStates.get(page);
    Object.values(pageState).forEach((methods) => {
      const { set } = methods;
      set();
    });
  }

  const components = pageComponents.get(page);
  if (components) {
    addComponent("showCard", "my-card", {
      title: "Hello World",
      content: "This is a card",
    });
  }
}

window.addEventListener("popstate", (event) => {
  const page = window.location.pathname.split("/")[1];
  loadPage(page).then((r) => {
    if (r) {
      console.log("Page loaded");
    } else {
      console.log("Page not loaded");
    }
  });
});

async function loadPage(page) {
  currPage = page;
  history.pushState(null, "", `/${page}`);
  const path = `app/${page}/${page}`;
  const finalPath = path + ".html";
  const pageFile = await fetch(finalPath);
  content.innerHTML = await pageFile.text();

  if (body.children.length > 1) {
    body.removeChild(body.lastChild);
  }
  if (head.children.length > 1) {
    head.removeChild(head.lastChild);
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = path + ".style.css";
  head.appendChild(link);

  const script = document.createElement("script");
  script.src = path + `.script.js?cacheBust=${Date.now()}`;
  script.type = "module";
  body.appendChild(script);

  const templates = document.getElementsByTagName("template");
  for (const template of templates) {
    const dataset = template.dataset;
    if (dataset.if) {
      console.log(template);
    }
  }


  return true;
}

loadPage(currPage).then((r) => {
  if (r) {
    console.log("Page loaded");
  } else {
    console.log("Page not loaded");
  }
});

addEvents([click_home_btn]);

const stateProxy = {};

const state = new Proxy(stateProxy, {
    set: (obj, prop, value) => {
        obj[prop] = value;
        updateComponents(obj, prop, value);
        return true;
    },
    });


const updateComponents = (obj, prop, value) => {
    const components = document.querySelectorAll(`[data-id="${prop}"]`);
    if(value){
        components.forEach(component => {
            component.style.display = "block";
        })
    }else{
        components.forEach(component => {
            component.style.display = "none";
        })
    }
}


