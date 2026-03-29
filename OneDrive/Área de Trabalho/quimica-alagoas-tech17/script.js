// Modal do roteiro visual para boasvindas.html
document.addEventListener('DOMContentLoaded', function() {
    var openBtn = document.getElementById('openRoteiroBtn');
    var modal = document.getElementById('roteiroModal');
    var closeBtn = document.getElementById('closeRoteiroBtn');
    if (openBtn && modal && closeBtn) {
        openBtn.addEventListener('click', function() {
            modal.style.display = 'flex';
        });
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        // Fechar ao clicar fora do modal
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});
// Modal do roteiro visual
document.addEventListener('DOMContentLoaded', function() {
    var openBtn = document.getElementById('openRoteiroBtn');
    var modal = document.getElementById('roteiroModal');
    var closeBtn = document.getElementById('closeRoteiroBtn');
    if (openBtn && modal && closeBtn) {
        openBtn.addEventListener('click', function() {
            modal.style.display = 'flex';
        });
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        // Fechar ao clicar fora do modal
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});
// Função para normalizar resposta (remover acentos, espaços extras, minúsculas)
function normalize(str) {
    return str.normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
}

// Efeito sonoro de avanço de fase (opcional)
function playAdvanceSound() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.value = 880;
    g.gain.value = 0.08;
    o.connect(g).connect(ctx.destination);
    o.start();
    setTimeout(() => { o.stop(); ctx.close(); }, 180);
}

function checkMaceio() {
    let r = normalize(document.getElementById('input1').value);
    let s = document.getElementById('status1');
    let correto = ["inorganico", "inorgânico", "inorganica", "inorgânica"];
    let organico = ["organico", "orgânico", "organica", "orgânica"];
    if (correto.some(ans => r.includes(ans))) {
        s.innerHTML = "✅ ACESSO CONCEDIDO: Sal-Gema identificado!<br><span class='feedback'>Correto! O sal-gema (NaCl) é um composto inorgânico, pois não possui carbono em sua estrutura. Compostos orgânicos possuem carbono, geralmente ligados a hidrogênio.</span>";
        s.style.color = "#00ff41";
        setStationComplete(1);
        unlockStation(2);
        playAdvanceSound();
    } else if (organico.some(ans => r.includes(ans))) {
        s.innerHTML = "❌ Atenção: Compostos orgânicos possuem carbono em sua estrutura. O sal-gema (NaCl) não possui carbono, por isso é inorgânico.";
        s.style.color = "orange";
    } else {
        s.innerHTML = "❌ Resposta não reconhecida. Tente novamente!";
        s.style.color = "red";
    }
    updateProgress();
}

function checkPilar() {
    let r = normalize(document.getElementById('input2').value);
    let s = document.getElementById('status2');
    let correto = ["quimico", "químico", "quimica", "química"];
    let fisico = ["fisico", "físico", "fisica", "física"];
    if (correto.some(ans => r.includes(ans))) {
        s.innerHTML = "✅ ACESSO CONCEDIDO: Fenômeno Químico detectado!<br><span class='feedback'>Correto! A fermentação é um fenômeno químico, pois ocorre a formação de uma nova substância (etanol).</span>";
        s.style.color = "#00ff41";
        setStationComplete(2);
        unlockStation(3);
        playAdvanceSound();
    } else if (fisico.some(ans => r.includes(ans))) {
        s.innerHTML = "❌ Atenção: Fenômenos físicos não criam novas substâncias. Na fermentação, o açúcar vira etanol, então é um fenômeno químico.";
        s.style.color = "orange";
    } else {
        s.innerHTML = "❌ Resposta não reconhecida. Tente novamente!";
        s.style.color = "red";
    }
    updateProgress();
}

function checkChaPreta() {
    let r = normalize(document.getElementById('input3').value);
    let s = document.getElementById('status3');
    let correto = ["albedo", "refletancia", "refletância"];
    if (correto.some(ans => r.includes(ans))) {
        s.innerHTML = "✅ SUCESSO! Sistema Eco-Cooling Ativo. Temperatura reduzida!<br><span class='feedback'>Correto! 'Albedo' e 'refletância' são termos usados para descrever a capacidade de uma superfície refletir a luz solar. Quanto maior o albedo/refletância, mais luz é refletida e menos calor é absorvido.</span>";
        s.style.color = "cyan";
        setStationComplete(3);
        unlockStation(4);
        playAdvanceSound();
    } else {
        s.innerHTML = "❌ Dica: O termo pode ser 'albedo' ou 'refletância', ambos relacionados à capacidade de refletir a luz. Tente novamente!";
        s.style.color = "orange";
    }
    updateProgress();
}

// Controle de progresso e fases
let stations = [false, false, false, false, false, false, false, false, false, false];
function checkEnergiaLimpa() {
    let r = document.getElementById('input10').value.trim();
    let nomes = (document.getElementById('nomes10') ? document.getElementById('nomes10').value.trim() : '');
    let s = document.getElementById('status10');
    if (r.length > 5) {
        // Salva ideia e nomes no localStorage
        let ideias = JSON.parse(localStorage.getItem('ideiasEnergiaLimpa') || '[]');
        ideias.push({ ideia: r, nomes: nomes });
        localStorage.setItem('ideiasEnergiaLimpa', JSON.stringify(ideias));
        s.innerHTML = "✅ Obrigado por sua ideia! A Química é fundamental para o futuro sustentável de Alagoas. Sua sugestão foi registrada.";
        s.style.color = "#00ff41";
        setStationComplete(10);
        playAdvanceSound();
        updateProgress();
    } else {
        s.innerHTML = "❌ Escreva uma ideia mais detalhada sobre energia limpa e a Química!";
        s.style.color = "orange";
    }
}

function setStationComplete(idx) {
    stations[idx - 1] = true;
}

function checkChaPretaSolo() {
    let r = normalize(document.getElementById('input6').value);
    let s = document.getElementById('status6');
    let correto = ["nitrogenio", "nitrogênio", "n", "n2"];
    if (correto.some(ans => r.includes(ans))) {
        s.innerHTML = "✅ Correto! O nitrogênio é fundamental para o crescimento das plantas e é fixado por bactérias nas raízes do feijão.";
        s.style.color = "#00ff41";
        setStationComplete(6);
        unlockStation(7);
        playAdvanceSound();
    } else {
        s.innerHTML = "❌ Dica: É o elemento mais abundante do ar e essencial para proteínas.";
        s.style.color = "orange";
    }
    updateProgress();
}

function checkChaPretaAgua() {
    let r = normalize(document.getElementById('input7').value);
    let s = document.getElementById('status7');
    let correto = ["cloracao", "cloração", "cloro", "filtracao", "filtração", "decantacao", "decantação", "floculacao", "floculação", "desinfeccao", "desinfecção"];
    if (correto.some(ans => r.includes(ans))) {
        s.innerHTML = "✅ Correto! Esse é um dos processos usados para tornar a água potável.";
        s.style.color = "#00ff41";
        setStationComplete(7);
        unlockStation(8);
        playAdvanceSound();
    } else {
        s.innerHTML = "❌ Dica: Pode ser cloração, filtração, decantação, floculação ou desinfecção.";
        s.style.color = "orange";
    }
    updateProgress();
}

function checkChaPretaGas() {
    let r = normalize(document.getElementById('input8').value);
    let s = document.getElementById('status8');
    let correto = ["c3h8", "c 3 h 8", "propano"];
    if (correto.some(ans => r.replace(/\s+/g,"") === ans.replace(/\s+/g,""))) {
        s.innerHTML = "✅ Correto! O propano tem fórmula molecular C₃H₈.";
        s.style.color = "#00ff41";
        setStationComplete(8);
        unlockStation(9);
        playAdvanceSound();
    } else {
        s.innerHTML = "❌ Dica: Fórmula começa com C, tem 3 carbonos e 8 hidrogênios.";
        s.style.color = "orange";
    }
    updateProgress();
}

function checkIzidroReciclagem() {
    let r = normalize(document.getElementById('input9').value);
    let s = document.getElementById('status9');
    let correto = ["plastico", "plástico", "papel", "vidro", "metal", "aluminio", "alumínio", "pet", "garrafa pet", "papelao", "papelão"];
    if (correto.some(ans => r.includes(ans))) {
        s.innerHTML = "✅ Muito bem! Materiais recicláveis como plástico, papel, vidro ou metal podem ser reaproveitados, reduzindo o lixo e ajudando o meio ambiente.";
        s.style.color = "#00ff41";
        setStationComplete(9);
        unlockStation(10);
        playAdvanceSound();
    } else {
        s.innerHTML = "❌ Dica: Pense em materiais comuns de embalagens e resíduos escolares.";
        s.style.color = "orange";
    }
    updateProgress();
}

function checkJaragua() {
    let r = normalize(document.getElementById('input4').value);
    let s = document.getElementById('status4');
    let correto = ["c12h22o11", "c12 h22 o11", "c12 h22o11", "c12h22 o11"];
    if (correto.some(ans => r.replace(/\s+/g,"") === ans.replace(/\s+/g,""))) {
        s.innerHTML = "✅ ACESSO CONCEDIDO: Fórmula correta!<br><span class='feedback'>Correto! A sacarose, principal açúcar da cana, tem fórmula molecular C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>. Ela é um carboidrato fundamental para a economia de Alagoas.</span>";
        s.style.color = "#00ff41";
        setStationComplete(4);
        playAdvanceSound();
        unlockStation(5);
        updateProgress();
    } else {
        s.innerHTML = "❌ Dica: A fórmula é composta por carbono, hidrogênio e oxigênio. Tente novamente!";
        s.style.color = "orange";
        updateProgress();
    }
}

function checkSerraLisa() {
    let r = normalize(document.getElementById('input5').value);
    let s = document.getElementById('status5');
    let correto = ["intemperismo quimico", "intemperismo químico", "intemperismo", "dissolucao", "dissolução", "dissolucao quimica", "dissolução química", "dissolucao química", "dissolucao química"];
    if (correto.some(ans => r.includes(ans))) {
        s.innerHTML = "✅ SUCESSO! Você identificou corretamente o processo químico de erosão das rochas: Intemperismo Químico.<br><span class='feedback'>Correto! O intemperismo químico envolve a decomposição das rochas por ação da água, ácidos naturais e outros agentes, transformando minerais e alterando o relevo.</span>";
        s.style.color = "#00ff41";
        setStationComplete(5);
        unlockStation(6);
        playAdvanceSound();
        updateProgress();
    } else {
        s.innerHTML = "❌ Dica: O processo envolve água, ácidos naturais e transforma minerais das rochas. Tente novamente!";
        s.style.color = "orange";
        updateProgress();
    }
}

function unlockStation(idx) {
    let st = document.getElementById('station' + idx);
    if (st) {
        st.style.display = 'block';
        // Scroll para a próxima estação
        setTimeout(() => {
            st && st.scrollIntoView({behavior: 'smooth', block: 'center'});
        }, 300);
    }
}

function updateProgress() {
    let done = stations.filter(Boolean).length;
    let bar = document.getElementById('progress-bar');
    if (bar) {
        bar.max = 10;
        bar.value = done;
    }
    // Bloquear estações seguintes se não completou a anterior
    for (let i = 2; i <= 10; i++) {
        if (!stations[i-2]) {
            for (let j = i; j <= 10; j++) {
                let st = document.getElementById('station'+j);
                if (st) st.style.display = 'none';
            }
            if (document.getElementById('station'+(i-1))) document.getElementById('station'+(i-1)).style.display = 'block';
            break;
        } else if (i === 10 && stations[9]) {
            // Todas desbloqueadas
            for (let j = 1; j <= 10; j++) {
                let st = document.getElementById('station'+j);
                if (st) st.style.display = 'block';
            }
        }
    }
    if (done === 10) {
        showFinalMessage();
    }
}

function showFinalMessage() {
    let msg = document.getElementById('final-message');
    if (msg) {
        msg.style.display = 'block';
        msg.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
}

// Inicialização: só mostra a primeira estação
window.onload = function() {
    // Só inicializa estações e barra se estiver na página de desafios (index.html)
    if (document.getElementById('station1')) {
        for (let i = 1; i <= 10; i++) {
            let st = document.getElementById('station'+i);
            if (st) st.style.display = (i === 1 ? 'block' : 'none');
        }
        let bar = document.getElementById('progress-bar');
        if (bar) { bar.value = 0; bar.max = 10; }
        let msg = document.getElementById('final-message');
        if (msg) msg.style.display = 'none';
    }
}
