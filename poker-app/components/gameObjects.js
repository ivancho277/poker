module.exports = {
    gameStats: function gameStats(actions, tags) {
        this.currentStats = {};
        this.tags = tags;
        this.actions = actions;
        console.log(actions)
    
        this.getCurrentStats = function () {
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

        this.getTags = function(){
            return this.tags;
        }
    
        this.addGameStats = function (gameStats) {
            
        }
    },
    
    Action: function Action(actionName, count = 0, countPerPosition = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }) {
        this.actionName = actionName,
        this.count = count;
        this.countPerPosition = countPerPosition;
    
        this.incrementActionAtPosition = function (position) {
            this.countPerPosition[position] = ++this.countPerPosition[position];
            this.count++;
        }
    
        this.getPositionCount = function () {
            return Object.assign({}, this.countPerPosition)
        }
    
        this.getTotalCount = function () {
            return this.count;
        }
    },

    Game: function Game(actions, tags, date){
        this.actions = actions;
        this.tags = tags;
        this.date = date;

        this.addTag = function(tag){
            this.tags.push(tag)
        }

        this.addAction = function(action){
            this.actions.push(action);
        }

    }
    
}

