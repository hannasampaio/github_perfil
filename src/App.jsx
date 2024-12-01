import { useState } from "react";

import Perfil from "./components/Perfil";
import Formulario from "./components/Formulario";
import ReposList from "./components/ReposList";

function App() {
  const [FormularioEstaVisivel, setFormularioEstaVisivel] = useState(true)
  const [nomeUsuario, setNomeUsuario] = useState('');
  
  return(
    <> 
    <div className="form-container">
      <input type="text" onBlur={(e) => setNomeUsuario(e.target.value)} />
    </div>

      {nomeUsuario.length > 4 && (
        <>
          <Perfil nomeUsuario=  {nomeUsuario} />
          <ReposList nomeUsuario= {nomeUsuario} />
        </>
      )}

      {/* {FormularioEstaVisivel && (
        <Formulario />
      )} */}
      {/* <button onClick={() => setFormularioEstaVisivel(!FormularioEstaVisivel)} type="button">toggle-form</button> */}
    </>
  )
}

export default App
