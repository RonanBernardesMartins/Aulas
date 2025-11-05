document.addEventListener('DOMContentLoaded', () => {
    const omnitrix = document.querySelector('.omnitrix');
    const core = document.querySelector('.core');
    const hourglass = document.querySelector('.hourglass');
    
    // Pegamos as DUAS telas
    const alienA = document.getElementById('alien-display-A');
    const alienB = document.getElementById('alien-display-B');

    // Lista de aliens
    const aliens = [
        'images/four-arms.png',
        'images/heatblast.png',
        'images/MassaPose.png'
    ];

    // Variáveis de estado
    let currentAlienIndex = 0;
    let isAlienActive = false; // Controla se a ampulheta está visível
    let currentRotation = 0; // Controla a rotação dos botões
    let currentDisplay = alienA; // A tela que está visível
    let nextDisplay = alienB; // A tela que está escondida

    // Lógica principal de clique no centro
    core.addEventListener('click', () => {
        
        if (isAlienActive) {
            // --- UM ALIEN JÁ ESTÁ NA TELA ---
            
            // 1. Gira os botões
            currentRotation += 90;
            omnitrix.style.setProperty('--button-rotation', `${currentRotation}deg`);

            // 2. Avança para o próximo alien
            currentAlienIndex = (currentAlienIndex + 1) % aliens.length;

            // 3. Prepara a próxima tela (que está escondida)
            nextDisplay.src = aliens[currentAlienIndex];
            // 'prepare-next' joga a imagem para a direita da tela, instantaneamente
            nextDisplay.classList.add('prepare-next');

            // 4. Inicia as animações de troca
            // (Usamos um pequeno timeout para garantir que o 'prepare-next' seja aplicado primeiro)
            setTimeout(() => {
                // Desliza a tela ATUAL para fora (esquerda)
                currentDisplay.classList.remove('active', 'slide-in'); // Limpa classes
                currentDisplay.classList.add('slide-out');

                // Desliza a tela PRÓXIMA para dentro (da direita)
                nextDisplay.classList.remove('prepare-next'); // Limpa classe
                nextDisplay.classList.add('slide-in');
            }, 50); // 50ms de delay

            // 5. Inverte as telas: a que entrou é a "atual", a que saiu é a "próxima"
            let temp = currentDisplay;
            currentDisplay = nextDisplay;
            nextDisplay = temp;

        } else {
            // --- PRIMEIRO CLIQUE (NENHUM ALIEN NA TELA) ---
            
            isAlienActive = true;
            core.classList.add('alien-active'); // Esconde a ampulheta

            // Carrega o primeiro alien e usa a animação 'active' (zoom-in)
            currentDisplay.src = aliens[currentAlienIndex];
            currentDisplay.classList.add('active');
        }
    });
});