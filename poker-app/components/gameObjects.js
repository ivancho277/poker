import { VERSION } from "../constants/version";






/**
 *
 *
 * @class GameStats creates a full game from actions and lets you calculate stats
 * 
 */
class GameStats {
    /**
     *Creates an instance of GameStats.
     * @param {Action[]} actions
     * @param {String[]} tags
     * @memberof GameStats
     */
    constructor(actions, tags) {
        this.actions = actions,
            this.tags = tags,
            this.currentStats = {}
    }


    /**
     *
     *
     * @memberof GameStats
     * @returns {Object} -an object that has each action and total count per position for game
     */
    getCurrentStats = () => {
        //debugger;
        this.actions.forEach(action => {
            //console.log(action)
            this.currentStats[action.actionName] = {}
            this.currentStats[action.actionName].total = action.count;
            console.log(this.currentStats[action.actionName])
            for (count in action.countPerPosition) {
                this.currentStats[action.actionName][count] = action.countPerPosition[count];

            }
        })
        return this.currentStats;
    };


    /**
     *
     *
     * @memberof GameStats
     * @returns {tags[]}
     */
    getTags = () => {
        return this.tags;
    }


}

/**
 *
 *
 * @class Action -creates an Action with name a total count, and count for every position. with count at all game positions defaults all to 0
 */
class Action {
    /**
     *Creates an instance of Action.
     * @param {String} actionName -sets action name for instance
     * @param {number} [count=0] -sets count, or defaults to 0
     * @param {Object} [countPerPosition={ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }] -sets and object with game positions, all initliaze to 0 by default.
     * @memberof Action
     */
    constructor(actionName, count = 0, countPerPosition = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }) {
        this.actionName = actionName,
            this.count = count,
            this.countPerPosition = countPerPosition
    }

    /**
     *
     *
     * @param {number} position game position to increment counter in of postion in {@link countPerPosition} for this action
     * @memberof Action
     */
    incrementActionAtPosition(position) {
        this.countPerPosition[position] = ++this.countPerPosition[position];
        this.count++;
    }

    /**
     *
     *
     * @returns {Object} returns copy of {@see countPerPosition}
     * @memberof Action
     */
    getPositionCount() {
        return Object.assign({}, this.countPerPosition)
    }
    /**
     *
     *
     * @returns {number} returns {@link count}
     * @memberof Action
     */
    getTotalCount() {
        return this.count;
    }
}


/**
 *
 *
 * @class Game -Creates a full Game that can calculate the stats for a game;
 */
class Game {
    /**
     *Creates an instance of Game.
     * @param {Action[]} actions -An array of Action objects
     * @param {String[]} tags -An array of game tags
     * @param {number} position -a position number
     * @param {string|numner} version -version of program when instanciated
     * @param {Date} date -date object when created
     * @memberof Game
     */
    constructor(actions, tags = [], position = 0, version = VERSION ,date = new Date()) {
        this.actions = actions.every((action) => { return typeof action === "string" }) ? actions.map(action => { return new Action(action) }) : actions;
        this.position = position;
        this.tags = tags;
        this.version = version;
        this.date = date;
        this.currentStats = {};
    }

    addTag = (tag) => {
        this.tags.push(tag)
    }

    addAction = (action) => {
        const newAction = new Action(action)
        this.actions.push(newAction);
    }
    getCurrentStats = () => {
        //debugger;
        this.actions.forEach(action => {
            //console.log(action)
            this.currentStats[action.actionName] = {}
            this.currentStats[action.actionName].total = action.count;
            console.log(this.currentStats[action.actionName])
            for (count in action.countPerPosition) {
                this.currentStats[action.actionName][count] = action.countPerPosition[count];

            }
        })
        return this.currentStats;
    }




    changePosition = (newPosition) => {
        this.position = newPosition;
    }

    getTags = () => {
        return this.tags;
    }

    setTags = (tags) => {
        this.tags = tags;
    }

    getVersion = () => {
        return this.version;
    }

    getSingleAction = (actionName) => {
        const foundAction = this.actions.find(action => action.actionName === actionName);
        return foundAction !== undefined ? foundAction : alert('this action does not exsist')
    }

    getAllActions = () => {
        return this.actions
    }

    getActionsAsList = () => {
        return this.actions.map(action => action.actionName);
    }

    reintanciateActions = () => {
        const actionInstances = this.actions.map(action => {
            return new Action(action.actionName, action.count, action.countPerPosition)
        });
        this.actions = actionInstances;
    }


}

export { GameStats, Action, Game };


