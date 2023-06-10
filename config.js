
const Game = (() => {

    //define PlayerFactory
    const Player = (name, marker) => {
        const _changeHeader = () => {
            const playerTurnDOMElement = document.querySelector(".player-turn");
            playerTurnDOMElement.textContent = name;
        }
        const turn = () => {
            _changeHeader();
            //end events
        }
        const sayName = () => console.log(`my name is ${name}`);
        const sayMarker = () => {
            console.log(`my marker is ${marker}`);
        }
        return { turn, sayName, sayMarker };
    }

    //define GameBlockFactory
    const GameBlock = (row, column) => {
        //next step add event listener to each newly created block --> <<associate object with DOM>>
        const _click = () => console.log("I have been clicked!");
        const _removeEventListener = () => console.log("Event removed");
        const _changeReactState = () => console.log("react state changed");
        const _storePlayerMove = () => console.log("player move stored");
        const checkGameBoard = () => console.log("win? lose?");
        const checkCoordinates = () => console.log(`row = ${row} column = ${column}`);

        return { checkGameBoard, checkCoordinates };
    }

    //private functions
    const _initializePlayers = () => {
        const player1 = Player('player1', 'X');
        const player2 = Player('player2', 'O');
        return { player1, player2 };
    }
    const _initializeBlocks = () => {
        const block1 = GameBlock(1, 1);
        const block2 = GameBlock(1, 2);
        const block3 = GameBlock(1, 3);
        const block4 = GameBlock(2, 1);
        const block5 = GameBlock(2, 2);
        const block6 = GameBlock(2, 3);
        const block7 = GameBlock(3, 1);
        const block8 = GameBlock(3, 2);
        const block9 = GameBlock(3, 3);
        return { block1, block2, block3, block4, block5, block6, block7, block8, block9 };
    }

    const start = () => {
        //initializations
        const Players = _initializePlayers();
        const GameBoard = _initializeBlocks();
        Players.player1.turn();
    };
    const end = () => { };
    const nextMove = () => { };

    return { start };
})();

Game.start();
