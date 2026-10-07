

        let moves = [];
        let moveIndex = 0;

        // Start the game
        function startGame() {

            resetGame();

            let n = Number(document.getElementById("diskCount").value);

            createDisks(n);

            // Generate Tower of Hanoi moves
            moves = [];

            towerOfHanoi(n, "A", "B", "C");

            moveIndex = 0;

            // Start animation
            setTimeout(makeMove, 500);
        }

        // Tower of Hanoi recursive function
        function towerOfHanoi(n, source, auxiliary, destination) {

            // Base condition
            if (n === 1) {

                moves.push({
                    disk: n,
                    from: source,
                    to: destination
                });

                return;
            }

            // Move n-1 disks from source to auxiliary
            towerOfHanoi(n - 1, source, destination, auxiliary);

            // Move largest disk from source to destination
            moves.push({
                disk: n,
                from: source,
                to: destination
            });

            // Move n-1 disks from auxiliary to destination
            towerOfHanoi(n - 1, auxiliary, source, destination);
        }

        // Create disks on Source tower
        function createDisks(n) {

            let tower = document.getElementById("A");

            for (let i = n; i >= 1; i--) {

                let disk = document.createElement("div");

                disk.className = "disk disk" + i;

                disk.id = "disk" + i;

                disk.innerText = i;

                // Position disks from bottom to top
                disk.style.bottom = ((n - i) * 35) + "px";

                tower.appendChild(disk);
            }
        }

        // Perform one move
        function makeMove() {

            if (moveIndex >= moves.length) {

                document.getElementById("message").innerText =
                    " All disks moved to Destination Successfully .";

                return;
            }

            let move = moves[moveIndex];

            let disk = document.getElementById("disk" + move.disk);

            let destinationTower =
                document.getElementById(move.to);

            // Move disk to destination tower
            destinationTower.appendChild(disk);

            // Find disks currently on destination tower
            let disks =
                destinationTower.querySelectorAll(".disk");

            // Position disk on top of other disks
            disk.style.bottom =
                ((disks.length - 1) * 35) + "px";

            moveIndex++;

            document.getElementById("message").innerText =
                "Move disk " + move.disk +
                " from " + move.from +
                " → " + move.to;

            // Wait before next move
            setTimeout(makeMove, 1200);
        }

        // Reset the game
        function resetGame() {

            clearTowers();

            moves = [];
            moveIndex = 0;

            document.getElementById("message").innerText =
                "Select the number of disks and click Start Game.";
        }

        // Remove all disks
        function clearTowers() {

            let towers = document.querySelectorAll(".tower");

            towers.forEach(function (tower) {

                let disks =
                    tower.querySelectorAll(".disk");

                disks.forEach(function (disk) {
                    disk.remove();
                });

            });
        }