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

    //Limpa o formulário
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

//Ver dados no formulário na tabela
viewCatalogBtn.addEventListener("click", () => {
    formCatalog.style.display = "none";
    viewCatalogBtn.style.display = "none";
    container.style.width = "800px";
    tableCatalog.style.display = "table";

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

});

//Evento de delete do botão
tableTbody.addEventListener("click", (e) => {
    if(e.target.classList.contains("fa-circle-xmark")) {
        console.log("Teste do delete");
    }
});
