const container = document.querySelector(".container");
const formCatalog = document.querySelector("#form-catalog");
const viewCatalogBtn = document.querySelector("#view-catalog-btn");
const tableCatalog = document.querySelector("#book-table"); 
const tableTbody = document.querySelector("#book-table tbody");

//Pegar dados do formulário
formCatalog.addEventListener("submit", (event) => {
    event.preventDefault();
    const datas = new FormData(formCatalog);

    const title = datas.get("title");
    const author = datas.get("author");
    const date = datas.get("date");

    addBookTable(title, author, date);
    formCatalog.reset();
});
//Ver dados do formulário
viewCatalogBtn.addEventListener("click", () => {
    formCatalog.style.display = "none";
    viewCatalogBtn.style.display = "none";
    container.style.width = "800px";
    tableCatalog.style.display = "table"
});
//Adicionando livro ao catálogo
function addBookTable(title, author, date) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${title}</td>
        <td>${author}</td>
        <td>${date}</td>
    `;

    tableTbody.appendChild(newRow);
}