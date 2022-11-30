const fs = require('fs')

class ProductManager{

    constructor(path){
        this.path = path
        this.format = 'utf-8'
    }

    total = (path) => {
        if(fs.existsSync(path)){
            let content = fs.readFileSync(path, 'utf-8')
            let products = JSON.parse(content)
            const count = products.length
            return count
        }else return 0
    }
    getNextId = (path) => {
        if(fs.existsSync(path)){
            let content = fs.readFileSync(path, 'utf-8')
            let products = JSON.parse(content)
            const count = products.length
            return (count >0) ? products[count-1].id + 1: 1
        }else return 1
    }

    readFile = (path) => {
        fs.readFile(path, 'utf8', (error, content) => {
            if(error) return console.log('Error reading file')
            console.log('Content', content)
            let x = JSON.parse(content)
            console.log('X: ', x)
            return x
        })
    }
    getProdObj = (path) => {
        if(fs.existsSync(path)){
            let content = fs.readFileSync(this.path, 'utf-8')
            let products = JSON.parse(content)
            return products
        }else{
            return []
        } 
    }
    
    getProducts = async (path) =>{
        try{
            let products = this.getProdObj(path)
            return products
        }catch(error){
            console.log(error)
        }
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const product = {
            id: this.getNextId(this.path),
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
        }

        let products = []
        if(fs.existsSync(this.path)){
            products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))  
        }
        products.push(product)
        let stg = JSON.stringify(products)
        fs.writeFileSync(this.path, stg, error => {
            if(error) return console.log('Hubo un error al escribir archivo')
        })   
    }
    

    getProductById = (id) => {
        try{
            let total = this.total(this.path)
            if((id>0) && (id<(total+1))){
               let products = this.getProdObj(this.path)
                return products[id-1]
            }else return 'Not found'
        }catch(error){
            console.log(error)
        }
    }

    updateProduct = (id, title, description, price, thumbnail, code, stock) => {
        try{
            let products = this.getProdObj(this.path)
            let product = this.getProductById(id)
            if(product != 'Not found'){
                if(title) products[id-1].title = title
                if(description) products[id-1].description = description
                if(price) products[id-1].price = price
                if(thumbnail) products[id-1].thumbnail = thumbnail
                if(code) products[id-1].code = code
                if(stock) products[id-1].stock = stock
        
                let stg = JSON.stringify(products)
                fs.writeFileSync(this.path, stg, error => {
                    if(error) return console.log('Hubo un error al escribir archivo')
                }) 
            }else{
                return false
            }
        }catch(error){
            console.log(error)
        }
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
    //pm.addProduct('coca cola', 'best ever', 110, 'http://imagen5.jpg', 13356, 103)
    //console.log(result)

    let x = pm.getProducts(path)
    console.log(x)
    //let result =  JSON.parse(pm.readFile(path))
    //console.log(result)
    //pm.readFile(path)

    let y = pm.getProductById(5)
    console.log('El producto es: ',y)

    //title, description, price, thumbnail, code, stock
    let z = pm.updateProduct(5, '', '', 300, '', '','' )
    console.log('Producto actualizado: ', z)



}
//Get Products

run()


