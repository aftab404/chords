// always cover custom components in a template tag
// <template data-if="card">
// <template data-for="card">
// <template >
// link states with components
// link components to pages
// check the type of template from script and then render the template
// use a proxy for state to rerender on change
// fix server to serve all files of the components
// think about just using string literals to use in js instead of creating separate html
console.log("card")
const card = (name, content) => {
    const placeholder = document.getElementsByTagName("my-card");
    for (const ph of placeholder) {
        ph.innerHTML = `
            <div class="card-header">
                <h2>${name}</h2>
            </div>
            <div class="card-body">
                <p>${content}</p>
            </div>
        `
    }
}

export { card }