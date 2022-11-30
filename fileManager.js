const fs = require('fs')

class ProductManager{

    #products
    constructor(path){
        this.path = path
        this.format = 'utf-8'
    }



    createFile = async (path) => {
        if(fs.existsSync(path)){
            console.log('El archivo ya existe')
            return true
        }else{
            await fs.promises.writeFile(path, '', error => {
                if(error) return ('Hubo un error al crear el Archivo')
            })
            return false
        }
    }

    getNextId = () => {

        return 1
        const count = this.#products.length
        return (count >0) ? this.#products[count-1].id + 1: 1

        
    }

    readFile = async (path) => {
        fs.readFile(path, 'utf8', async (error, content) => {
            if(error) return console.log('Error reading file')
            console.log('Content', content)
            let x = await JSON.parse(content)
            console.log('X: ', x)
            return x
        })
    }
    
    getProducts = async (path) =>{
        /*
        fs.readFile(path, 'utf8', (error, content) => {
            if(error) return console.log('Error reading file')
            console.log(content)
            let x = JSON.parse(content)
            console.log('Los productos son: \n', x)
        })
        */
       const result = await this.readFile(path)
       console.log('Result: ', result)
       return 
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const product = {
            id: this.getNextId(),
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
        }
        let products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))

        products.push(product)
        let stg = JSON.stringify(products)

        fs.writeFileSync(this.path, stg, error => {
            if(error) return console.log('Hubo un error al escribir archivo')
        })

        /*
        console.log('product',product)
        if(fs.existsSync(this.path)){
            let productStg = ','+JSON.stringify(product)
            console.log('product stgring', productStg)

            fs.appendFile(this.path, productStg, error => {
                if(error) return console.log('Hubo un error, no se agregó producto')
            })
        }
        */
        
    }
    ///////////
    /*
    fs.appendFile(fileName, 'Este es el texto que estoy agregando', error => {
        if(error) return console.log('Hay un error');

        //Leer archivo
        fs.readFile(fileName, 'utf-8', (error, contenido)=>{
            if(error) return console.log('Hubo un error al leer');
            console.log('Contenido: ', contenido)

        })
    })
    */
    //////////

    getProductById = (id) => {
        //
    }

    updateProduct = (id) => {
        //
    }
}


//Agregar productos

//



async function run(){
    console.log('Funcion run')
    const path = './firstTest.txt'
    const pm = new ProductManager(path)
    //let result = pm.createFile(path)
    //pm.addProduct('azucar', 'mejor azucar', 12, 'http://imagen.jpg', 1234, 20)
    //pm.addProduct('arroz', 'mejor arroz', 15, 'http://imagen2.jpg', 1235, 50)
    //pm.addProduct('tomate', 'mejor tomate', 12, 'http://imagen3.jpg', 1236, 75)
    //pm.addProduct('leche', 'mejor leche', 23, 'http://imagen4.jpg', 1336, 73)
    //console.log(result)
    await pm.getProducts(path)
    //let result =  JSON.parse(pm.readFile(path))
    //console.log(result)
    //pm.readFile(path)

}
//Get Products

run()


