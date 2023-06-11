
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

        const changeHeader = () => {
            const playerTurnDOMElement = document.querySelector(".player-turn");
            playerTurnDOMElement.textContent = String(name) + " 's Turn";
        }

        const storePlayerMove = move => {
            playerMoves.push(move);
            console.log(playerMoves);
        }

        const getPlayerMoves = () => playerMoves;

        return { changeHeader, name, marker, storePlayerMove, getPlayerMoves };
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
            globalGameObject.getGameBoard().checkGameBoard();
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
        const checkCoordinates = () => {row, column};
        const disableBlock = () => { 
            let element = _fetchElement();
            element.removeEventListener('click', _click);
        }

        //automatically add event listener to new block;
        _addEventListener();


        return { checkCoordinates, checkReactState, disableBlock };
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
            currentPlayer.changeHeader();
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

        const _checkSubset = (parentArray, subsetArray) => {
            let set = new Set(parentArray);
            return subsetArray.every(x => set.has(x));
          }

        const _checkWin = playerMoves => {

            let winCondition = ['11','21','31'];
            if (_checkSubset(playerMoves, winCondition)) return true;
            winCondition = ['12','22','32'];
            if (_checkSubset(playerMoves, winCondition)) return true;
            winCondition = ['13','23','33'];
            if (_checkSubset(playerMoves, winCondition)) return true;
            winCondition = ['11','12','13'];
            if (_checkSubset(playerMoves, winCondition)) return true;
            winCondition = ['21','22','23'];
            if (_checkSubset(playerMoves, winCondition)) return true;
            winCondition = ['31','32','33'];
            if (_checkSubset(playerMoves, winCondition)) return true;
            winCondition = ['11','22','33'];
            if (_checkSubset(playerMoves, winCondition)) return true;
            winCondition = ['31','22','13'];
            if (_checkSubset(playerMoves, winCondition)) return true;

            return false;
        }

        const disableBoard = () => {
            if (block1.checkReactState()) block1.disableBlock();
            if (block2.checkReactState()) block2.disableBlock();
            if (block3.checkReactState()) block3.disableBlock();
            if (block4.checkReactState()) block4.disableBlock();
            if (block5.checkReactState()) block5.disableBlock();
            if (block6.checkReactState()) block6.disableBlock();
            if (block7.checkReactState()) block7.disableBlock();
            if (block8.checkReactState()) block8.disableBlock();
            if (block9.checkReactState()) block9.disableBlock();
        }

        const checkGameBoard = () => {
            //check win -> three in a row
            let player1Moves = globalGameObject.getPlayers().player1.getPlayerMoves();
            let player2Moves = globalGameObject.getPlayers().player2.getPlayerMoves();
            
            if (player1Moves.length >= 3){
                if (_checkWin(player1Moves)) {
                    _end('win1');
                    return;
                }
            }

            if (player2Moves.length >= 3){
                if (_checkWin(player2Moves)) {
                    _end('win2');
                    return;
                }
            }

            //check tie -> reactState of ALL blocks is false
            if (!(block1.checkReactState() || block2.checkReactState() || block3.checkReactState() || block4.checkReactState() || block5.checkReactState() || block6.checkReactState() || block7.checkReactState() || block8.checkReactState() || block9.checkReactState())){
                _end('tie');
            }
        };

        return { checkGameBoard, disableBoard };
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
        currentPlayer.changeHeader();
    }

    const _end = outcome => {
        const gameOutcome = document.querySelector(".game-msg");
        if (outcome === 'tie'){
            //initiate tie ending
            console.log("ITS A TIE!!!!!!");
            gameOutcome.textContent = "ITS A TIE!!!!!!"
        }

        if (outcome === 'win1'){
            //player 1 wins
            console.log("PLAYER 1 WINS!!!");
            gameOutcome.textContent = "PLAYER 1 WINS!!!";
        }

        if (outcome === 'win2'){
            //player 2 wins
            console.log("PLAYER 2 WINS!!!!");
            gameOutcome.textContent = "PLAYER 2 WINS!!!"
        }
        globalGameObject.getGameBoard().disableBoard();
     };

    //global Game Variables
    let currentPlayer;
    const globalGameObject = _initialization();

    return { start };
})();

Game.start();
