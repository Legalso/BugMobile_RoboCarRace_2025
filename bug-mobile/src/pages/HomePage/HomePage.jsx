import React from 'react';
import styles from './HomePage.module.css';
import { membersData } from '../../data/membersData';

// Importe as imagens
import bugMobileNome from '../../assets/images/BugMobile Nome.png';
import equipeFoto from '../../assets/images/equipe.jpg';

// Componente para a seção Membros
const MembrosSection = ({ members }) => (
  <section className={styles.membros}>
    <h2 className={styles.nossosMembros}>Nossos membros</h2>
    <div className={styles.pessoasGrid}>
      {members.map((member) => (
        <div key={member.name} className={styles.pessoas}>
          <img src={member.image} alt={member.name} />
          <h3 className={styles.nomes}>{member.name}</h3>
          <p className={styles.cargos}>{member.role}</p>
        </div>
      ))}
    </div>
  </section>
);


const HomePage = () => {
  return (
    <>
      <div className={styles.homePage}>
        <div className={styles.msgPrincipal}>
            <img src={bugMobileNome} className={styles.tituloPrincipal} alt="BugMobile" />
            <p className={styles.textoPrincipal}>
              Seja muito bem-vindo! Somos um time composto por alunos de Engenharia
              de Produção e Computação do Centro Universitário SENAC Santo Amaro.
              Clique para conhecer mais sobre nossa trajetória.
            </p>
            <div className={styles.botaoPrincipal}>
              <a href="#sobreNos">
                <button className={styles.letsStart}>Let's start</button>
              </a>
            </div>
        </div>
      </div>
      
      {/* Seção Sobre Nós */}
      <div id="sobreNos" className={styles.sobreNosConteudo}>
        <h2 className={styles.sobreNos}>Sobre nós</h2>
        <h3 className={styles.conhecaNos}>Conheça nossa equipe!</h3>
        <section className={styles.equipe}>
          <p className={styles.sobreNosP}>
            A BugMobile é uma equipe comprometida a entregar um trabalho de
            qualidade, visando aprendizado com foco nos processos, a fim de que os
            resultados produzidos sejam satisfatórios...
          </p>
          <img src={equipeFoto} alt="foto da equipe" className={styles.fotoEquipe} />
        </section>
      </div>

      {/* Seção Membros */}
      <MembrosSection members={membersData} />

      {/* Outras seções da HomePage (Projeto, Outros, Avaliação) podem ser adicionadas aqui
          como componentes separados ou diretamente como JSX */}
    </>
  );
};

export default HomePage;