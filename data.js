
function delegate(parent, child, when, what) {
    function eventHandlerFunction(event) {
        let eventTarget = event.target
        let eventHandler = this
        let closestChild = eventTarget.closest(child)

        if (eventHandler.contains(closestChild)) {
            what(event, closestChild)
        }
    }

    parent.addEventListener(when, eventHandlerFunction)
}

const blacktilesforten = [
    {
        row: 0,
        column: 5,
        innertext: 1

    },
    {
        row: 2,
        column: 3,
        innertext: 2

    },
    {
        row: 5,
        column: 0,
        innertext: 1

    },
    {
        row: 3,
        column: 7,
        innertext: 0

    },
    {
        row: 6,
        column: 3,
        innertext: 2

    },
    {
        row: 6,
        column: 8,
        innertext: 2

    },
    {
        row: 8,
        column: 5,
        innertext: 3

    },
    {
        row: 8,
        column: 1,
        innertext: 2

    },
    {
        row: 9,
        column: 8,
        innertext: 1

    },
    {
        row: 5,
        column: 6,
        innertext: 0

    },

];


const blacktilesforadvancedseven = [
    {
        row: 0,
        column: 2,
        innertext: 0

    },
    {
        row: 0,
        column: 4,
        innertext: 0

    },
    {
        row: 2,
        column: 0,
        innertext: 3

    },
    {
        row: 2,
        column: 2,
        innertext: 1

    },
    {
        row: 2,
        column: 4,
        innertext: 0

    },
    {
        row: 2,
        column: 6,
        innertext: 0

    },
    {
        row: 4,
        column: 0,
        innertext: 1

    },
    {
        row: 4,
        column: 2,
        innertext: 0

    },
    {
        row: 4,
        column: 4,
        innertext: 0

    },
    {
        row: 4,
        column: 6,
        innertext: 1

    },
    {
        row: 6,
        column: 2,
        innertext: 2

    },
    {
        row: 6,
        column: 4,
        innertext: 0

    },

];

const blacktilesforseven = [
    {
        row: 0,
        column: 3,
        innertext: 0

    },
    {
        row: 1,
        column: 0,
        innertext: 2

    },
    {
        row: 2,
        column: 6,
        innertext: 1

    },
    {
        row: 3,
        column: 1,
        innertext: 0

    },
    {
        row: 4,
        column: 3,
        innertext: 2

    },
    {
        row: 5,
        column: 6,
        innertext: 0

    },
    {
        row: 6,
        column: 2,
        innertext: 1

    },

];