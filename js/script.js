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

    //Pegar dados no LocalStorage
    const dateCatalog = JSON.parse(localStorage.getItem("dateCatalogBook"));

    //Adicionar novo livro dentro do array de objetos
    dateCatalog.push({
        title: title,
        author: author,
        date: date
    });
    
    //Armazena e atualizar no localStorage
    localStorage.setItem("dateCatalogBook", JSON.stringify(dateCatalog));
    
});

//Ver dados do formulário
viewCatalogBtn.addEventListener("click", () => {
    formCatalog.style.display = "none";
    viewCatalogBtn.style.display = "none";
    container.style.width = "800px";
    tableCatalog.style.display = "table";

    const getCatalogBook = JSON.parse(localStorage.getItem("dateCatalogBook"));

    //Pecorre o array para ser mostrado no HTML
    getCatalogBook.forEach((book) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.date}</td>
        `;

        tableTbody.appendChild(newRow);
    });

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