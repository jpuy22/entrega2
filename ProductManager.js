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
            if(product != null){
                if(title) products[id-1].title = title
                if(description) products[id-1].description = description
                if(price) products[id-1].price = price
                if(thumbnail) products[id-1].thumbnail = thumbnail
                if(code) products[id-1].code = code
                if(stock) products[id-1].stock = stock
        
                let stg = JSON.stringify(products)
                fs.writeFileSync(this.path, stg, error => {
                    if(error) return console.log('Hubo un error al escribir archivo')
                    return true
                }) 
            }else{
                return false
            }
        }catch(error){
            console.log(error)
        }
    }

    //Borrado logico, deja el producto en null
    deleteProduct = (id) => {
        try{
            let products = this.getProdObj(this.path)
            products[id-1].title = null
            products[id-1].description = null
            products[id-1].price = null
            products[id-1].thumbnail = null
            products[id-1].code = null
            products[id-1].stock = null

            let stg = JSON.stringify(products)
            fs.writeFileSync(this.path, stg, error => {
                if(error) return console.log('Hubo un error al escribir archivo')
                return true
            }) 
        }catch(error){
            console.log(error)
        }
    }
}
