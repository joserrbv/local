mongoose = require("mongoose");
require("dotenv").config();

async function main() {
  mongoose.set("strictQuery", true);


  const USER = process.env.USER

  const SENHA = process.env.SENHA
  

        try {
            await mongoose.connect(`mongodb+srv://${USER}:${SENHA}@cluster0.raiai7q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)          
                console.log("conectado ao banco");
        } catch (error) {
                console.log("erro de conexão!");
            }
}


module.exports = main;