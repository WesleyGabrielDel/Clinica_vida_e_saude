export const SOURCE_DIR = "http://localhost/clinica_vida_saude/src";

export async function request(url, data = null, method = "GET") {
    try {   
        // Faz um fetch para a url com os dados
        const r = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json" 
            },

            body: JSON.stringify(data)
        });

        // retorna a resposta da requisição
        return await r.json();
    } 

    catch (error) {
        // Caso a requisição falhe, um erro será lançado
        console.log("Erro ao realizar a requisição: ", error);
    }
}   

