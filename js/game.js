const gameSelection = document.querySelector('.game-selection');

document.getElementById('play').addEventListener('click', () => {
    gameSelection.classList.remove('hidden');
})