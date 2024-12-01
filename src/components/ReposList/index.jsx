import { useEffect, useState } from "react";
import styles from './ReposList.module.css'; 

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [deuErro, setDeuErro] = useState(false); 

    useEffect(() => {
        setEstaCarregando(true);
        setDeuErro(false); 
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Usuário não encontrado"); 
                }
                return res.json();
            })
            .then((resJson) => {
                setTimeout(() => {
                    setEstaCarregando(false);
                    setRepos(resJson);
                }, 3000); 
            })
            .catch(() => {
                setEstaCarregando(false);
                setDeuErro(true); 
            });
    }, [nomeUsuario]);

    return (
        <div className="container">
            {estaCarregando && <h1>Carregando...</h1>}
            {deuErro && <h1 style={{ color: "red" }}>Usuário não encontrado. Tente novamente.</h1>}
            {!estaCarregando && !deuErro && (
                <ul className={styles.list}>
                    {repos.map(({ id, name, language, html_url }) => (
                        <li className={styles.listItem} key={id}>
                            <div className={styles.itemName}>
                                <b>Nome:</b> {name}
                            </div>
                            <div className={styles.itemLanguage}>
                                <b>Linguagem:</b> {language || "Não especificado"}
                            </div>
                            <a 
                                className={styles.itemLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                href={html_url}
                            >
                                Visitar o GitHub
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReposList;
