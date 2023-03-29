/*
Este código define a lógica do jogo. Ele começa selecionando todas as cartas com `querySelectorAll` e definindo variáveis para o estado do jogo. 

A função `flipCard` é chamada quando o jogador clica em uma carta. Ela adiciona a classe `flip` à carta clicada e verifica se é o primeiro ou o segundo cartão clicado. Se for o primeiro, ele armazena em `firstCard` e retorna. Se for o segundo, ele armazena em `secondCard` e chama a função `checkForMatch`.

A função `checkForMatch` verifica se as cartas são iguais, comparando seus `dataset.framework`. Se for uma correspondência, ele chama `disableCards` para desativar as cartas. Caso contrário, ele chama `unflipCards` para virar as cartas de volta.

A função `disableCards` remove o evento de clique das cartas correspondentes, de modo que não possam ser clicadas novamente, e chama `resetBoard` para redefinir as variáveis do jogo.

A função `unflipCards` desvira as cartas depois de um breve atraso de 1,5 segundos e chama `resetBoard` para redefinir as variáveis do jogo.

A função `resetBoard` redefinirá as variáveis `hasFlippedCard`, `lockBoard`, `firstCard` e `secondCard` para seus valores iniciais.

Por fim, a função `shuffle` é uma função auto-invocada que percorre cada carta e define uma ordem aleatória com a propriedade CSS `order`. Por fim, adiciona um ouvinte de eventos de clique a cada carta.
*/





const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;

	this.classList.add('flip');

	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
		return;
	}

	secondCard = this;

	checkForMatch();
}

function checkForMatch() {
	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

	isMatch ? disableCards() : unflipCards();
}

function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);

	resetBoard();
}

function unflipCards() {
	lockBoard = true;

	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		resetBoard();
	}, 1500);
}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

(function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
