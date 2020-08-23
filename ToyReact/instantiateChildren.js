import traverseAllChildren from './traverseAllChildren'
import instantiateComponent from './instantiateComponent'

const instantiateChild = (child, name, childInstances) => {
    if(!childInstances[name]) {
        childInstances[name] = instantiateComponent(child)
    }
}

const instantiateChildren = (children) => {
    const childrenInstance = {} // children hash tree
    traverseAllChildren(children, '', instantiateChild, childrenInstance)
    debugger
    return childrenInstance
}

export default instantiateChildren