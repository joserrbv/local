
    // document.getElementById("loginForm").addEventListener("submit", async function(event) {
    //   event.preventDefault(); // Evita que o formulário seja enviado

// const { response } = require("express");

    //   const email = document.getElementById("email").value;
    //   const password = document.getElementById("password").value;

    //   try {
    //     const response = await fetch("http://192.168.1.70:3000/usuarios/login", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({ email, password })
    //     });

    //     const data = await response.json();
    //     if (response.ok) {
    //         document.getElementById("email").value = "";
    //         document.getElementById("password").value = "";
            
    //       // Se o login for bem-sucedido, redireciona para a página de perfil
    //       window.location.href = '/dashboard.html'; // Redirecionar para a página de dashboard
        
    //     } else {
    //         document.getElementById("email").value = "";
    //         document.getElementById("password").value = "";
    //       alert(data.message); // Exibe uma mensagem de erro se o login falhar
          
         
    //     }
    //   } catch (error) {
    //     console.error("Erro ao fazer login:", error);
    //   }
    // });
  
    //  novo
    
    document.getElementById("loginForm").addEventListener("submit", function(event) {
      event.preventDefault(); // Evita que o formulário seja enviado automaticamente
    
      // Coletando os valores dos campos de entrada
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
    
      // Lógica de validação
      if (email.trim() === "" || password.trim() === "") {
        alert("Por favor, preencha todos os campos.");
        return;
      }
    
      // Fazendo uma solicitação à API Node.js para autenticar o usuário
      fetch("http://192.168.1.70:3000/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      
      .then(response => {
        
        if (!response.ok) {
          console.log(response);
          document.getElementById("email").value = "";
            document.getElementById("password").value = "";
          throw new Error("Erro ao efetuar login.");
        }
        return response.json();
      })
      .then(data => {
        // Redireciona para o perfil do cliente em caso de sucesso
        window.location.href = "/perfil";
      })
      .catch(error => {
        alert(error.message);
      });
    });
    