# Nome do projeto: Tasks Control

## Tecnologias: 

- **React**
- **TailwindCSS**
- **ReactQuery**

## Diferenciais

- Instalacoes para criar projetos em React
- Bibliotecas de JavaScript bem utilizadas pela comunidade de desenvolvimentores
- Layout seguindo padroes atuais com framework CSS
- Manipulacao de dados por API refletindo em tempo real


## Instalando React

Para se criar projetos com React eh necessario antes de mais nada ter o `node` instalado na maquina e `npm` ou `yarn`.

Com isto teremos o `npx` instalado tambem.

`npx` é um utilitário de linha de comando incluído no Node.js versão 5.2.0 e posterior. Ele é usado principalmente para executar pacotes Node.js que não estão instalados globalmente no seu sistema.

## Criando e Inicializando o projeto React

Com `npx` instalado vamos criar inicialmente todo o ambiente onde o projeto e suas bibliotecas serao rodadas.

```bash
npx create-react-app tasks_control_react
```

Projeto, dentro da pasta `tasks_control_react` rode o comando

```bash
npm start
```

Se o projeto Rails ja estiver rodando, sera proposto usar outra porta, basta confirmar.

## Configurando bibliotecas para desenvolvimento

Para um bom desenvolvimento em projetos em `React` nao eh necessario colocar todas as bibliotecas que a comunidade disponibiliza mas usar de boas praticas. Abaixo, os comandos das bibliotecas que serao utilizadas:

```bash
npm install axios
npm install -D tailwindcss
npm install react-icons --save
npm install react-router-dom
npm install react-query
```

### axios

- https://github.com/axios/axios
- Ira realizar fazer as requisicoes em nossa API `Rails`

### tailwindcss

- https://tailwindcss.com/
- Framework que proporciona criar sites e ate mesmo aplicacoes mobile modernas rapidamente, sem precisar sair do codigo em si

### react-icons

- https://react-icons.github.io/react-icons/
- Inclua ícones populares em seus projetos React facilmente com react-icons, que utiliza importações ES6 que permitem incluir apenas os ícones que seu projeto está usando

### react-router-dom

- https://reactrouter.com/en/main
- Manipulador de rotas, direcionando corretamente para componentes javascripts

### react-query

- https://tanstack.com/query/latest
- Poderoso gerenciamento de estado assíncrono para React e outros frameworks

## Iniciando desenvolvimento

A aplicacao em si tera as seguintes funcionalidades:

- Listar tarefas (tasks)
- Listar atualizar tarefa como completada
- Listar projetos (projects)
- Listar atualizar projeto como completado
- Comunicacao entre componentes de forma contextual
- Comunicacao com api `Rails` de forma sincrona e assincrona

Antes de mais nada eh necessario configurar a base de onde as informacoes serao manipuladas. Entenda que este projeto ira consultar uma api em `Rails` que ja desenvolvemos mas poderia ser muito bem consultando um projeto em `node` ou ate mesmo um banco de dados no proprio projeto `React`

### axios

A configuracao da biblioteca `axios` permitira estabelecer onde operacoes na api `Rails`

Crie na raiz do projeto um arquivo .env e nele coloque o seguinte conteudo:

```
REACT_APP_API_HTTP_ADDRESS=https://----.ngrok-free.app
```

Entenda que este endereco eh que foi gerado pelo seu `ngrok`, basta colocar corretamente. Eh importante abrir o arquivo `.gitignore` e colocar ao final `.env` pois assim o arquivo `.env` sera ignorado pelo git

Entao abra o arquivo `index.js` que esta na pasta `src` e coloque o seguinte conteudo

```javascript
// abaixo de
// import reportWebVitals from './reportWebVitals';
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_HTTP_ADDRESS;
```

Perceba que por se tratar de buscar de algo do ambiente, tudo que comeca com `REACT_APP` no arquivo `.env` ou em variaveis do ambiente, serao carregadas automaticamente.

### TailwindCSS

Com framework css Tailwind CSS eh possivel obter de maneira bem rapida um desenvolvimento moderno e de boa aparencia. Existem sim pacotes, bibliotecas que trazem prontos, botoes, listas, tabelas etc; mas eh importante entender a base de como as coisas funcionam, nao quer dizer decorar mas sim enteder o proposito e saber se adaptar. Inice com

```bash
npx tailwindcss init
```

Deixe no arquivo criado o seguinte conteudo

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  // ...
}
```

Algo que gosto de fazer eh ter o controle da importacao de estilos do `tailwindcss`, entao crie a pasta `src/styles` e dentro um arquivo chamado `tailwindcss.css`. O conteudo sera

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

E agora novamente no arquivo `index.js` remova a linha de `index.css` e substitua pelo conteudo

```javascript
// abaixo de 
// import ReactDOM from 'react-dom/client';
import './styles/tailwind.css';
```

Reinicie o servidor. Tudo ok para o desenvolvimento de nossas rotas de acesso com componentes.

### react-router-dom

Inicialmente colocaremos a aplicacao para entender os devidos endpoints que ela tera acesso. No arquivo `src/App.js` tera o seguinte conteudo (e posteriormente iremos acrescentar mais)

```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Tasks from './components/Tasks';
import Projects from './components/Projects';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-28">
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
```

Se a aplicacao estiver rodando voce vera varios erros e isto eh o esperado, pois estamos tentando declarar os acessos a componentes que nem existem. Cada componente tera suas devidas funcoes e aparencia, e vamos cria-los agora.

### Componentes

Provavelmente a pasta `src/components` nao existe, entao crie e dentro dela o primeiro componente `Navbar.js`, sera a barra de navegacao do projeto mas conteudos serao acrescentados posteriormente.

```javascript
// Navbar.js
import React from 'react';
import { FaBriefcase, FaTasks, FaCheckDouble } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          <FaCheckDouble className='w-10 h-10 m-2' />
        </Link>
        <div className="flex space-x-4">
          <Link to="/tasks" className="flex items-center space-x-2">
            <FaTasks className="mr-2" />
            Tasks
          </Link>
          <Link to="/projects" className="flex items-center space-x-2">
            <FaBriefcase className="mr-2" />
            Projects
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
```

Agora o componente `compontains/Tasks.js` com o seguinte conteudo

```javascript
// src/components/Tasks.js
import React from 'react';

const Tasks = () => {
  return (
    <div className="w-full px-10 mt-8">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">Task</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
```

E finalmente o componente `components/Projects.js` com o conteudo

```javascript
// src/components/Projects.js
import React from 'react';

const Projects = () => {

  return (
    <div className="w-full px-10 mt-8">
      <h2 className="text-2xl font-bold mb-4">Project List</h2>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">Project</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
```

Pronto, automaticamente a aplicacao que deve estar rodando, mas caso nao esteja inicie com o comando `npm start` e nenhum erro sera exibido e duas telas sem conteudos estirao a de tarefas e projetos (tasks, projetcs)


### Entendeo context-api

O que seria o tal de context-api? Existem formas de se trabalhar compartilhando informacoes entre si, por exemplo REDUX, mas particularmente eu abordo com context-api por ser de maneira mais facil de se entender humanamente dizendo.

Ou seja, quando se tem um contexto de projetos, ali voce ira provavelmente coletar informacoes, fazer operacoes e expor para o projeto em si, outros componentes poderao pegar as mesmas informacoes. Em nossa aplicacao eh possivel entender isto da seguinte maneira:

- Obtendo a lista de tarefas (tasks), podemos listar no componente `Tasks.js`
- E tambem exibir a quantidade de tarefas completadas mas isto em outro componente `Navbar.js`
- Isto sem precisar ter que fazer duas consultas a `api`, e caso ocorra alguma modificacao na lista de tarefas em algum dos componentes, como estamos dentro do contexto de tarefas como um todo, todos os lugares sofrem atualizacao.

Crie o arquivo `context/TaskContext.js` com o seguinte conteudo

```javascript
import React, { createContext, useContext } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({children}) => {
  return <TaskContext.Provider value={{tasks: [3]}}>{children}</TaskContext.Provider>
}

export const useTaskContext = () => {
  return useContext(TaskContext);
};
```

E o outro contexto, de projetos no arquivo `context/ProjectContext.js` com o seguinte conteudo

```javascript
import React, { createContext, useContext } from 'react';

const ProjectContext = createContext();

export const ProjectProvider = ({children}) => {
  return <ProjectContext.Provider value={{projects: [2]}}>{children}</ProjectContext.Provider>
}

export const useProjectContext = () => {
  return useContext(ProjectContext);
};
```


E no arquivo `src/App.js` vamos atualizar com os dois contextos, tasks e projects de uma vez, o arquivo ficara com o seguinte conteudo

```javascript
// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Tasks from './components/Tasks';
import Projects from './components/Projects';
import { TaskProvider } from './context/TaskContext';
import { ProjectProvider } from './context/ProjectContext';

const App = () => {
  return (
    <TaskProvider>
      <ProjectProvider>
        <Router>
          <Navbar />
          <div className="container mx-auto mt-28">
            <Routes>
              <Route path="/" element={<Tasks />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </div>
        </Router>
      </ProjectProvider>
    </TaskProvider>
  );
};

export default App;
```

Ou seja, agora os componentes poderao acessar informacoes compartilhadas pelos contextos, por exemplo a variavel `${tasks}` e `${projects}`.

Na pratica, acrescente no arquivo `components/Tasks.js` o conteudo

```javascript
// src/components/Tasks.js
import React from 'react';
import { useTaskContext } from '../context/TaskContext';

const Tasks = () => {
  const { tasks } = useTaskContext();
  
  return (
    <div className="w-full px-10 mt-8">
      <h2 className="text-2xl font-bold mb-4">Task List - {tasks.length}</h2>
// e o restante do arquivo nao mude
```

E tambem no arquivo `components/Projects.js`

```javascript
// src/components/Projects.js
import React from 'react';
import { useProjectContext } from '../context/ProjectContext';

const Projects = () => {
  const { projects } = useProjectContext();
  
  return (
    <div className="w-full px-10 mt-8">
      <h2 className="text-2xl font-bold mb-4">Project List {projects.length}</h2>
// e o restante do arquivo nao mude
```

E finalmente o componente `components/Navbar.js` com a seguinte alteracao

```javascript
// Navbar.js
import React from 'react';
import { FaBriefcase, FaTasks, FaCheckDouble } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { useProjectContext } from '../context/ProjectContext';


const Navbar = () => {
  const { tasks } = useTaskContext();
  const { projects } = useProjectContext();
  
  return (
    <nav className="bg-gray-800 p-4 text-white fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          <FaCheckDouble className='w-10 h-10 m-2' />
        </Link>
        <div className="flex space-x-4">
          <Link to="/tasks" className="flex items-center space-x-2">
            <FaTasks className="mr-2" />
            Tasks ({tasks.length})
          </Link>
          <Link to="/projects" className="flex items-center space-x-2">
            <FaBriefcase className="mr-2" />
            Projects ({projects.length})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
```

Percebam que busquei as duas informacoes dos contextos que existem, ou seja, sao informacoes compartilhadas no projeto como um todo.

Mas agora eh que realmente vai ficar bom pois iremos consultar na API em `Rails`

### Usando React-Query para realizar operacoes na API

Nunca foi tao facil receber informacoes e tambem fazer operacoes com React usando essa biblioteca.

Com as operacoes sendo feitas, podemos refazer consultas de tempo em tempo ou ate mesmo em caso de falha. Tambem eh possivel disparar um evento no caso de uma funcao executada.

Usaremos o `axios` e `react-query` pra tudo isto. Agora o arquivo `src/index.js` ficara assim

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/tailwind.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider} from 'react-query';
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_HTTP_ADDRESS;

const queryClient = new QueryClient()


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
reportWebVitals();
```

Veja que queremos ser um Cliente provedor de informacoes onde passamos via `client` uma instancia para ser utilizada como estrategia das operacoes.

Entao vamos partir para os dados reais aparecendo na tela, mas por onde isso ocorre. Lembre-se que temos os contextos envolvendo os components nos contextos eh que as operacoes sao compartilhadas e tambem obtidas. Por exemplo em `TaskContext.js`

```javascript
import React, { createContext, useContext } from 'react';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({children}) => {
  const { data, isLoading, error, refetch } = useQuery("tasks", () => { // em data obtemos os dados, isLoading retorna true ou false enquanto a consulta esta ainda sendo realizada, error eh quando acontece algum erro e refectch sinaliza realizar a consulta desta query novamente caso chamada
      return axios.get('/tasks').then((response) => response.data);
    },
    {
      retry: 5, // tentativa 5 vezes caso erros ocorram
      refetchOnWindowFocus: true, // refaz a consulta em caso de ter saido da tela e voltar para a mesma
      refetchInterval: 5000 // atualizacao em segundo plano de 5 em 5 seungos
    }
  );

  // este taskMutation tera o papel de executar algo em nossa API Rails, portanto enviando uma atualizacao
  const taskMutation = useMutation({
    mutationFn: ({taskId}) => {
      return axios.patch(`/tasks/${taskId}`).then((response) => response.data);
    },
    // Um ponto importante eh quando a operacao acima for finalizada com sucesso, algo pode ser executado, no caso estamos refazendo a busca a API
    onSuccess: (data) => {
      refetch()
    }
  })

  // Estamos declarando a funcao que recebera a tarefa, task, que sera repassada a nosso contexto e portanto podendo ser chamada em qualquer lugar dos componentes
  const completeTask = (task) => {
    taskMutation.mutate({taskId: task.id})
  }

  // esta eh uma funcao interessante onde caso a consulta realmente tenha ocorrido pois existe o delay, filtramos para obter o numero das tarefas completadas
  const completedTaskCount = () => {
    return !isLoading && data.filter((task) => task.completed_at).length;
  };

  // outra funcao eh que caso a consulta ainda esteja sendo realizada, retorna o fundo cinza, entao eh feito um calculo onde, se menos de 30% estiverem completadas o fundo sera vermelho, menos de 60% sera laranja e por cima acima disto verde
  const getCompletionColor = () => {
    if (isLoading) {
      return 'bg-gray-500'; 
    }

    const count = completedTaskCount();
    const completionPercentage = (count / data.length) * 100;

    if (completionPercentage < 30) {
      return 'bg-red-500';
    } else if (completionPercentage < 60) {
      return 'bg-orange-500';
    } else {
      return 'bg-green-500';
    }
  };

  // Entao passamos para nosso contexto prover as informacoes aos componentes todas as funcoes e dados que obtivemos, tanto na lista de tarefas quanto a barra de navegacao precisam de alguns desses dados
  return <TaskContext.Provider value={{tasks: data, completeTask: completeTask, isLoadingTasks: isLoading, completedTaskCount: completedTaskCount, tasksColor: getCompletionColor }}>{children}</TaskContext.Provider>
}

export const useTaskContext = () => {
  return useContext(TaskContext);
};
```

Agora modificando o component `Tasks.js` teremos o seguinte codigo

```javascript
// src/components/Tasks.js
import React from 'react';
import { useTaskContext } from '../context/TaskContext';

const Tasks = () => {
  const { tasks, completeTask, isLoadingTasks } = useTaskContext();
  
  return (
    <div className="w-full px-10 mt-8">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">Task</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!isLoadingTasks && tasks.map((task) => (
            <tr key={task.id}>
              <td className="border border-gray-200 px-4 py-2">{task.title}</td>
              <td className="border border-gray-200 px-4 py-2">
                {task.completed_at ? (
                  <span className="text-green-500">Completed</span>
                ) : (
                  <span className="text-yellow-500">Pending</span>
                )}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {task.completed_at ? (
                  <span className="text-green-500">{new Date(task.completed_at).toLocaleString()}</span>
                ) : (
                 <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => completeTask(task)}
                  >
                    Mark as Completed
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
```

Vamos aproveitar para fazer o mesmo com projetos

```javascript
import React, { createContext, useContext } from 'react';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

const ProjectContext = createContext();

export const ProjectProvider = ({children}) => {
  const { data, isLoading, error, refetch } = useQuery("projects", () => {
      return axios.get('/projects').then((response) => response.data);
    },
    {
      retry: 5,
      refetchOnWindowFocus: true,
      refetchInterval: 5000
    }
  );

  const projectMutation = useMutation({
    mutationFn: ({projectId}) => {
      return axios.patch(`/projects/${projectId}`).then((response) => response.data);
    },
    onSuccess: (data) => {
      refetch()
    }
  })

  const completeProject = (project) => {
    projectMutation.mutate({projectId: project.id})
  }

  const completedProjectCount = () => {
    return !isLoading && data.filter((project) => project.completed_at).length;
  };

  const getCompletionColor = () => {
    if (isLoading) {
      return 'bg-gray-500'; 
    }

    const count = completedProjectCount();
    const completionPercentage = (count / data.length) * 100;

    if (completionPercentage < 30) {
      return 'bg-red-500';
    } else if (completionPercentage < 60) {
      return 'bg-orange-500';
    } else {
      return 'bg-green-500';
    }
  };


  return <ProjectContext.Provider value={{projects: data, completeProject: completeProject, isLoadingProjects: isLoading, completedProjectCount: completedProjectCount, projectsColor: getCompletionColor }}>{children}</ProjectContext.Provider>
}

export const useProjectContext = () => {
  return useContext(ProjectContext);
};
```

E o component do mesmo `Projects.js`

```javascript
// src/components/Projects.js
import React from 'react';
import { useProjectContext } from '../context/ProjectContext';

const Projects = () => {
  const { projects, completeProject, isLoadingProjects } = useProjectContext();
  
  return (
    <div className="w-full px-10 mt-8">
      <h2 className="text-2xl font-bold mb-4">Project List</h2>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">Project</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!isLoadingProjects && projects.map((project) => (
            <tr key={project.id}>
              <td className="border border-gray-200 px-4 py-2">{project.name}</td>
              <td className="border border-gray-200 px-4 py-2">
                {project.completed_at ? (
                  <span className="text-green-500">Completed</span>
                ) : (
                  <span className="text-yellow-500">Pending</span>
                )}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {project.completed_at ? (
                  <span className="text-green-500">{new Date(project.completed_at).toLocaleString()}</span>
                ) : (
                 <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => completeProject(project)}
                  >
                    Mark as Completed
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
```

E por fim nao menos importante o component `Navbar.js

```javascript
// Navbar.js
import React from 'react';
import { FaBriefcase, FaTasks, FaCheckDouble } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Se estiver usando react-router
import { useTaskContext } from '../context/TaskContext';
import { useProjectContext } from '../context/ProjectContext';


const Navbar = () => {
  const { completedTaskCount, tasksColor } = useTaskContext();
  const countCompletedTask = completedTaskCount();
  const tasksColorTheme = tasksColor()

  const { completedProjectCount, projectsColor } = useProjectContext();
  const countCompletedProject = completedProjectCount();
  const projectsColorTheme = projectsColor()

  return (
    <nav className="bg-gray-800 p-4 text-white fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          <FaCheckDouble className='w-10 h-10 m-2' />
        </Link>
        <div className="flex space-x-4">
          <Link to="/tasks" className="flex items-center space-x-2">
            <FaTasks className="mr-2" />
            Tasks
            <span className={`rounded-full ${tasksColorTheme} text-white w-8 h-8 font-bold items-center justify-center flex`}>{countCompletedTask}</span>
          </Link>
          <Link to="/projects" className="flex items-center space-x-2">
            <FaBriefcase className="mr-2" />
            Projects
            <span className={`rounded-full ${projectsColorTheme} text-white w-8 h-8 font-bold text-center items-center justify-center flex`}>{countCompletedProject}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
```

Observem o tanto de informacoes que sao processadas e compartilhadas para todos os componentes. Por exemplo:

- Lista de tarefas
- Funcao para marcara tarefa como completada
- Quantidade de tarefas completadas mesmo aguardando delay
- Modificacao de cores para saber a gravidade de tarefas completadas ou nao


Inicialmente teremos a aplicacao com os componentes de tarefas e projetos de maneira simples e vamos incrementando.

Os codigos com a logica ficarao dentro dentro da pasta `src` e vamos comecar pelos componentes. Cada componente tera acoes que


Voce deve ter notado que estamos usando o Guard para desenvolvimento TDD, entao edite o arquivo `Guardfile` e procure pela linha:

```rb
rspec.spec.call("controllers/#{m[1]}_controller"),
```

E adicione abaixo

```rb
rspec.spec.call("requests/#{m[1]}"),
```

Com isso testes requests serao executados tambem. Agora execute:

```bash
bundle exec guard
```

E pressione `Enter`, os testes serao rodados e a pasta `coverage` sera criada na raiz do projeto. Inclusive ja adicione a mesma no arquivo `.gitignore`

Cada alteracao feita em qualquer parte do projeto ira rodar os testes.

Serao abordadas as coberturas de requisicoes e de models, portanto algumas pastas podem ser removidas.

```bash
rm -rf spec/routing
rm -rf spec/views
```

A cobertura por testes tera aumentado se rodar o `rspec` novamente, basta abrir o arquivo `coverage/index.html` para ver o resultado.

Agora realmente eh hora de entender o que eh util em testes e como codificar com testes.

## Criando estrutura de Models

Models sao classes que podemos manipular dados do banco de dados. Vamos ter dois: Project e Task ou seja, projetos e tarefas.

```bash
rails g model project name completed_at:datetime
rails g model task title scheduled_at:datetime completed_at:datetime
```

Alem disso coloque no arquivo `db/seeds.rb` o codigo abaixo:

```ruby
30.times do |i|
  Task.create!(title: Faker::Lorem.question, scheduled_at: (Time.now+ 1.days))
  Project.create!(name: Faker::Job.title)
end
```

Entao criaremos as tabelas no banco e colocaremos dados ficticios

```bash
rails db:migrate db:seed
```

Com guard rodando, aperte `Enter` e ja sera possivel ver a cobertura de testes.

Ajustando um pouco que serao as `factories` ou seja, como criar dados facilmente de cada model com dados ficticios.

Edite `spec/factories/projects.rb` para projects

```ruby
FactoryBot.define do
  factory :project do
    name { Faker::Lorem.sentence }
  end
end
```

E para tasks `spec/factories/tasks.rb`

```ruby
FactoryBot.define do
  factory :task do
    title { Faker::Lorem.sentence }
  end
end
```

## Criando as Rotas da API

Teremos endpoints para `tasks` e `projects`, onde sera possivel obter a lista de dados e tambem marcar como completo.

Criando os controllers da seguinte maneira:

```bash
rails g controller tasks
rails g controller projects
```

Entao abra o arquivo `config/routes.rb` e adicione

```ruby
  resources :tasks, only: [:index, :update]
  resources :projects, only: [:index, :update]
```

Note que serao criados arquivos tambem de testes de controllers por requests (requisicoes). Portanto na pasta `spec/requests` existirao os arquivos de testes.


Iniciando com projects

```ruby
require 'rails_helper'

RSpec.describe 'ProjectsController', type: :request do
  describe 'Projects Operations' do

    describe 'GET /projects' do
      it 'returns a list of projects in ascending order of creation' do
        create_list(:project, 5)

        get projects_path
        projects = JSON.parse(response.body)

        expect(response).to have_http_status(200)
        expect(projects.length).to eq(5)
      end
    end

    describe 'PATCH /projects/:id' do
      it 'marks a project as completed' do
        project = create(:project)

        patch project_path(project.id)
        project.reload

        expect(response).to have_http_status(200)
        expect(project.completed_at).not_to be_nil
      end
    end
  end
end
```

Com o codigo abaixo e rodando com guard, ao salvar ja sera notado que os testes rodaram mas com falhas, pois nao existe o codigo fonte no controller, apenas os testes querendo que funcione. Entao o codigo sera:

```ruby
class ProjectsController < ApplicationController
  def index
    projects = Project.order(created_at: :asc)
    render json: projects.all
  end

  def update
    project = Project.find(params[:id])
    project.update(completed_at: Time.now)
    head :ok
  end
end
```

Ao salvar ja rodara que esta ok o controller e coberto de testes.

Agora o mesmo pra tasks, no arquivo spec primeiramente

```ruby
require 'rails_helper'

RSpec.describe 'TasksController', type: :request do

  describe 'Tasks Operations' do
    describe 'GET /tasks' do
      it 'returns a list of tasks in ascending order of creation' do
        create_list(:task, 5)
        get tasks_path
        tasks = JSON.parse(response.body)

        expect(response).to have_http_status(200)
        expect(tasks.length).to eq(5)
      end
    end

    describe 'PATCH /tasks/:id' do
      it 'marks a task as completed' do
        task = create(:task)

        patch task_path(task.id)
        task.reload

        expect(response).to have_http_status(200)
        expect(task.completed_at).not_to be_nil
      end
    end
  end
end
```

E agora o conteudo do controller

```ruby
class TasksController < ApplicationController
  def index
    tasks = Task.order(scheduled_at: :asc)
    render json: tasks.all
  end

  def update
    task = Task.find(params[:id])
    task.update(completed_at: Time.now)
    head :ok
  end
end
```

Pronto, novamente com `Enter` a aplicacao estara criada e pronta pra receber acessos.

## Seguranca

Dois arquivos serao acrescentados para garantir seguranca e ao mesmo tempo dar acesso corretamente ja que estamos somente como API. Serao dentro da pasta `config/initializers/cors.rb`

```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*' # Permitir solicitações de todas as origens (ajuste conforme necessário)
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: ['access-token', 'expiry', 'token-type', 'uid', 'client'],
      max_age: 0
  end
end
```

E `config/initializers/filter_parameter_logging.rb`

```ruby
# Be sure to restart your server when you modify this file.
Rails.application.config.filter_parameters += [
  :passw, :secret, :token, :_key, :crypt, :salt, :certificate, :otp, :ssn
]
```

Reinicie o servidor e o guard e rode novamente