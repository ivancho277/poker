// TODO(ivan):Create validators for different inputs in app


const isValidTag = (tag, allTags) => {
    if (!allTags.includes(tag) && tag != "" && typeof (tag) === 'string') {
        return true;
    }
    else return false;
}

const validActionAdd = (action, allActions) => {
    if (!allActions.includes(action) && action != "") {
        return true;
    }
    
    else return false;
    
}

const validActionRemove = (action, allActions) => {
    const baseActions = ['call', 'fold', 'raise'];
    if (baseActions.includes(action)) {
        alert('you cannot remove base actions')
        return false;
    }
    if (!allActions.includes(action)) {
        console.log('this action doesnt exsist');
        return false;
        
    }
    
    return true;
    
    
}

//TODO: fix this function
const correctlyVersionedGames = (allGames) => {
    const currentVersionGames = {};

}

module.exports = {
    isValidTag: isValidTag,
    validActionAdd: validActionAdd,
    validActionRemove: validActionRemove
}

