# minas-na-unicamp

  

Elaboração de Software para demandas femininas na Universidade, em especial da Unicamp. O software será focado, a priori, em contribuir com aspectos relacionados a segurança no campus.

Esperamos conseguir algum tipo de parceria ou auxílio do Savs e acreditamos na importância da pauta, visto o elevado número denúncias de assédio em redes sociais e a falta de informação para denúncias institucionais.

  

Participantes:

  

Bárbara Karoline Perim 194496

Beatriz Donanzan Azanha 213518

  

Marcela Medicina Ferreira 183266

  

Marianna Gois de Campos 221925

  

Thaíssa Rojas Pereira 224714

  

## Build e Execução do Projeto

  

Para informações sobre build e execução do projeto, siga as instruções do [README.md](https://gitlab.com/biaazanha/minas-na-unicamp/-/blob/60959b602461419e38f1a2b174518f01f812cdbd/minas-na-unicamp-front/README.md), certificando-se que esteja dentro do diretório `minas-na-unicamp-front`.

  

## Estilos Arquiteturais

  

Nosso projeto está sendo realizado com o Front-end em Angular e optamos por não criar um Back-end, mas sim utilizar diretamente o banco de dados Firestore. Optamos por isso, pois o Firestore é suficiente para a quantidade de dados e os tratamentos que queremos dar a eles nesse início de projeto, além de remover toda a responsabilidade de lidar agora com um back-end e infraestrutura. Caso quiséssemos escalar o projeto e o volume de dados e acessos aumentasse a intenção seria migrar para um back-end.

  

Ao utilizar o Framework Angular já importamos alguns estilos arquiteturais como por exemplo a arquitetura orientada a objetos, permitido pelo Typescript, de forma que podemos ter hierarquia e herança entre os componentes da aplicação.

  

 - Componentes Visuais - Reutilização

	Nós estamos utilizando no nosso projeto as bibliotecas Angular Material e o framework Bootstrap. Ao escolher utilizar ambos estamos realizando um desenvolvimento com reutilização.

	O Angular Material é uma implementação do Material Design do Google ele permite a criação visual dos componentes no Angular de forma mais fácil. O Bootstrap é um framework de CSS direcionado a implementação de componentes responsivos que cria templates para botões, objetos de navegação e outros componentes de interface.

  

 - Cliente-Servidor

	Nessa arquitetura existem os fornecedores, chamados servidores e os requerentes que são os clientes. Vamos adotar esse modelo ao conseguirmos hospedar nosso site na Web, dessa forma o cliente vai fazer uma requisição para o servidor onde o site estará hospedado e então receberá nosso front. O Angular é um framework client-side, é executado no navegador web do cliente. O Firestore, banco de dados que estamos utilizando, é um banco que está na nuvem, dessa forma também fazemos requisições para ele como clientes.

  

 - Camadas

	O Angular apresenta uma arquitetura em 3 camadas, em que a camada 1    seria relativa a interface e interação com o usuários, a camada 2    seria o controlador e a camada 3 seriam os dados.

	Como exemplo no nosso trabalho teremos uma tela em que podemos ver os alertas, essa tela seria nosso arquivo de alerta html. Na camada 2 teríamos o nosso arquivo de alerta typescript, responsável por receber as alterações do modelo e controlar como isso vai para a camada 1, além de um serviço responsável por fazer requisições ao Firestore e trazer os dados. Na camada 3 teríamos o modelo de alerta, são os dados armazenados nas propriedades dos objetos.

  

 - Pipes and Filters

	Pipes and filters é um estilo arquitetural geralmente utilizado para criar pipelines, recebendo um fluxo de dados na entrada e realizando um processamento sobre eles. O Angular possui uma implementação desse estilo permitindo que alguns dados, ao serem colocados na tela, passem por alguma alteração e cheguem ao usuário de forma diferente.

	Por exemplo: se queremos apresentar uma lista de valores em real, podemos utilizar um pipe de currency para formatar da forma necessária.

  

 - Publish/Subscribe

	O Publish/Subscribe também é um estilo arquitetural já implementado por uma biblioteca muito usada com o Angular, a RxJS, e é chamado de Observer/Observable. É muito usado para chamadas assíncronas. Iremos utilizar no nosso trabalho ao fazer requisições ao banco de dados para informar os componentes do retorno dos dados.

  
  
  

## Padrões de Projeto

Apesar de estarmos usando o Angular, que é por si só um framework que reforça boas práticas dos desenvolvedores, ainda existe lugar para que más práticas ocorram.

Ao pensar em escalabilidade no front-end pensamos no aumento de complexidade, mais regras de negócio, aumento do volume de informações carregadas na aplicação além do crescimento do próprio time trabalhando no projeto.

  
  
  

 - Facade

	O Facade é um padrão de projeto estrutural, isto é, auxilia a montar estruturas grandes de forma que permaneçam eficientes e flexíveis. Com ele, pode-se construir interfaces simplificadas para frameworks, bibliotecas ou qualquer conjunto de classes, e é útil quando você precisa integrar sua aplicação com essas estruturas, que podem possuir muitas funcionalidades, mas você só usará uma pequena parte delas.

	No Angular podemos decompor o sistema em camadas de abstração e colocar as responsabilidades na camada apropriada. Resolvemos desenvolver o design pattern facade porque ele facilita essa divisão em camadas, delegando a lógica para o abstraction e core layer e deixando os componentes do presentation layer somente com a obrigação de apresentar os dados.
![enter image description here](https://angular-academy.com/angular-architecture-best-practices/layers.png)  

	Fonte: https://angular-academy.com/angular-architecture-best-practices/

 - Injeção de Dependências

	É um padrão de projeto utilizado com o objetivo de evitar o alto nível de acoplamento de código dentro de uma aplicação, removendo as dependências desnecessárias entre as classes. Como vantagens, tem-se maior facilidade para manutenções e implementações de novas funcionalidades.
	O framework Angular implementa uma classe chamada decorators que é similar aos Annotations do Java e que facilita o uso do padrão da injeção de dependência.
  

## Modelo C4

#### Nível 1
![enter image description here](https://i.imgur.com/iivU0tb.png)
#### Nível 2
![enter image description here](https://i.imgur.com/BTWSNZJ.png)
#### Nível 3  
![enter image description here](https://i.imgur.com/hdblHRY.png)
No contexto do Angular são chamado componentes os arquivos Typescript e HTML que recebem a informação e a organizam no DOM. Os serviços são os arquivos Typescript que fazem o controle dos dados, geralmente fazendo requisições externas.

**Componente de Login**: Página do site, na qual, um usuário previamente cadastrado acessa sua conta.

**Serviço de Autenticação**: Checa as informações no banco de dados e fornece as permissões de acordo com o tipo do usuário, para o caso de usuários novos, insere informações no banco.

**Componente de Cadastro**: Página do site, na qual, cria-se um novo usuário.

**Componente de Gerenciamento de Alertas**: Página do site, na qual, a equipe analisa os alertas para ver se são prudentes.

**Serviço de Gerenciamento da Equipe**: Mecanismo de publicação efetiva dos alertas, utiliza funcionalidades tanto do Serviço de alerta quanto do Serviço de Autenticação.

**Componente de Alerta**: Página do site, na qual, o usuário cadastra um novo alerta.

**Serviço de Alerta**: Além de checar as informações, lê e escreve no no banco de dados.

**Componente de Mapa Interativo**: Página do site, na qual, o usuário vê através do Google Maps os lugares marcados por usuários que já fizeram alertas.