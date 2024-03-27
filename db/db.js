mongoose = require("mongoose");
require("dotenv").config();

async function main() {
  mongoose.set("strictQuery", true);

  const NAME = 'josequeiroz'
  const SENHA = 'B3xkMtyq3M1PTcOD'
  

        try {
            await mongoose.connect(`mongodb+srv://${NAME}:${SENHA}@cluster0.raiai7q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)          
                console.log("conectado ao banco");
        } catch (error) {
                console.log("erro de conexão!");
            }
}


module.exports = main;