export function select({label, id, name, type, placeholder = "", required = false, value = false}) {
  return `
  <div class="select">
    ${ label ?
      `<label for="${id}" class="content-xs overline" >${label}</label>`
      : ""
    }
    <div class="input__container">
      <input
        type="${type ? type : "text" }"
        placeholder="${placeholder}"
        class="input__content"
        id="${id}"
        name="${name ? name: id}"
        ${value ? `value="${value}"` : ""}
        ${required ? "required" : ""}
      >
    </div>
  </div>
  `
}