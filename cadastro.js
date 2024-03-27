document.getElementById('cadastroForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const companyName = document.getElementById('companyName').value;
    const cnpj = document.getElementById('cnpj').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const address = document.getElementById('address').value;
    const instagram = document.getElementById('instagram').value;

    try {
        const response = await fetch('http://192.168.1.70:3000/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username, 
                email, 
                password, 
                companyName, 
                cnpj, 
                whatsapp, 
                address, 
                instagram 
            })
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById('username').value = "";
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            document.getElementById('companyName').value = "";
            document.getElementById('cnpj').value = "";
            document.getElementById('whatsapp').value = "";
            document.getElementById('address').value = "";
            document.getElementById('instagram').value = "";

            alert('Usuario cadastrado com sucesso, aguarde retorno do nosso suporte')

            window.location.href = "index.html";

            // document.getElementById('message').innerText = 'Cadastro realizado com sucesso';
        } else {
            alert('Usuario não cadastrado, erro no sistema tente novamente',)
            document.getElementById('username').value = "";
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            document.getElementById('companyName').value = "";
            document.getElementById('cnpj').value = "";
            document.getElementById('whatsapp').value = "";
            document.getElementById('address').value = "";
            document.getElementById('instagram').value = "";
            document.getElementById('message').innerText = data.message;
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});
