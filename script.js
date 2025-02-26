const content = document.querySelector("#content");
const head = document.querySelector("head");
const body = document.querySelector("body");

let currPage = "home";
if (window.location.pathname !== "/") {
  currPage = window.location.pathname.split("/")[1];
  console.log(currPage);
}

let pageStates = new Map();

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


function addComponent(template){

      const clone = template.content.cloneNode(true);
      const element = clone.children[0];
      const tag = element.tagName.toLowerCase();
      const htmlPath = `components/${tag}.html`;
      fetch(htmlPath)
        .then((r) => r.text())
        .then((r) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(r, "text/html");
          if(template.getAttribute("data-if")){
            const sectionTemplate = doc.querySelector("section");
            const section = sectionTemplate.cloneNode(true);
            const contentProps = Object.values(element.attributes)
            for (const prop of contentProps) {
              section.querySelector(`#${prop.name}`).textContent = prop.value;
            }

            const script = doc.querySelector("script");
            const stateName = template.getAttribute("data-if");
            section.setAttribute("data-id", stateName)
            if(pageStates.get(currPage)[stateName].get()){
                section.style.display = "block";
            }else{
                section.style.display = "none";
            }

            template.parentElement.appendChild(section);

            if (script) {
              const newScript = document.createElement("script");
              newScript.type = "module";
              newScript.src = `components/${tag}.script.js?cacheBust=${Date.now()}`;
              template.parentElement.appendChild(newScript);
            }


          }else if(template.getAttribute("data-for")){
            const stateName = template.getAttribute("data-for").split(" ")[2];
            const stateData = pageStates.get(currPage)[stateName].get().filter(e => e != undefined);
            
            for(const data of stateData){
              const sectionTemplate = doc.querySelector("section");
              const section = sectionTemplate.cloneNode(true);
              console.log(data)
              const contentProps = Object.entries(data)
              for (const prop of contentProps) {
                section.querySelector(`#${prop[0]}`).textContent = prop[1];
              }

              const script = doc.querySelector("script");
              section.setAttribute("data-id", stateName)

              template.parentElement.appendChild(section);

              if (script) {
                const newScript = document.createElement("script");
                newScript.type = "module";
                newScript.src = `components/${tag}.script.js?cacheBust=${Date.now()}`;
                template.parentElement.appendChild(newScript);
              }

            }

          }else{
            const contentProps = Object.values(element.attributes)
            for (const prop of contentProps) {
              doc.querySelector(`#${prop.name}`).textContent = prop.value;
            }

            const script = doc.querySelector("script");

            template.parentElement.appendChild(doc.querySelector("section"));

            if (script) {
              const newScript = document.createElement("script");
              newScript.type = "module";
              newScript.src = `components/${tag}.script.js?cacheBust=${Date.now()}`;
              template.parentElement.appendChild(newScript);
            }

          }
        });
        
        
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


function rerender(page) {
  if (pageStates.has(page)) {
    const pageState = pageStates.get(page);
    Object.values(pageState).forEach((methods) => {
      const { set } = methods;
      set();
    });
  }

  const templates = document.getElementsByTagName("template");
    for (const template of templates) {
            addComponent(template)
    }
}
// nested components are possible using recursion rendering
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
    // templates not needed
}


