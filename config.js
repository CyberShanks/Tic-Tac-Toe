
const Game = (() => {

    //private functions
    const _storePlayerMove = move => {
        console.log("player move stored");
        currentPlayer.storePlayerMove(move);
    }

    //Player Factory
    const Player = (name, marker) => {
        
        //global Player variable
        let playerMoves = [];

        //private function
        const _changeHeader = () => {
            const playerTurnDOMElement = document.querySelector(".player-turn");
            playerTurnDOMElement.textContent = name;
        }

        const storePlayerMove = move => {
            playerMoves.push(move);
            console.log(playerMoves);
        }

        const turn = () => {
            _changeHeader();
        }

        return { turn, name, marker, storePlayerMove };
    }

    //GameBlock Factory
    const GameBlock = (row, column) => {

        // global GameBlock variable
        let reactState = true;

        const _removeEventListener = element => {
            console.log("Event removed");
            element.removeEventListener('click', _click);
        }

        const _changeReactState = () => {
            console.log("react state changed");
            reactState = false;
        }

        const _applyMarker = element => {
            //mark the box
            element.textContent = currentPlayer.marker;
        }

        const _click = (e) => {
            _changeReactState();
            _removeEventListener(e.target);
            _applyMarker(e.target);
            _storePlayerMove(e.target.id);
            // _checkGameBoard();
            globalGameObject.getPlayers().switchTurn();
        }

        const _fetchElement = () => {
            var blockNumber = String(row) + String(column);
            return document.getElementById(blockNumber);
        }

        const _addEventListener = () => {
            blockElement = _fetchElement();
            blockElement.addEventListener('click', _click, false);
        }

        const checkReactState = () => reactState;
        const checkCoordinates = () => console.log(`row = ${row} column = ${column}`);

        //automatically add event listener to new block;
        _addEventListener();

        return { checkCoordinates, checkReactState };
    }

    // Players Object
    const _Players = () => {
        //create players
        const player1 = Player('player1', 'X');
        const player2 = Player('player2', 'O');

        const switchTurn = () => {
            console.log();
            if (player1 === currentPlayer) {
                currentPlayer = player2;
            }
            else {
                currentPlayer = player1;
            }
        }

        return { player1, player2, switchTurn };
    }


    // Game Board Object
    const _Blocks = () => {
        // create game blocks
        const block1 = GameBlock(1, 1);
        const block2 = GameBlock(1, 2);
        const block3 = GameBlock(1, 3);
        const block4 = GameBlock(2, 1);
        const block5 = GameBlock(2, 2);
        const block6 = GameBlock(2, 3);
        const block7 = GameBlock(3, 1);
        const block8 = GameBlock(3, 2);
        const block9 = GameBlock(3, 3);

        const checkGameBoard = () => console.log("win? lose?");

        return { block1, block2, block3, block4, block5, block6, block7, block8, block9, checkGameBoard };
    }

    const _initialization = () => {

        const GameBoard = _Blocks();
        const Players = _Players();

        const getGameBoard = () => GameBoard;
        const getPlayers = () => Players;

        return { getGameBoard, getPlayers };
    }

    const start = () => {
        currentPlayer = globalGameObject.getPlayers().player1;
    }

    const end = () => { };

    //global Game Variables
    let currentPlayer;
    const globalGameObject = _initialization();

    return { start };
})();

Game.start();
