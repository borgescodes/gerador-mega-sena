# Gerador de Jogos da Mega-Sena
Um projeto de estudo que gera jogos de 6 números aleatórios da Mega-Sena. Após gerar os jogos, o projeto originalmente comparava e analisava quantos acertos cada jogo obteve em relação ao resultado mais recente da Mega-Sena, utilizando uma API para informar a data do último sorteio e os números sorteados.

### Demo
Veja o funcionamento do projeto [aqui](https://borgescodes.github.io/gerador-mega-sena/).

## Como usar?
1. Clone o repositório: `git clone https://github.com/borgescodes/gerador-mega-sena.git`
2. Abra o arquivo `index.html` no navegador.
3. Preencha o campo de entrada com a quantidade de jogos desejados e, depois, clique no botão "Gerar" para gerar os jogos e ver a análise deles.

## Observações
Há uma seção no projeto chamada **"Resultado oficial da Mega-Sena"**, que deveria ser alimentada com os dados da API (como a data do último sorteio e os números sorteados). No entanto, devido a um problema com o site que fornece a API, a aplicação hospedada no Heroku está enfrentando falhas. 

Atualmente, a seção está vazia, e o projeto apenas gera jogos aleatórios sem a funcionalidade de comparação com os resultados reais da Mega-Sena.

## Tecnologias usadas
- HTML
- CSS
- JavaScript
