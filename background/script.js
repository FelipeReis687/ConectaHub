// Função para scroll suave e update do menu ativo
  const menuItems = document.querySelectorAll('nav ul.menu li');
  
  function setActiveMenu(targetId) {
    menuItems.forEach((item) => {
      if(item.dataset.target === targetId){
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.dataset.target;
      const targetEl = document.getElementById(targetId);
      if(targetEl) {
        targetEl.focus();
        targetEl.scrollIntoView({behavior: 'smooth', block: 'start'});
        setActiveMenu(targetId);
      }
    });

    item.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  // Função para redirecionar botão Login para cadastro.html
  const loginBtn = document.getElementById('loginBtn');
  loginBtn.addEventListener('click', () => {
    window.location.href = 'cadastro.html';
  });
// Redirecionar Murais, Chats e Gamificação para cadastro.html
document.getElementById("btnMurais").addEventListener("click", () => {
  window.location.href = "cadastro.html";
});

document.getElementById("btnChats").addEventListener("click", () => {
  window.location.href = "cadastro.html";
});

document.getElementById("btnGamificacao").addEventListener("click", () => {
  window.location.href = "cadastro.html";
});

// Botão Conecte Já
document.getElementById("btnConecte").addEventListener("click", () => {
  window.location.href = "cadastro.html";
});