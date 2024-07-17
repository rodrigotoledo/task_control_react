# Curso de Desenvolvimento Web com React: Tasks Control

Neste curso, vamos aprender a desenvolver uma aplicação web utilizando React, com foco no projeto Tasks Control. Este projeto permite gerenciar tarefas e projetos de forma eficiente, utilizando tecnologias modernas e boas práticas de desenvolvimento.

## Tecnologias Utilizadas:

- React
- TailwindCSS
- @tanstack/react-query
- Axios

## Módulos do Curso:

### 1. Instalando e Configurando o Ambiente de Desenvolvimento com React

Aprenda a configurar o ambiente de desenvolvimento com React, incluindo a instalação das dependências necessárias e a criação de um novo projeto.

Para se criar projetos com React é necessário antes de mais nada ter o `node` instalado na maquina e `npm` ou `yarn`.

Com isto teremos o `npx` instalado também.

`npx` é um utilitário de linha de comando incluído no Node.js versão 5.2.0 e posterior. Ele é usado principalmente para executar pacotes Node.js que não estão instalados globalmente no seu sistema.

Com `npx` instalado vamos criar o projeto e suas dependências iniciais automaticamente serão instaladas, rode o comando:

```bash
npx create-react-app tasks_control_react
```

Dentro da pasta `tasks_control_react` rode o comando:

```bash
npm start
```

Para um bom desenvolvimento em projetos em `React` não é necessário colocar todas as bibliotecas que a comunidade disponibiliza mas usar de boas práticas. Abaixo, execute no terminal os comandos abaixo e as bibliotecas que serão instaladas:

```bash
npm install axios
npm install -D tailwindcss
npm install react-icons --save
npm install react-router-dom
npm install @tanstack/react-query
```

### 2. Configurando o Layout com TailwindCSS

Explore o framework TailwindCSS para criar um layout moderno e responsivo para a aplicação Tasks Control.

Com framework css Tailwind CSS é possivel obter de maneira bem rapida um desenvolvimento moderno e de boa aparência. Existem sim pacotes, bibliotecas que trazem prontos, botoes, listas, tabelas etc; mas é importante entender a base de como as coisas funcionam, não quer dizer decorar mas sim enteder o proposito e saber se adaptar. Inice com

```bash
npx tailwindcss init
```

Deixe no arquivo criado o seguinte conteúdo

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

Algo que gosto de fazer é ter o controle da importacao de estilos do `tailwindcss`, então crie a pasta `src/styles` e dentro um arquivo chamado `tailwindcss.css`. O conteúdo será

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

E agora novamente no arquivo `index.js` remova a linha de `index.css` e substitua pelo conteúdo

```javascript
// abaixo de 
// import ReactDOM from 'react-dom/client';
import './tailwind.css';
```

Reinicie o servidor. Tudo ok para o desenvolvimento de nossas rotas de acesso com componentes.

### 3. Gerenciando Requisições HTTP com Axios

Utilize o Axios para realizar requisições HTTP para a API do projeto Tasks Control, permitindo a comunicação entre o frontend e o backend de forma eficiente.

A configuracao da biblioteca `axios` permitira estabelecer onde operações na api `Rails`

Crie na raiz do projeto um arquivo .env e nele coloque o seguinte conteúdo:

```
REACT_APP_API_HTTP_ADDRESS=https://----.ngrok-free.app
```

Entenda que este endereco é que foi gerado pelo seu `ngrok`, basta colocar corretamente. é importante abrir o arquivo `.gitignore` e colocar ao final `.env` pois assim o arquivo `.env` será ignorado pelo git

Então abra o arquivo `index.js` que esta na pasta `src` e coloque o seguinte conteúdo

```javascript
// abaixo de
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_HTTP_ADDRESS;
```

Perceba que por se tratar de buscar de algo do ambiente, tudo que comeca com `REACT_APP` no arquivo `.env` ou em variáveis do ambiente, serão carregadas automaticamente.

### 4. Componentes de nossa aplicação

Componentes podem ter variáveis de estado, podem realizar ações em tela mediante a uma modificação do usuário e até mesmo um componente pode ser utilizado dentro de outro.

Crie a pasta `src/components/` e dentro dela o primeiro componente `Navbar.js`, será a barra de navegacao do projeto mas conteúdos serão acrescentados posteriormente.

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

Agora o componente `components/Tasks.js` com o seguinte conteúdo

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

E finalmente o componente `components/Projects.js` com o conteúdo

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

Pronto, mas como ver algo acontecendo? Bom no arquivo `App.js` coloque o conteúdo:

```javascript
// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Tasks from './components/Tasks';
import Projects from './components/Projects';

const App = () => {
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
};

export default App;
```

Ou seja, temos nossa aplicação com rotas direcionando aos componentes, e nossa barra de navegação podendo ir para tais componentes.

Desenvolva as funcionalidades de listar, criar, atualizar e excluir tarefas na aplicação, utilizando React e @tanstack/react-query para gerenciar o estado da aplicação de forma assíncrona.

### 5. Gerenciamento de Estado com Context API

Aprenda a utilizar a Context API do React para gerenciar o estado da aplicação de forma global, compartilhando dados entre componentes de forma eficiente.

Veja este exemplo em nossa aplicação da seguinte maneira:

- Obtendo a lista de tarefas (tasks), podemos listar no componente `Tasks.js`
- E também exibir a quantidade de tarefas completadas; em outro componente `Navbar.js`
- Isto sem precisar ter que fazer duas consultas a `API`, e caso ocorra alguma modificação na lista de tarefas em algum dos componentes, como estamos dentro do contexto de tarefas como um todo, todos os lugares sofrem atualização.

Crie o arquivo `context/TaskContext.js` com o seguinte conteúdo:

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

E o outro contexto, de projetos no arquivo `context/ProjectContext.js` com o seguinte conteúdo:

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

E no arquivo `src/App.js` vamos atualizar com os dois contextos, tasks e projects de uma vez, o arquivo ficará com o seguinte conteúdo:

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

Ou seja, agora os componentes poderao acessar informações compartilhadas pelos contextos, por exemplo a variável `${tasks}` e `${projects}`.

Na prática, acrescente no arquivo `components/Tasks.js` o conteúdo

```javascript
// src/components/Tasks.js
import React from 'react';
import { useTaskContext } from '../context/TaskContext';

const Tasks = () => {
  const { tasks } = useTaskContext();
  
  return (
    <div className="w-full px-10 mt-8">
      <h2 className="text-2xl font-bold mb-4">Task List - {tasks.length}</h2>
// e o restante do arquivo não mude
```

E também no arquivo `components/Projects.js`

```javascript
// src/components/Projects.js
import React from 'react';
import { useProjectContext } from '../context/ProjectContext';

const Projects = () => {
  const { projects } = useProjectContext();
  
  return (
    <div className="w-full px-10 mt-8">
      <h2 className="text-2xl font-bold mb-4">Project List {projects.length}</h2>
// e o restante do arquivo não mude
```

E finalmente o componente `components/Navbar.js` com a seguinte alteração:

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

Percebam que buscamos as duas informações dos contextos que existem, ou seja, são informações compartilhadas no projeto como um todo.

Mas agora é que realmente vai ficar bom pois iremos consultar na `API` em `Rails`

### 6. Usando @tanstack/react-query para realizar operações na API

Nunca foi tão fácil receber informações e também fazer operações com React usando essa biblioteca.

Com as operações sendo feitas, podemos refazer consultas de tempo em tempo ou ate mesmo em caso de falha. Tambem é possivel disparar um evento caso a execução de uma função.

Usaremos o `axios` e `@tanstack/react-query` pra tudo isto. Agora o arquivo `src/index.js` ficará assim

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/tailwind.css';
import App from './App';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
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
```

Veja que queremos ser um Cliente provedor de informações onde passamos via `client` uma instância para ser utilizada como estratégia das operações.

Então vamos partir para os dados reais aparecendo na tela, mas por onde isso ocorre? Lembre-se que temos os contextos que executam as operações envolvendo os components e nos próprios contextos são compartilhadas e também obtidas. Por exemplo em `TaskContext.js`

```javascript
import React, { createContext, useContext } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({children}) => {
  const { data, isLoading, error, refetch } = useQuery("tasks", () => { // em data obtemos os dados, isLoading retorna true ou false enquanto a consulta esta ainda sendo realizada, error é quando acontece algum erro e refectch sinaliza realizar a consulta desta query novamente caso chamada
      return axios.get('/api/tasks').then((response) => response.data);
    },
    {
      retry: 5, // tentativa 5 vezes caso erros ocorram
      refetchOnWindowFocus: true, // refaz a consulta em caso de ter saido da tela e voltar para a mesma
      refetchInterval: 5000 // atualização em segundo plano de 5 em 5 seungos
    }
  );

  // este taskMutation terá o papel de executar algo em nossa API Rails, portanto enviando uma atualização
  const taskMutation = useMutation({
    mutationFn: ({taskId}) => {
      return axios.patch(`/api/tasks/${taskId}`).then((response) => response.data);
    },
    // Um ponto importante é quando a operacao acima for finalizada com sucesso, algo pode ser executado, no caso estamos refazendo a busca a API
    onSuccess: (data) => {
      refetch()
    }
  })

  // Estamos declarando a função que recebera a tarefa, task, que será repassada a nosso contexto e portanto podendo ser chamada em qualquer lugar dos componentes
  const completeTask = (task) => {
    taskMutation.mutate({taskId: task.id})
  }

  // esta é uma função interessante onde caso a consulta realmente tenha ocorrido pois existe o delay, filtramos para obter o numero das tarefas completadas
  const completedTaskCount = () => {
    return !isLoading && data.filter((task) => task.completed_at).length;
  };

  // outra função é que caso a consulta ainda esteja sendo realizada, retorna o fundo cinza, então é feito um calculo onde, se menos de 30% estiverem completadas o fundo será vermelho, menos de 60% será laranja e por cima acima disto verde
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

  // Então passamos para nosso contexto prover as informações aos componentes todas as funções e dados que obtivemos, tanto na lista de tarefas quanto a barra de navegacao precisam de alguns desses dados
  return <TaskContext.Provider value={{tasks: data, completeTask: completeTask, isLoadingTasks: isLoading, completedTaskCount: completedTaskCount, tasksColor: getCompletionColor }}>{children}</TaskContext.Provider>
}

export const useTaskContext = () => {
  return useContext(TaskContext);
};
```

Agora modificando o component `Tasks.js` teremos o seguinte código

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

O erro de cara apararece na tela pois no component `Navbar.js` a variável `tasks` é utilizada de uma maneira só de exemplo. Vamos alterar o componente corretamente, código ficará assim:

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

Mas ainda temos problemas pois em `Navbar.js` precisamos das informações do contexto de projetos. Vamos aproveitar para fazer o mesmo com projetos, no arquivo `context/ProjectContext.js`

```javascript
import React, { createContext, useContext } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const ProjectContext = createContext();

export const ProjectProvider = ({children}) => {
  const { data, isLoading, error, refetch } = useQuery("projects", () => {
      return axios.get('/api/projects').then((response) => response.data);
    },
    {
      retry: 5,
      refetchOnWindowFocus: true,
      refetchInterval: 5000
    }
  );

  const projectMutation = useMutation({
    mutationFn: ({projectId}) => {
      return axios.patch(`/api/projects/${projectId}`).then((response) => response.data);
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

Observem o tanto de informações que são processadas e compartilhadas para todos os componentes. Por exemplo:

- Lista de tarefas
- Função para marcara tarefa como completada
- Quantidade de tarefas completadas mesmo aguardando delay
- Modificação de cores para saber a gravidade de tarefas completadas ou não

## Pré-requisitos:

- Conhecimento básico de HTML, CSS e JavaScript.
- Ter o Node.js e o npm (ou yarn) instalados na máquina.
- Familiaridade com o terminal de linha de comando.

Ao concluir este curso, você estará apto a desenvolver aplicações web modernas utilizando React, com habilidades para criar e gerenciar tarefas e projetos de forma eficiente.
