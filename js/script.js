const container = document.querySelector(".container");
const formCatalog = document.querySelector("#form-catalog");
const viewCatalogBtn = document.querySelector("#view-catalog-btn");
const tableCatalog = document.querySelector("#book-table"); 
const tableTbody = document.querySelector("#book-table tbody");
const viewFormBtn = document.querySelector("#view-form-btn");

window.addEventListener("load", () => {
    const currentMode = localStorage.getItem("mode");

    if(currentMode === "table") showTableView();
    else {
        showFormView();
    }
});
//Pegar dados do formulário
formCatalog.addEventListener("submit", (event) => {
    event.preventDefault();

    const datas = new FormData(formCatalog);
    const title = datas.get("title");
    const author = datas.get("author");
    const date = datas.get("date");

    //Limpa o formulário
    formCatalog.reset();

    //Pegar dados no LocalStorage
    const storedData = localStorage.getItem("dateCatalogBook");
    const dateCatalog = storedData ? JSON.parse(storedData) : [];

    //Adicionar novo livro dentro do array de objetos
    dateCatalog.push({
        title: title,
        author: author,
        date: date
    });
    
    //Armazena e atualizar no localStorage
    localStorage.setItem("dateCatalogBook", JSON.stringify(dateCatalog));
    
});
//Evento de click para ver a tabela
viewCatalogBtn.addEventListener("click", () => {
    //Salvar qual função esta sendo exibida na página.
    localStorage.setItem("mode", "table");
    //Ver função
    showTableView()
});
//Evento de delete do botão
tableTbody.addEventListener("click", (e) => {
    if(e.target.classList.contains("fa-circle-xmark")) {
        localStorage.setItem("mode", "form")

        const row = e.target.closest("tr");
        const rows = Array.from(tableTbody.querySelectorAll("tr"));
        const index = rows.indexOf(row);

        const getCatalogBook = JSON.parse(localStorage.getItem("dateCatalogBook"));

        getCatalogBook.splice(index, 1);

        localStorage.setItem("dateCatalogBook", JSON.stringify(getCatalogBook));

        row.remove();
        
        localStorage.setItem("mode", "table");
        showTableView()
    }
});
//Evento de click para ver o formulário
viewFormBtn.addEventListener("click", () => {
    localStorage.setItem("mode", "form");
    showFormView()
});
//Ver a tabela
function showTableView() {
    formCatalog.style.display = "none";
    viewCatalogBtn.style.display = "none";
    viewFormBtn.style.display = "block";
    container.style.width = "800px";
    tableCatalog.style.display = "table";

    tableTbody.innerHTML = "";

    //Pego novamente os dados no LocalStorage para redenrizar na página.
    const getCatalogBook = JSON.parse(localStorage.getItem("dateCatalogBook"));

    //Pecorre o array para ser mostrado no HTML
    getCatalogBook.forEach((book) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.date}</td>
            <td>
                <i class="fa-solid fa-circle-xmark" style="color: #f00000; font-size: 30px; cursor: pointer"></i>
            </td>
        `;

        tableTbody.appendChild(newRow);
    });
}
//Ver formulário
function showFormView() {
    tableCatalog.style.display = "none";
    formCatalog.style.display = "flex";
    viewCatalogBtn.style.display = "block";
    viewFormBtn.style.display = "block";
    container.style.display = "block";
    container.style.width = "400px";
    viewFormBtn.style.display = "none";
}