// custom tags render on load and templates can be used for conditional rendering
// static components, dynamic components
// fetch components from server to load js
// use templates and data tags to render components


const card = (name, content) => {
    const template = document.getElementById("card")
    const placeholder = document.getElementsByTagName("my-card");
    const clone = template.content.cloneNode(true);

    clone.querySelector("#title").innerHTML = name;
    clone.querySelector("#content").innerHTML = content;

    for(const child of placeholder){
        child.appendChild(clone);
    }
}


customComponents.push(card)
