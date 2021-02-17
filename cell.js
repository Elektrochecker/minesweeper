let visited = [];

function Cell(isBomb = false, x, y) {
    this.notBorder;
    this.isBomb = isBomb;
    this.pos = [x, y];
    this.value = 0;
    this.show = false;
    this.flagged = false;

    this.reveal = () => {
        this.show = true;
        return this;
    }

    this.render = () => {
        if (cells[x][y].isBomb == true) {
            fill(50);
        } else {
            fill(200);
        }
        rect(x * scl, y * scl, scl, scl);

        if (!cells[x][y].isBomb && cells[x][y].value != 0) {
            textAlign(CENTER);
            fill(0);
            text(cells[x][y].value, x * scl + scl / 2, y * scl + scl - 4);
        }
    }

    this.countBombs = () => {
        let value = 0;
        if (x > 0 && y > 0) {
            if (cells[x - 1][y - 1].isBomb) {
                value++;
            }
        }
        if (y > 0) {
            if (cells[x][y - 1].isBomb) {
                value++;
            }
        }
        if (x < l - 1 && y > 0) {
            if (cells[x + 1][y - 1].isBomb) {
                value++;
            }
        }
        if (x > 0) {
            if (cells[x - 1][y].isBomb) {
                value++;
            }
        }
        if (x < l - 1) {
            if (cells[x + 1][y].isBomb) {
                value++;
            }
        }
        if (x > 0 && y < l - 1) {
            if (cells[x - 1][y + 1].isBomb) {
                value++;
            }
        }
        if (y < l - 1) {
            if (cells[x][y + 1].isBomb) {
                value++;
            }
        }
        if (x < l - 1 && y < l - 1) {
            if (cells[x + 1][y + 1].isBomb) {
                value++;
            }
        }

        return value;
    }

    this.clearBombs = (x, y) => {
        cells[x - 1][y - 1].reveal().isBomb = false;
        cells[x][y - 1].reveal().isBomb = false;
        cells[x + 1][y - 1].reveal().isBomb = false;

        cells[x - 1][y].reveal().isBomb = false;
        cells[x][y].reveal().isBomb = false;
        cells[x + 1][y].reveal().isBomb = false;

        cells[x - 1][y + 1].reveal().isBomb = false;
        cells[x][y + 1].reveal().isBomb = false;
        cells[x + 1][y + 1].reveal().isBomb = false;
    }

    this.getValue = function () {
        if (!this.isBomb) {
            this.value = this.countBombs();
        }
    }

    this.revealEmpty = (x, y) => {
        var activeCell = cells[x][y];
        this.show = true;
        visited.push(activeCell);

        if (this.border) {
            return false;
        }

        if (cells[x - 1][y - 1].value == 0) {
            this.revealEmpty(x - 1, y - 1);
        }
        if (cells[x][y - 1].value == 0) {
            this.revealEmpty(x, y - 1);
        }
        if (cells[x + 1][y - 1].value == 0) {
            this.revealEmpty(x + 1, y - 1);
        }
        if (cells[x - 1][y].value == 0) {
            this.revealEmpty(x - 1, y);
        }
        if (cells[x][y].value == 0) {
            this.revealEmpty(x, y);
        }
        if (cells[x + 1][y].value == 0) {
            this.revealEmpty(x + 1, y);
        }
        if (cells[x - 1][y + 1].value == 0) {
            this.revealEmpty(x - 1, y + 1);
        }
        if (cells[x][y + 1].value == 0) {
            this.revealEmpty(x, y + 1);
        }
        if (cells[x + 1][y + 1].value == 0) {
            this.revealEmpty(x + 1, y + 1);
        }
    }
}