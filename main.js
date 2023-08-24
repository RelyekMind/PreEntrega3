document.addEventListener("DOMContentLoaded", function () {
    const carritoIcon = document.getElementById("carritoIcon");
    const productosContainer = document.getElementById("productos");
    const carritoProductos = document.getElementById("carritoProductos");
    const totalCarrito = document.getElementById("totalCarrito");
    const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
    let carrito = [];

    const productosData = [
        { id: 1, nombre: 'Teclado mecánico RGB', tipo: 'Teclado', precio: 120 },
        { id: 2, nombre: 'Teclado de membrana', tipo: 'Teclado', precio: 40 },
        { id: 3, nombre: 'Teclado inalámbrico', tipo: 'Teclado', precio: 60 },
        { id: 4, nombre: 'Teclado para juegos retroiluminado', tipo: 'Teclado', precio: 90 },
        { id: 5, nombre: 'Teclado compacto mecánico', tipo: 'Teclado', precio: 100 },
        { id: 6, nombre: 'Teclado ergonómico con reposamuñecas', tipo: 'Teclado', precio: 130 },
        { id: 7, nombre: 'Teclado mecánico tenkeyless', tipo: 'Teclado', precio: 110 },
        
        { id: 8, nombre: 'Ratón gaming con iluminación RGB', tipo: 'Mouse', precio: 50 },
        { id: 9, nombre: 'Ratón óptico ergonómico', tipo: 'Mouse', precio: 25 },
        { id: 10, nombre: 'Ratón inalámbrico compacto', tipo: 'Mouse', precio: 30 },
        { id: 11, nombre: 'Ratón para juegos con 12 botones programables', tipo: 'Mouse', precio: 70 },
        { id: 12, nombre: 'Ratón ambidiestro', tipo: 'Mouse', precio: 40 },
        { id: 13, nombre: 'Ratón con sensor de alta precisión', tipo: 'Mouse', precio: 60 },
        { id: 14, nombre: 'Ratón vertical para reducir el estrés', tipo: 'Mouse', precio: 35 },
        
        { id: 15, nombre: 'Auriculares con sonido envolvente 7.1', tipo: 'Auriculares', precio: 100 },
        { id: 16, nombre: 'Auriculares inalámbricos con cancelación de ruido', tipo: 'Auriculares', precio: 150 },
        { id: 17, nombre: 'Auriculares con micrófono retráctil', tipo: 'Auriculares', precio: 80 },
        { id: 18, nombre: 'Auriculares estilo retro', tipo: 'Auriculares', precio: 70 },
        { id: 19, nombre: 'Auriculares con iluminación RGB', tipo: 'Auriculares', precio: 90 },
        { id: 20, nombre: 'Auriculares para streaming con calidad de estudio', tipo: 'Auriculares', precio: 130 },
        { id: 21, nombre: 'Auriculares in-ear para gaming', tipo: 'Auriculares', precio: 60 },
        
        { id: 22, nombre: 'Mousepad extendido con diseño personalizado', tipo: 'Mousepad', precio: 25 },
        { id: 23, nombre: 'Mousepad con superficie texturizada', tipo: 'Mousepad', precio: 15 },
        { id: 24, nombre: 'Mousepad con base de goma antideslizante', tipo: 'Mousepad', precio: 20 },
        { id: 25, nombre: 'Mousepad XL para teclado y ratón', tipo: 'Mousepad', precio: 30 },
        { id: 26, nombre: 'Mousepad con ilustraciones de juegos', tipo: 'Mousepad', precio: 18 },
        { id: 27, nombre: 'Mousepad con carga inalámbrica integrada', tipo: 'Mousepad', precio: 40 },
        { id: 28, nombre: 'Mousepad ergonómico con soporte para muñeca', tipo: 'Mousepad', precio: 22 },
      ];

    productosData.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Tipo: ${producto.tipo}</p>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <button class="btn btn-primary btn-comprar" data-id="${producto.id}">Comprar</button>
                </div>
            </div>
        `;
        productosContainer.appendChild(card);
    });

    const mostrarMensaje = mensaje => {
        const mensajeDiv = document.createElement("div");
        mensajeDiv.className = "alert alert-success mt-3";
        mensajeDiv.textContent = mensaje;
        document.body.appendChild(mensajeDiv);

        setTimeout(function () {
            mensajeDiv.remove();
        }, 3000);
    };

    const obtenerProductoPorId = id => {
        return productosData.find(producto => producto.id === id);
    };

    const actualizarCarrito = () => {
        carritoProductos.innerHTML = "";
        let total = 0;

        carrito.forEach(item => {
            const producto = obtenerProductoPorId(item.id);
            const row = document.createElement("div");
            row.classList.add("row", "mt-3");
            row.innerHTML = `
                <div class="col-4">${producto.nombre}</div>
                <div class="col-3">${item.cantidad} unidades</div>
                <div class="col-3">$${producto.precio * item.cantidad}</div>
                <div class="col-2">
                    <button class="btn btn-sm btn-primary mr-2 btn-agregar" data-id="${producto.id}">+</button>
                    <button class="btn btn-sm btn-danger btn-quitar" data-id="${producto.id}">-</button>
                </div>
            `;
            carritoProductos.appendChild(row);
            total += producto.precio * item.cantidad;
        });

        totalCarrito.textContent = `$${total}`;
    };

    document.querySelectorAll(".btn-comprar").forEach(producto => {
        producto.addEventListener("click", function () {
            const id = parseInt(this.getAttribute("data-id"));
            const productoEncontrado = carrito.find(item => item.id === id);

            if (productoEncontrado) {
                productoEncontrado.cantidad++;
            } else {
                carrito.push({ id: id, cantidad: 1 });
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
            mostrarMensaje("Se ha agregado su producto al carrito!");
        });
    });

    carritoProductos.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-agregar")) {
            const id = parseInt(event.target.getAttribute("data-id"));
            const productoEncontrado = carrito.find(item => item.id === id);
            productoEncontrado.cantidad++;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
        } else if (event.target.classList.contains("btn-quitar")) {
            const id = parseInt(event.target.getAttribute("data-id"));
            const productoEncontrado = carrito.find(item => item.id === id);
            if (productoEncontrado.cantidad > 1) {
                productoEncontrado.cantidad--;
            } else {
                const index = carrito.findIndex(item => item.id === id);
                carrito.splice(index, 1);
            }
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
        }
    });

    vaciarCarritoBtn.addEventListener("click", function () {
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarCarrito();
    });

    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"));
        actualizarCarrito();
    }
});
