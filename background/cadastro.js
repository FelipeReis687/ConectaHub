const firebaseConfig = {
  apiKey: "AIzaSyC13wSq4nvjZIWW8G7pStco5MKUsxBYiPA",
  authDomain: "conectahub-1f810.firebaseapp.com",
  projectId: "conectahub-1f810",
  storageBucket: "conectahub-1f810.firebasestorage.app",
  messagingSenderId: "1071669291596",
  appId: "1:1071669291596:web:cf8b525e1888fdb2a9e2e9",
  measurementId: "G-MYKYNDG9LR"
};

// Inicializar Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log('🔥 Firebase inicializado com sucesso!');
} catch (error) {
    console.error('❌ Erro ao inicializar Firebase:', error);
}

const auth = firebase.auth();
const db = firebase.firestore();

// Seleção dos elementos
const btnIrCadastro = document.getElementById('btnIrCadastro');
const btnVoltarLogin = document.getElementById('btnVoltarLogin');
const btnLogin = document.getElementById('btnLogin');
const btnCadastrar = document.getElementById('btnCadastrar');
const formCadastro = document.getElementById('formCadastro');

const loginLeft = document.getElementById('login-left');
const loginRight = document.getElementById('login-right');
const signupLeft = document.getElementById('signup-left');
const signupRight = document.getElementById('signup-right');

// ============================================
// RECUPERAÇÃO DE SENHA DIRETA - SEM MODAL
// ============================================

// Função para recuperação de senha
async function recuperarSenha() {
    const email = prompt('Digite seu email para recuperação de senha:');
    
    if (!email) {
        return; // Usuário cancelou
    }
    
    if (!validateEmail(email)) {
        exibirMensagem('erro', 'Por favor, insira um email válido.');
        return;
    }
    
    try {
        console.log('🔥 Enviando email de recuperação para:', email);
        
        // Enviar email de recuperação de senha
        await auth.sendPasswordResetEmail(email);
        
        console.log('✅ Email de recuperação enviado com sucesso');
        exibirMensagem('sucesso', 'Email de recuperação enviado! Verifique sua caixa de entrada.');
        
    } catch (error) {
        console.error('❌ Erro ao enviar email de recuperação:', error);
        
        let mensagemErro = 'Erro ao enviar email de recuperação. Tente novamente.';
        
        switch (error.code) {
            case 'auth/user-not-found':
                mensagemErro = 'Nenhuma conta encontrada com este email.';
                break;
            case 'auth/invalid-email':
                mensagemErro = 'Email inválido.';
                break;
            case 'auth/too-many-requests':
                mensagemErro = 'Muitas tentativas. Tente novamente mais tarde.';
                break;
            case 'auth/network-request-failed':
                mensagemErro = 'Erro de conexão. Verifique sua internet.';
                break;
            default:
                mensagemErro = error.message || 'Erro desconhecido.';
        }
        
        exibirMensagem('erro', mensagemErro);
    }
}

// Event listener para "Esqueceu da senha?"
document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    recuperarSenha();
});

// ============================================
// SEU CÓDIGO ORIGINAL (MANTIDO EXATAMENTE IGUAL)
// ============================================

// Função para mostrar cadastro
function mostrarCadastro() {
    loginLeft.classList.remove('visible');
    loginRight.classList.remove('visible');
    loginLeft.classList.add('hidden-left');
    loginRight.classList.add('hidden-right');

    signupLeft.classList.remove('hidden-left');
    signupRight.classList.remove('hidden-right');
    signupLeft.classList.add('visible');
    signupRight.classList.add('visible');
}

// Função para mostrar login
function mostrarLogin() {
    signupLeft.classList.remove('visible');
    signupRight.classList.remove('visible');
    signupLeft.classList.add('hidden-left');
    signupRight.classList.add('hidden-right');

    loginLeft.classList.remove('hidden-left');
    loginRight.classList.remove('hidden-right');
    loginLeft.classList.add('visible');
    loginRight.classList.add('visible');
}

// Validação de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validação de senha forte
function validatePassword(password) {
    // Mínimo 6 caracteres, pelo menos uma letra e um número
    const re = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    return re.test(password);
}

// Função para exibir mensagens
function exibirMensagem(tipo, mensagem) {
    // Remove mensagens anteriores
    const mensagensAnteriores = document.querySelectorAll('.mensagem-flutuante');
    mensagensAnteriores.forEach(msg => msg.remove());
    
    // Cria nova mensagem
    const divMensagem = document.createElement('div');
    divMensagem.className = `mensagem-flutuante ${tipo}`;
    divMensagem.textContent = mensagem;
    
    // Estilo da mensagem
    divMensagem.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
    `;
    
    if (tipo === 'sucesso') {
        divMensagem.style.backgroundColor = '#4CAF50';
    } else {
        divMensagem.style.backgroundColor = '#f44336';
    }
    
    document.body.appendChild(divMensagem);
    
    // Remove após 3 segundos
    setTimeout(() => {
        if (divMensagem.parentNode) {
            divMensagem.parentNode.removeChild(divMensagem);
        }
    }, 3000);
}

// Adiciona CSS para animação
const estilo = document.createElement('style');
estilo.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
    
    .loading {
        opacity: 0.7;
        pointer-events: none;
    }
`;
document.head.appendChild(estilo);

// Função para mostrar/ocultar loading
function toggleLoading(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// CADASTRO COM FIREBASE
formCadastro.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('signupNome').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const senha = document.getElementById('signupSenha').value.trim();

    // Validações
    if (nome.length < 2) {
        exibirMensagem('erro', 'Por favor, insira um nome válido (mínimo 2 caracteres).');
        return;
    }
    if (!validateEmail(email)) {
        exibirMensagem('erro', 'Por favor, insira um email válido.');
        return;
    }
    if (!validatePassword(senha)) {
        exibirMensagem('erro', 'A senha deve ter pelo menos 6 caracteres, incluindo letras e números.');
        return;
    }

    // Mostrar loading
    const btnTextoOriginal = btnCadastrar.textContent;
    btnCadastrar.textContent = 'Cadastrando...';
    toggleLoading(btnCadastrar, true);

    try {
        console.log('🔥 Tentando cadastrar usuário no Firebase...');
        
        // Criar usuário no Firebase Authentication
        const userCredential = await auth.createUserWithEmailAndPassword(email, senha);
        const user = userCredential.user;
        
        console.log('✅ Usuário criado no Firebase:', user.uid);

        // Atualizar perfil do usuário com o nome
        await user.updateProfile({
            displayName: nome
        });

        await user.sendEmailVerification();
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=0d3b5a&color=fff`;
        await db.collection('users').doc(user.uid).set({
            uid: user.uid,
            email: user.email,
            displayName: nome,
            isOnline: false,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            avatar: avatarUrl
        }, { merge: true });

        exibirMensagem('sucesso', 'Cadastro realizado com sucesso! Verifique seu email.');

        // Limpar formulário
        formCadastro.reset();

        // Redirecionar após sucesso
        setTimeout(() => {
            window.location.href = 'pagini.html';
        }, 3000);

    } catch (error) {
        console.error('❌ Erro no cadastro Firebase:', error);
        
        // Tratamento de erros específicos do Firebase
        let mensagemErro = 'Erro ao cadastrar. Tente novamente.';
        
        switch (error.code) {
            case 'auth/email-already-in-use':
                mensagemErro = 'Este email já está em uso.';
                break;
            case 'auth/invalid-email':
                mensagemErro = 'Email inválido.';
                break;
            case 'auth/operation-not-allowed':
                mensagemErro = 'Operação não permitida.';
                break;
            case 'auth/weak-password':
                mensagemErro = 'Senha muito fraca. Use uma senha mais forte.';
                break;
            case 'auth/network-request-failed':
                mensagemErro = 'Erro de conexão. Verifique sua internet.';
                break;
            default:
                mensagemErro = error.message || 'Erro desconhecido.';
        }
        
        exibirMensagem('erro', mensagemErro);
    } finally {
        // Restaurar botão
        btnCadastrar.textContent = btnTextoOriginal;
        toggleLoading(btnCadastrar, false);
    }
});

// LOGIN COM FIREBASE
btnLogin.addEventListener('click', async () => {
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value.trim();

    if (!validateEmail(email)) {
        exibirMensagem('erro', 'Por favor, insira um email válido.');
        return;
    }
    if (senha.length < 6) {
        exibirMensagem('erro', 'Senha deve ter pelo menos 6 caracteres.');
        return;
    }

    // Mostrar loading
    const btnTextoOriginal = btnLogin.textContent;
    btnLogin.textContent = 'Entrando...';
    toggleLoading(btnLogin, true);

    try {
        console.log('🔥 Tentando login no Firebase...');
        
        // Fazer login com Firebase
        const userCredential = await auth.signInWithEmailAndPassword(email, senha);
        const user = userCredential.user;
        
        console.log('✅ Login realizado:', user.uid);

        // Verificar se email está confirmado (opcional)
        if (!user.emailVerified) {
            console.log('⚠️ Email não verificado');
        }

        exibirMensagem('sucesso', 'Login realizado com sucesso!');

        // Salvar dados do usuário no localStorage
        const usuarioData = {
            uid: user.uid,
            email: user.email,
            nome: user.displayName || 'Usuário',
            emailVerificado: user.emailVerified
        };
        
        localStorage.setItem('usuario', JSON.stringify(usuarioData));
        console.log('💾 Dados do usuário salvos:', usuarioData);

        const avatarUrlLogin = `https://ui-avatars.com/api/?name=${encodeURIComponent(usuarioData.nome)}&background=0d3b5a&color=fff`;
        await db.collection('users').doc(user.uid).set({
            uid: user.uid,
            email: user.email,
            displayName: usuarioData.nome,
            isOnline: true,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            avatar: avatarUrlLogin
        }, { merge: true });

        
        
        // Redirecionar
        setTimeout(() => {
            window.location.href = 'pagini.html';
        }, 1500);

    } catch (error) {
        console.error('❌ Erro no login Firebase:', error);
        
        let mensagemErro = 'Erro ao fazer login. Tente novamente.';
        
        switch (error.code) {
            case 'auth/user-not-found':
                mensagemErro = 'Usuário não encontrado.';
                break;
            case 'auth/wrong-password':
                mensagemErro = 'Senha incorreta.';
                break;
            case 'auth/invalid-email':
                mensagemErro = 'Email inválido.';
                break;
            case 'auth/user-disabled':
                mensagemErro = 'Esta conta foi desativada.';
                break;
            case 'auth/network-request-failed':
                mensagemErro = 'Erro de conexão. Verifique sua internet.';
                break;
            case 'auth/too-many-requests':
                mensagemErro = 'Muitas tentativas. Tente novamente mais tarde.';
                break;
            default:
                mensagemErro = error.message || 'Erro desconhecido.';
        }
        
        exibirMensagem('erro', mensagemErro);
    } finally {
        // Restaurar botão
        btnLogin.textContent = btnTextoOriginal;
        toggleLoading(btnLogin, false);
    }
});

// OBSERVADOR DE ESTADO DE AUTENTICAÇÃO
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('👤 Usuário autenticado:', user.uid);
        localStorage.setItem('usuarioLogado', 'true');
    } else {
        console.log('🚪 Usuário deslogado');
        localStorage.removeItem('usuarioLogado');
    }
});

// EVENT LISTENERS PARA TRANSIÇÃO ENTRE LOGIN E CADASTRO
btnIrCadastro.addEventListener('click', mostrarCadastro);
btnVoltarLogin.addEventListener('click', mostrarLogin);

// VERIFICAR SE USUÁRIO JÁ ESTÁ LOGADO
function verificarUsuarioLogado() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
    if (usuario && usuario.uid) {
        console.log('🔄 Usuário já logado, redirecionando...');
    }
}

// Executar verificação quando a página carregar
document.addEventListener('DOMContentLoaded', verificarUsuarioLogado);

// Debug: Verifica se elementos foram encontrados
console.log('🔍 Elementos carregados:', {
    btnIrCadastro: !!btnIrCadastro,
    btnVoltarLogin: !!btnVoltarLogin,
    btnLogin: !!btnLogin,
    btnCadastrar: !!btnCadastrar,
    formCadastro: !!formCadastro,
    forgotPassword: !!document.querySelector('.forgot-password')
});
