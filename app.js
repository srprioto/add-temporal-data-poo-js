class Product {

    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }

}

class UI {

    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product name: </strong> ${product.name}
                    <strong>Product price: </strong> ${product.price}
                    <strong>Product year: </strong> ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">eliminar</a>
                </div>
            </div>
        `
        productList.appendChild(element);

        this.showMessage('agregado', 'success');
        this.resetForm();


    }

    resetForm() {
        document.getElementById('product-form').reset()
    }

    deleteProduct(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove()
            this.showMessage('eliminado', 'danger');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `mt-3 text-center alert alert-${cssClass}`;
        div.appendChild(document.createTextNode(message));

        //mostrar en el DOM
        const container = document.querySelector(".container")
        const app = document.querySelector('#App')

        container.insertBefore(div, app);   
        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 2000);
        

    }

}

class App {

    constructor() {
        
        const producto = new Product();

        document.getElementById('product-form').addEventListener("submit", (e) => {

            e.preventDefault();
            const name = document.getElementById('name').value;
            const price = document.getElementById('price').value;
            const year = document.getElementById('year').value;

            const product = new Product(name, price, year);
            const ui = new UI();

            if (name === "" || price === "" || year === "") {
                ui.showMessage('completa los campos', 'info');
                
            }else{
                ui.addProduct(product);
            }

            

        })

        document.getElementById('product-list').addEventListener("click", (e) => {
            const ui = new UI();
            ui.deleteProduct(e.target)
            
        })


    }
    
}

new App()